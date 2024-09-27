import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import LessonCard from '@/components/LessonCard'

const lessons = [
  {
    id: 1,
    title: "Redox Equations",
    description: "Balance half-equation using AOHC",
    link: '/courses/atomic-structure/lesson-1'
  },
  {
    id: 2,
    title: "Titrations",
    description: "Back titration, Double indicator titration",
    link: '/courses/atomic-structure/lesson-2'
  },
  {
    id: 3, 
    title: "Decomposition",
    description: "Thermal decomposition",
    link: '/courses/atomic-structure/lesson-3'
  },
  {
    id: 4,
    title: "Eudiometry",
    description: "Combustion of organic compounds",
    link: '/courses/atomic-structure/lesson-4'
  }
]
const AtomicStructure = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <Text>atomic-structure</Text>
      <FlatList
        data={lessons}
        renderItem={({ item }) => 
          <LessonCard
            id={item.id}
            title={item.title}
            description={item.description}
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
    justifyContent: "center",
  }
});