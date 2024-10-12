import { FlatList, Text, StyleSheet, View, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/fetch";
import { router } from "expo-router";

import ExploreCourseCard from "@/components/courses/ExploreCourseCard";
import OngoingCourseCard from "@/components/courses/OngoingCourseCard";

import { Course, ExploreCourse, OngoingCourse } from "@/types/type";
import { getCoursesByCompletionStatus } from "@/lib/utils";
import CompletedCourseCard from "@/components/courses/CompletedCourseCard";

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

  const [ongoingCourses, setOngoingCourses] = useState<OngoingCourse[] | null>(null)
  const [otherCourses, setOtherCourses] = useState<ExploreCourse[] | null>(null)
  const [completedCourses, setCompletedCourses] = useState<OngoingCourse[] | null>(null)

  useEffect(() => {
    if (userClerkId) {
      const fetchCourses = async () => {
        const fetchData = await getCoursesByCompletionStatus(userClerkId)
        setOtherCourses(fetchData?.uncompletedCourses)
        setOngoingCourses(fetchData?.ongoingCourses)
        setCompletedCourses(fetchData?.completedCourses)
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

      <ScrollView className="mb-24" showsVerticalScrollIndicator={false}>
        <View className="mx-4 my-2 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-[#161d2e]">Ongoing</Text>
          <Text className="text-xs font-light text-[#161d2e]">All shown</Text>
        </View>

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

        <View className="mx-4 my-2 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-[#161d2e]">Completed</Text>
          <Text className="text-xs font-light text-[#161d2e]">All shown</Text>
        </View>

        <FlatList
          data={completedCourses}
          renderItem={({ item }) => 
            <CompletedCourseCard 
              courseName={item.course_name} 
              lastLesson={item.updated_at}
              progress={item.progress}
              onPress={() => item.course_name && 
                //@ts-ignore
                router.push(`/courses/${item.course_name.split(" ").join("-").toLowerCase()}`) 
              }
            />
          }
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View className='ml-5'/>}
          className='py-2 mb-8 bg-white'
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
        />

        <View className="mx-4 my-2 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-[#161d2e]">Explore</Text>
          <Text className="text-xs font-light text-[#161d2e]">All shown</Text>
        </View>
        <FlatList
          data={otherCourses}
          renderItem={({ item }) => 
            <ExploreCourseCard 
              courseName={item.course_name}
              description={item.description}
              totalLessons={item.total_lessons} 
              onPress={() => item.course_name && 
                //@ts-ignore
                router.push(`/courses/${item.course_name.split(" ").join("-").toLowerCase()}`) 
              }
            />
          }
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View className='p-1 border-t border-[#bdd3ff]'/>}
          className='bg-white'
          scrollEnabled={false}
        />
      </ScrollView>
    </View> 
    
  );
}

export default CoursePage

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  }
})