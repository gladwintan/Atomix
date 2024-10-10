import { FlatList, Text, StyleSheet, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/fetch";
import { router } from "expo-router";

import OngoingCourseCard from "@/components/OngoingCourseCard";
import { Course, OngoingCourse } from "@/types/type";
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
  const [otherCourses, setOtherCourses] = useState<Course[] | null>(null)
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
        className='py-2 bg-white'
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />

      <FlatList
        data={completedCourses}
        renderItem={({ item }) => 
          <OngoingCourseCard 
            courseName={item.course_name} 
            lastLesson="2 dec 2017"
            progress="0.1"
            onPress={() => item.course_name && 
              //@ts-ignore
              router.push(`/courses/${item.courseName.split(" ").join("-").toLowerCase()}`) 
            }
          />
        }
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View className='ml-5'/>}
        className='py-2 bg-white'
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />

      <FlatList
        data={otherCourses}
        renderItem={({ item }) => 
          <OngoingCourseCard 
            courseName={item.course_name} 
            lastLesson="2 dec 2017"
            progress="0.1"
            onPress={() => item.course_name && 
              //@ts-ignore
              router.push(`/courses/${item.courseName.split(" ").join("-").toLowerCase()}`) 
            }
          />
        }
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View className='ml-5'/>}
        className='py-2 bg-white'
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView> 
    
  );
}

export default CoursePage

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  }
})