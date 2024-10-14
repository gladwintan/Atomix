import { FlatList, Image, Text, StyleSheet, View, ScrollView } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { router } from "expo-router";

import ExploreCourseCard from "@/components/courses/ExploreCourseCard";
import OngoingCourseCard from "@/components/courses/OngoingCourseCard";
import CompletedCourseCard from "@/components/courses/CompletedCourseCard";
import CourseLoader from "@/components/CourseLoader";

import { ExploreCourse, OngoingCourse } from "@/types/type";
import { getCoursesByCompletionStatus } from "@/lib/utils";
import { icons } from "@/constants";

const courses = [
  {
    id: 1,
    courseName: "Atomic Structure"
  },
  {
    id: 2,
    courseName: "Chemical Bonding"
  },
  {
    id: 3,
    courseName: "Acid-Base Equilibrium"
  },
  {
    id: 4,
    courseName: "Intro to Organic Chem"
  }
]

const CoursePage = () => {
  const { user } = useUser()
  const userClerkId = user?.id

  const [loading, setLoading] = useState(true)
  const [ongoingCourses, setOngoingCourses] = useState<OngoingCourse[] | null>(null)
  const [exploreCourses, setExploreCourses] = useState<ExploreCourse[] | null>(null)
  const [completedCourses, setCompletedCourses] = useState<OngoingCourse[] | null>(null)

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

  return (
    <View className="h-full bg-white">
      <View className="bg-[#93b5ff]">
        <Text className="px-5 pb-8 text-2xl text-white font-bold">Courses</Text>
        <View className="mt-3 h-10 bg-white rounded-t-3xl absolute w-full -bottom-5 right-0"/>
      </View>
      
      {loading ? 
        <CourseLoader />
        :
        <ScrollView className="mb-24" showsVerticalScrollIndicator={false}>
          <View className="mx-4 my-2 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-[#161d2e]">Ongoing</Text>
            <Text className="text-sm font-light text-[#161d2e]">All shown</Text>
          </View>
        
          {ongoingCourses ?
            <FlatList
              data={ongoingCourses}
              renderItem={({ item }) => 
                <OngoingCourseCard 
                  courseName={item.course_name} 
                  lastLesson={item.updated_at} 
                  progress={item.progress}
                  //@ts-ignore
                  onPress={() => router.push(`/courses/${item.course_name.split(" ").join("-").toLowerCase()}`) }
                />
              }
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View className='ml-5'/>}
              className='py-2 mb-8 bg-white'
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.container}
            />
            :
            <View className="justify-center items-center mt-4 mb-8">
              <Image source={icons.ongoingEmpty} className="w-[160] h-[64px]" resizeMode="contain"/>
              <Text className="mt-3 text-sm text-[#161d2e] font-medium">No ongoing courses</Text>
              <Text className="text-sm font-light text-[#253048]">Check out courses available</Text>
            </View>
          }

          <View className="mx-4 my-2 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-[#161d2e]">Completed</Text>
            <Text className="text-sm font-light text-[#161d2e]">All shown</Text>
          </View>

          {completedCourses ?
            <FlatList
              data={completedCourses}
              renderItem={({ item }) => 
                <CompletedCourseCard 
                  courseName={item.course_name} 
                  lastLesson={item.updated_at}
                  progress={item.progress}
                  //@ts-ignore
                  onPress={() => router.push(`/courses/${item.course_name.split(" ").join("-").toLowerCase()}`)}
                />
              }
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View className='ml-5'/>}
              className='py-2 mb-8 bg-white'
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.container}
            />
            :
            <View className="justify-center items-center mt-4 mb-8">
              <Image source={icons.completedEmpty} className="w-[160px] h-[64px]" resizeMode="contain"/>
              <Text className="mt-3 text-sm text-[#161d2e] font-medium">No completed courses</Text>
              <Text className="text-sm font-light text-[#253048]">Continue learning or start a new course</Text>
            </View>
          }


          <View className="mx-4 my-2 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-[#161d2e]">Explore</Text>
            <Text className="text-sm font-light text-[#161d2e]">All shown</Text>
          </View>
          <FlatList
            data={exploreCourses}
            renderItem={({ item }) => 
              <ExploreCourseCard 
                courseName={item.course_name}
                description={item.description}
                totalLessons={item.total_lessons}
                completionStatus={item.completionStatus} 
                //@ts-ignore
                onPress={() => router.push(`/courses/${item.course_name.split(" ").join("-").toLowerCase()}`)}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View className='p-1 border-t border-[#bdd3ff]'/>}
            className='bg-white'
            scrollEnabled={false}
          />
        </ScrollView>
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