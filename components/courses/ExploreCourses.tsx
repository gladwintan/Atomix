import { FlatList, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import ExploreCourseCard from './ExploreCourseCard'
import { ExploreCourse } from '@/types/type'

const ExploreCourses = ({ exploreCourses } : { exploreCourses: ExploreCourse[] }) => {
  return (
    <FlatList
      data={exploreCourses}
      renderItem={({ item }) => 
        <ExploreCourseCard 
          courseName={item.course_name}
          description={item.description}
          totalLessons={item.total_lessons}
          completionStatus={item.completionStatus} 
          //@ts-ignore
          onPress={() => router.push(`/courses/${item.course_name.split(" ").join("-").toLowerCase()}`)}
        />
      }
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View className='p-1 border-t border-slate-200'/>}
      className='bg-white'
      scrollEnabled={false}
    />
  )
}

export default ExploreCourses