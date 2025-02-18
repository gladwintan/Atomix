import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SelectQuizType } from '@/types/type'

const QuizSelectionCard = ({item, onPress}: {item: SelectQuizType, onPress: () => void}) => {
  return (
    <TouchableOpacity className='rounded-[20px] w-[325px] h-[100px] bg-[#c8daff] items-center justify-stretch flex-1 flex-row' onPress={onPress}>
      <View className='rounded-[20px] w-[70px] h-[80px] bg-[#6698ff] items-center justify-center ml-3'>
        <Text>Quiz {item.quiz_id}</Text>
      </View>

      <View className='ml-3'>
        <Text className='text-md font-medium'>{item.quiz_name}</Text>
        <Text>{item.questions} Questions</Text>
      </View>

      <Image source={require('@/assets/icons/chevron-right.png')} className='w-[48px] h-[48px] ml-auto'/>
    </TouchableOpacity>
  )
}

export default QuizSelectionCard