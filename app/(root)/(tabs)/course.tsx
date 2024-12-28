import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
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
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const Course = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState({ error: "" });

  const [ongoingCourses, setOngoingCourses] = useState<OngoingCourse[]>([]);
  const [exploreCourses, setExploreCourses] = useState<ExploreCourse[]>([]);
  const [completedCourses, setCompletedCourses] = useState<OngoingCourse[]>([]);
  const [showCompletedCourses, setShowCompletedCourses] = useState(false);

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

  return (
    <SafeAreaView>
      {/* Summary stats */}
      <View className="items-end h-14 border-b border-neutral-100 justify-center">
        <View className="absolute left-3 top-0">
          <Text className="font-openSans-bold text-lg text-dark-base">
            Course
          </Text>
          <Text className="font-openSans text-xs text-dark-light">
            Learn something new today!
          </Text>
        </View>

        <SearchBar
          handleSearch={(searchQuery) =>
            router.push(`/(root)/courses/search?query=${searchQuery}`)
          }
          searchBarStyle="rounded-full"
        />
      </View>

      {loading ? (
        <View className="h-full bg-white pt-5 rounded-t-3xl">
          <CourseMainPageLoader
            fetchError={loadError.error}
            fetchCourses={fetchCourses}
          />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchCourses}
              colors={["#9Bd35A", "#689F38"]}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <View className="ml-4 my-6 space-x-4 flex-row items-center">
            {/* Ongoing courses button */}
            <CustomButton
              title="Ongoing"
              textClassName={`${!showCompletedCourses ? "text-white font-openSans-semibold" : "text-dark-lighter font-openSans-medium"} text-xs`}
              IconRight={() => (
                <Image
                  source={icons.pending}
                  tintColor={`${!showCompletedCourses ? "white" : "#253048"}`}
                  className="w-4 h-4 ml-1"
                />
              )}
              className={`${!showCompletedCourses ? "bg-primary-500" : "bg-primary-100"} p-1.5 px-3`}
              onPress={() => setShowCompletedCourses(false)}
            />

            {/* Completed courses button */}
            <CustomButton
              title="Completed"
              textClassName={`${showCompletedCourses ? "text-white font-openSans-bold" : "text-dark-lighter font-openSans-medium"} text-xs`}
              IconRight={() => (
                <Image
                  source={icons.completed}
                  tintColor={`${showCompletedCourses ? "white" : "#253048"}`}
                  className="w-4 h-4 ml-1"
                />
              )}
              className={`${showCompletedCourses ? "bg-primary-500" : "bg-primary-100"} py-1.5 px-3`}
              onPress={() => setShowCompletedCourses(true)}
            />
          </View>

          <View className="h-40">
            {!showCompletedCourses ? (
              <OngoingCourses ongoingCourses={ongoingCourses} />
            ) : (
              <CompletedCourses completedCourses={completedCourses} />
            )}
          </View>

          <ExploreCourses exploreCourses={exploreCourses} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Course;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
