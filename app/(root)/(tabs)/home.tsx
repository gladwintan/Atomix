import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchAPI } from '@/lib/fetch'
import CustomButton from '@/components/CustomButton'
import CourseCard from '@/components/CourseCard'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user } = useUser()
  const userClerkId = user?.id

  const [username, setUsername] = useState("")

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

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView >
        <SignedIn>
          <Text className="px-5 text-2xl font-semibold">Hi, {username}</Text>
          <CourseCard courseName='Atomic Structure'/>
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