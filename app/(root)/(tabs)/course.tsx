import { FlatList, Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/fetch";
import { router } from "expo-router";

import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/type";
import { getUncompletedCourses } from "@/lib/utils";

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

  const [ongoingCourses, setOngoingCourses] = useState<Course[] | null > (null)
  const [otherCourses, setOtherCourses] = useState<any>(null)

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
      const fetchData = await getUncompletedCourses(userClerkId)
      setOtherCourses(fetchData)
    }
    fetchCourses()
  }
}, [userClerkId])

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={ongoingCourses}
        renderItem={({ item }) => 
          <CourseCard 
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
        data={otherCourses}
        renderItem={({ item }) => 
          <CourseCard 
            courseName={item.course_name} 
            lastLesson="2 dec 2017"
            progress="0.1"
            //@ts-ignore
            onPress={() => router.push(`/courses/${item.courseName.split(" ").join("-").toLowerCase()}`) }
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