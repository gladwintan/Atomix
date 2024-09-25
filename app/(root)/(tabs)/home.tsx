import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchAPI } from '@/lib/fetch'
import CustomButton from '@/components/CustomButton'
import CourseCard from '@/components/CourseCard'
import { useEffect, useState } from 'react'
import { Course } from '@/types/type'

export default function Home() {
  const { user } = useUser()
  const userClerkId = user?.id

  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState("");
  const [courses, setCourses] = useState<Course[] | null>(null)

  useEffect(() => {
    if (userClerkId) {
      const fetchUser = async () => {
        const name = await fetchAPI(`/(api)/user/${userClerkId}`, {
          method: "GET",
        })
        setUsername(name?.data[0]?.name)
        setUserId(name?.data[0]?.id)
      }
      fetchUser()
    }
  }, [userClerkId])

  useEffect(() => {
    if (userId) {
      const fetchCourses = async () => {
        const courses = await fetchAPI(`/(api)/course/${userId}`, {
          method: "GET"
        })
        setCourses(courses?.data)
      }
      fetchCourses()
    }
  }, [userId])

  return (
    <SafeAreaView className="px-5 h-full bg-white">
      <ScrollView>
        <SignedIn>
          <Text className="text-2xl font-bold mt-3">Hi, {username}</Text>
          <View className="h-[200px] bg-slate-100">
            <Text>Summary stats</Text>
          </View>
          <View className="w-[200px] mt-5 mb-3 bg-slate-100 rounded-2xl p-3">
            <Text className="text-xl font-semibold">Ongoing courses</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="bg-white space-x-5"
            contentContainerStyle={styles.contentContainer}
          >
            {courses && courses.map((course, index) => (
              <View key={index} >
                <CourseCard 
                  courseName={course.course_name} 
                  lastLesson={course.updated_at} 
                  progress={course.progress}
                />
              </View>
            ))}
          </ScrollView>

          <View className="w-[100px] mt-5 mb-3 bg-slate-100 rounded-2xl p-3">
            <Text className="text-xl font-semibold">Quizzes</Text>
          </View>

        </SignedIn>
        <SignedOut>
          <Link href="/(auth)/sign-in">
            <Text>Sign In</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign Up</Text>
          </Link>
        </SignedOut>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10
  }
});