import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  Animated,
  LayoutChangeEvent,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import CourseMainPageLoader from "@/components/loader/CourseMainPageLoader";
import CompletedCourses from "@/components/courses/completed/CompletedCourses";
import ExploreCourses from "@/components/courses/explore/ExploreCourses";
import OngoingCourses from "@/components/courses/ongoing/OngoingCourses";
import { icons } from "@/constants";
import { getCoursesByCompletionStatus } from "@/lib/courses";
import { ExploreCourse, OngoingCourse } from "@/types/type";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";

const Course = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState({ error: "" });

  const [ongoingCourses, setOngoingCourses] = useState<OngoingCourse[]>([]);
  const [exploreCourses, setExploreCourses] = useState<ExploreCourse[]>([]);
  const [completedCourses, setCompletedCourses] = useState<OngoingCourse[]>([]);
  const [showCompletedCourses, setShowCompletedCourses] = useState(false);

  const [elementHeight, setElementHeight] = useState(1);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setLoadError({ error: "" });

    const { ongoingCourses, exploreCourses, completedCourses, error, success } =
      await getCoursesByCompletionStatus(userClerkId);

    if (error) {
      setLoadError({ error: error });
      return;
    }

    if (ongoingCourses) {
      setOngoingCourses(ongoingCourses);
    }
    if (completedCourses) {
      setCompletedCourses(completedCourses);
    }
    if (exploreCourses) {
      setExploreCourses(exploreCourses);
    }

    setTimeout(() => setLoading(false), 500);
  }, [userClerkId]);

  useEffect(() => {
    if (userClerkId) {
      fetchCourses();
    }
  }, [userClerkId]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setElementHeight(height);
  };

  const HEADER_MAX_HEIGHT = 110;
  const HEADER_MIN_HEIGHT = 0;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View className="h-full bg-primary-base">
      {/* Summary stats */}
      <Animated.View className="bg-primary-base overflow-hidden">
        <Text
          className={`px-5 mb-5 text-lg text-white font-openSans-bold ${elementHeight != 0.0 && "self-center"}`}
        >
          Course
        </Text>
        <View className="px-3 absolute top-0 w-full items-end z-50 shadow-sm">
          <SearchBar
            handleSearch={(searchQuery) =>
              router.push(`/(root)/courses/search?query=${searchQuery}`)
            }
            searchBarStyle="rounded-full"
          />
        </View>

        <Animated.View
          className="overflow-hidden"
          style={{ height: headerHeight, opacity: headerOpacity }}
          onLayout={handleLayout}
        >
          <View className="w-3/5 self-center px-3 py-4 rounded-xl bg-white flex-row justify-around">
            <View className="items-center space-y-2.5">
              <View className="flex-row items-center space-x-0.5">
                <Text className="text-dark-base font-openSans-medium">
                  Ongoing
                </Text>
                <Image
                  source={icons.pending}
                  tintColor="#161d2e"
                  className="w-4 h-4"
                />
              </View>
              <Text className="bg-primary-100 p-1 px-4 rounded-md font-openSans">
                {ongoingCourses.length}
              </Text>
            </View>

            <View className="border-[0.5px] border-neutral-300"></View>

            <View className="items-center space-y-2.5">
              <View className="flex-row items-center space-x-0.5">
                <Text className="text-dark-base font-openSans-medium">
                  Completed
                </Text>
                <Image
                  source={icons.completed}
                  tintColor="#161d2e"
                  className="w-4 h-4"
                />
              </View>

              <Text className="bg-primary-100 p-1 px-4 rounded-md font-openSans">
                {completedCourses.length}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>

      {loading ? (
        <View className="h-full bg-white pt-5 rounded-t-3xl">
          <CourseMainPageLoader
            fetchError={loadError.error}
            fetchCourses={fetchCourses}
          />
        </View>
      ) : (
        <Animated.ScrollView
          className=" bg-white rounded-t-3xl"
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchCourses}
              colors={["#9Bd35A", "#689F38"]}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <View className="mx-4 mt-6 mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              {/* Ongoing courses button */}
              <TouchableOpacity
                onPress={() => setShowCompletedCourses(false)}
                className={`${!showCompletedCourses ? "bg-primary-500" : "bg-primary-100"} p-2 px-3.5 rounded-full flex-row shadow-sm`}
              >
                <Text
                  className={`${!showCompletedCourses ? "text-white font-openSans-bold" : "text-dark-lighter font-openSans-medium"} text-xs`}
                >
                  Ongoing
                </Text>
                <Image
                  source={icons.pending}
                  tintColor={`${!showCompletedCourses ? "white" : "#253048"}`}
                  className="w-4 h-4 ml-0.5"
                />
              </TouchableOpacity>

              {/* Completed courses button */}
              <TouchableOpacity
                onPress={() => setShowCompletedCourses(true)}
                className={`${showCompletedCourses ? "bg-primary-500" : "bg-primary-100"} ml-4 p-2 px-3.5 rounded-full flex-row shadow-sm`}
              >
                <Text
                  className={`${showCompletedCourses ? "text-white font-openSans-bold" : "text-dark-lighter font-openSans-medium"} text-xs`}
                >
                  Completed
                </Text>
                <Image
                  source={icons.completed}
                  tintColor={`${showCompletedCourses ? "white" : "#253048"}`}
                  className="w-4 h-4 ml-0.5"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="h-36">
            {!showCompletedCourses ? (
              <OngoingCourses ongoingCourses={ongoingCourses} />
            ) : (
              <CompletedCourses completedCourses={completedCourses} />
            )}
          </View>

          <ExploreCourses exploreCourses={exploreCourses} />
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default Course;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
