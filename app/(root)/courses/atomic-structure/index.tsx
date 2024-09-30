import { Image, View, Text, FlatList, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import LessonCard from '@/components/LessonCard'
import { useUser } from '@clerk/clerk-expo'
import { getCourseProgress } from '@/lib/utils'
import { icons } from '@/constants'

const lessons = [
  {
    id: 1,
    title: "Atomic Orbitals",
    description: "Identify and draw s, p, d orbitals",
    link: '/courses/atomic-structure/lesson-1'
  },
  {
    id: 2,
    title: "I.E. and Atomic radius",
    description: "Ionisation energy",
    link: '/courses/atomic-structure/lesson-2'
  },
  {
    id: 3, 
    title: "I.E. trends",
    description: "Variations in I.E. across period and down group",
    link: '/courses/atomic-structure/lesson-3'
  },
  {
    id: 4,
    title: "Anomalies of I.E. trend",
    description: "Exceptions to the I.E. trend",
    link: '/courses/atomic-structure/lesson-4'
  }
]

const AtomicStructure = () => {
  const { user } = useUser()
  const userClerkId = user?.id
  
  const [lessonsCompleted, setLessonsCompleted] = useState(null)
  const [courseProgress, setCourseProgress] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const course = await getCourseProgress("Atomic Structure", userClerkId)
      setLessonsCompleted(course[0]?.lessons_completed)
      //setCourseProgress(course[0]?.progress)
    }
    if (userClerkId) fetchData()
  }, [userClerkId])

  return (
    <SafeAreaView className='h-full bg-white'>
      <View className='p-3 px-5 bg-[#0286FF]/10 mx-3 rounded-2xl flex-row items-center'>
        <View className='w-3/4'>
          <Text className='text-xl font-semibold'>Atomic Structure</Text>
          <Text className='mt-1.5 text-base text-slate-700'>
            Learn about atomic orbitals and ionisation energy
          </Text>
        </View>
        <View className="p-3 bg-white rounded-full absolute right-4">
          <Image 
            source={icons.chemistry} 
            tintColor="#0286FF90" 
            resizeMode="contain" 
            className="w-14 h-14"
          />
        </View>
      </View>
      <View className='border-b-2 border-slate-200 mt-5 mx-3 mb-2 pb-1 flex-row items-center'>
        <Image 
            source={icons.lesson} 
            tintColor="black" 
            resizeMode="contain" 
            className="w-6 h-6"
          />
        <Text className='text-lg ml-1 '>Lessons</Text>
      </View>
      <FlatList
        data={lessons}
        renderItem={({ item }) => 
          <LessonCard
            id={item.id}
            title={item.title}
            description={item.description}
            completed={lessonsCompleted ? item.id <= lessonsCompleted : false }
            //@ts-ignore
            onPress={() => router.push(item.link)}
          />
        }
        keyExtractor={(item, index) => index.toString() }
        contentContainerStyle={styles.contentContainer}
      />

    </SafeAreaView>
    
  )
}

export default AtomicStructure

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});