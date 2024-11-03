import { FlatList, Image, Text, StyleSheet, View, Animated, LayoutChangeEvent, TouchableOpacity } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState, useRef } from "react";

import CourseLoader from "@/components/CourseLoader";

import { ExploreCourse, OngoingCourse } from "@/types/type";
import { getCoursesByCompletionStatus } from "@/lib/utils";
import { icons } from "@/constants";
import OngoingCourses from "@/components/courses/OngoingCourses";
import CompletedCourses from "@/components/courses/CompletedCourses";
import ExploreCourses from "@/components/courses/ExploreCourses";

const CoursePage = () => {
  const { user } = useUser()
  const userClerkId = user?.id

  const [loading, setLoading] = useState(true)
  const [ongoingCourses, setOngoingCourses] = useState<OngoingCourse[] | null>(null)
  const [exploreCourses, setExploreCourses] = useState<ExploreCourse[]>([])
  const [completedCourses, setCompletedCourses] = useState<OngoingCourse[] | null>(null)
  const [showCompletedCourses, setShowCompletedCourses] = useState(false)
  
  const [elementHeight, setElementHeight] = useState(1)

  useEffect(() => {
    if (userClerkId) {
      const fetchCourses = async () => {
        const fetchData = await getCoursesByCompletionStatus(userClerkId)
        setExploreCourses(fetchData?.exploreCourses)
        setOngoingCourses(fetchData?.ongoingCourses)
        setCompletedCourses(fetchData?.completedCourses)
        setLoading(false)
      }
      fetchCourses()
    }
  }, [userClerkId])

  const handleLayout = (event : LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setElementHeight(height)
  }

  const HEADER_MAX_HEIGHT = 140;
  const HEADER_MIN_HEIGHT = 0;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View className="h-full bg-white">
      <Animated.View className="bg-[#93b5ff] overflow-hidden" style={{}}>
        <Text className={`px-5 pb-2 text-2xl text-white font-bold ${elementHeight != 0.0 && "self-center"}`}>Courses</Text>
        <View className="mt-3 h-10 bg-white rounded-t-3xl absolute w-full -bottom-5 right-0"/>
        <Animated.View className="overflow-hidden mb-5" style={{ height: headerHeight, opacity: headerOpacity }} onLayout={handleLayout}>  
          <View className='w-7/12 h-[125px] self-center mb-8 p-3 shadow-md rounded-lg bg-white'>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-[#161d2e] font-medium">Ongoing</Text>
                <View className="bg-[#93b5ff] p-1 ml-1.5 rounded-full">
                  <Image source={icons.completed} className="w-4 h-4"/>
                </View>
              </View>
              <View className="bg-[#E9F0FF] p-1 px-2 rounded-md flex-row">
                <Text className="font-semibold">{ongoingCourses ? ongoingCourses.length : 0}</Text>
                <Text className="font-light">&nbsp; course</Text>
              </View>
            </View>

            <View className="flex-row mt-2 items-center space-x-1.5">
              <Text className="text-xs">Recent</Text>
              <Text className="text-xs font-semibold">•</Text>
              <Text className="text-xs font-light">{ongoingCourses ? ongoingCourses[0].course_name : "None"}</Text>
            </View>

            <View className="h-[0.5px] my-3 border-b-2 border-[#C8DAFF]"/>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-[#161d2e] font-medium">Completed</Text>
                <View className="bg-[#7f9dde] p-1 ml-1.5 rounded-full">
                  <Image source={icons.completed} className="w-4 h-4"/>
                </View>
              </View>
              <View className="bg-[#E9F0FF] p-1 px-2 rounded-md flex-row">
                <Text className="font-semibold">{completedCourses ? completedCourses.length : 0}</Text>
                <Text className="font-light">&nbsp; course</Text>
              </View>
            </View>  
          </View>
        </Animated.View>  
      </Animated.View>
      
      {loading ? 
        <CourseLoader />
        :
        <Animated.ScrollView 
          className="mb-24" 
          showsVerticalScrollIndicator={false} 
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View className="mx-4 mt-4 mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity 
                onPress={() => setShowCompletedCourses(false)}
                className={`${!showCompletedCourses ? "bg-[#91b0f2]" : "bg-[#e9f0ff]"} p-2 px-3.5 rounded-full`}
              >
                <Text className={`${!showCompletedCourses ? "text-white font-bold" : "text-[#253048] font-medium"} text-xs`}>
                  Ongoing
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setShowCompletedCourses(true)}
                className={`${showCompletedCourses ? "bg-[#91b0f2]" : "bg-[#e9f0ff]"} ml-4 p-2 px-3.5 rounded-full`}
              >
                <Text className={`${showCompletedCourses ? "text-white font-bold" : "text-[#253048] font-medium"} text-xs`}>
                  Completed
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-xs font-light text-[#161d2e]">All shown</Text>
          </View>
        
          {!showCompletedCourses ?
            <OngoingCourses ongoingCourses={ongoingCourses} />
            :
            <CompletedCourses completedCourses={completedCourses} />
          }

          <View className="mx-4 my-2 flex-row items-center justify-between">
            <Text className="text-base font-semibold text-[#161d2e]">Explore</Text>
            <Text className="text-xs font-light text-[#161d2e]">All shown</Text>
          </View>

          <ExploreCourses exploreCourses={exploreCourses} />
        </Animated.ScrollView>
      }
    </View> 
  );
}

export default CoursePage

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  }
})