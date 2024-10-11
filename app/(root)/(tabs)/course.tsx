import { FlatList, Text, StyleSheet, View, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/fetch";
import { router } from "expo-router";

import ExploreCourseCard from "@/components/ExploreCourseCard";
import OngoingCourseCard from "@/components/OngoingCourseCard";

import { Course, ExploreCourse, OngoingCourse } from "@/types/type";
import { getCoursesByCompletionStatus } from "@/lib/utils";

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
        const fetchData = await fetchAPI(`/(api)/course/ongoing/${userClerkId}`, {
          method: "GET"
        })
        setOngoingCourses(fetchData?.data)
      }
      fetchCourses()
    }
  }, [userClerkId])

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
    <SafeAreaView className="h-full bg-white">
      <Text className="p-5 text-2xl text-white font-bold bg-[#93b5ff]">Courses</Text>
      <View className="h-10 w-10 bg-white">

      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text className="ml-4 my-2 text-lg font-semibold text-[#161d2e]">Ongoing</Text>

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

        <Text className="ml-4 my-2 text-lg font-semibold text-[#161d2e]">Completed</Text>

        <FlatList
          data={completedCourses}
          renderItem={({ item }) => 
            <OngoingCourseCard 
              courseName={item.course_name} 
              lastLesson="2 dec 2017"
              progress="0.1"
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

        <Text className="ml-4 my-2 text-lg font-semibold text-[#161d2e]">Explore</Text>

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
          className='bg-white mb-16'
          scrollEnabled={false}
        />
      </ScrollView>
      
    </SafeAreaView> 
    
  );
}

export default CoursePage

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  }
})