import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { FlatList, StyleSheet, ScrollView, Text, View } from 'react-native'
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
  const [courses, setCourses] = useState<Course[] | null>(null)

  useEffect(() => {
    if (userClerkId) {
      const fetchUser = async () => {
        const name = await fetchAPI(`/(api)/user/${userClerkId}`, {
          method: "GET",
        })
        setUsername(name?.data[0]?.name)
      }
      fetchUser()
    }
  }, [userClerkId])

  useEffect(() => {
    if (userClerkId) {
      const fetchCourses = async () => {
        const courses = await fetchAPI(`/(api)/course/${userClerkId}`, {
          method: "GET"
        })
        console.log(courses)
        setCourses(courses?.data?.filter((course: Course) => !(parseFloat(course.progress) == 1.0)))
      }
      fetchCourses()
    }
  }, [userClerkId])

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <SignedIn>
          <Text className="text-2xl font-bold mt-3 ml-5">Hi, {username}</Text>
          <View className="h-[200px] bg-slate-100 mx-5">
            <Text>Summary stats</Text>
          </View>
          <View className="w-[180px] mt-5 mb-3 ml-5 bg-slate-100 rounded-2xl p-3">
            <Text className="text-lg font-medium">Ongoing courses</Text>
          </View>
          
          <FlatList
            data={courses}
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

          <View className="w-[100px] mt-5 mb-3 ml-5 bg-slate-100 rounded-2xl p-3">
            <Text className="text-lg font-medium">Quizzes</Text>
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
  container: {
    paddingHorizontal: 20
  }
})