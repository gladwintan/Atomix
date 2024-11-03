import { Image, View, Text, FlatList, StyleSheet } from 'react-native'
import { useEffect, useState, useTransition } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import LessonCard from '@/components/LessonCard'
import { useUser } from '@clerk/clerk-expo'
import { getCourseProgress, startNewCourse } from '@/lib/utils'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { lessons } from '@/courses/AtomicStructure'

const AtomicStructure = () => {
  const { user } = useUser()
  const userClerkId = user?.id
  
  //value of -1 indicates course not started yet; -2 for loading courses
  const [lessonsCompleted, setLessonsCompleted] = useState(-2)
  const [courseProgress, setCourseProgress] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const course = await getCourseProgress("Atomic Structure", userClerkId)
      if (course[0]?.lessons_completed >= 0) {
        setLessonsCompleted(course[0]?.lessons_completed)
      } else {
        setLessonsCompleted(-1)
      }
      //setCourseProgress(course[0]?.progress)
    }
    if (userClerkId) fetchData()
  }, [userClerkId, lessonsCompleted])

  return (
    <SafeAreaView className='h-full bg-white'>
      <View className='p-3 px-5 bg-[#E9F0FF] mx-3 rounded-2xl flex-row items-center'>
        <View className='w-3/4'>
          <Text className='text-base text-[#253048] font-semibold'>Atomic Structure</Text>
          <Text className='mt-1 text-sm text-[#253048] font-light'>
            Learn about atomic orbitals and ionisation energy
          </Text>
        </View>
        <View className="p-3 bg-white rounded-full absolute right-4">
          <Image 
            source={icons.chemistry} 
            tintColor="#93B5FF" 
            resizeMode="contain" 
            className="w-12 h-12"
          />
        </View>
      </View>
      
      <View className='border-b border-slate-300 mt-5 mx-3 pb-1 flex-row items-center'>
        <Image 
          source={icons.lesson} 
          tintColor="#253048" 
          resizeMode="contain" 
          className="w-5 h-5"
        />
        <Text className='text-[#253048] font-semibold text-base ml-1'>Lessons</Text>
      </View>
      <FlatList
        data={lessons}
        renderItem={({ item }) => 
          <LessonCard
            id={item.id}
            title={item.title}
            description={item.description}
            lessonsCompleted={lessonsCompleted}
            
            time={item.time}
            difficulty={item.difficulty}
            lastLesson={item.lastLesson}
            //@ts-ignore
            onPress={() => router.push(item.link)}
          />
        }
        keyExtractor={(item, index) => index.toString() }
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />

      {lessonsCompleted == -1 && 
        <CustomButton
          title='Start course'
          onPress={() => {
            startNewCourse("Atomic Structure", userClerkId);
            setLessonsCompleted(0)
          }}
          className='w-1/2 self-center'
        />
      }
    </SafeAreaView>
    
  )
}

export default AtomicStructure

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    paddingLeft: 20,
    paddingTop: 15
  }
});