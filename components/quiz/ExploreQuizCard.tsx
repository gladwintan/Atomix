import { Image, View, Text, TouchableOpacity } from 'react-native'

import { icons } from '@/constants'
import CustomButton from '../CustomButton';

const ExploreQuizCard = ({ 
  quizTopic,
  description,
  totalquestion,
  completionStatus,
  difficulty,
  quizzes,
  onPress
} : { 
  quizTopic: string,
  description: string,
  totalquestion: number,
  completionStatus: string
  difficulty?: string,
  quizzes?: number,
  onPress: () => void
}) => {
  return (
      <TouchableOpacity className='rounded-[10px] w-[345px] h-[102px] bg-[#C8DAFF] ml-[25px]' onPress={onPress}>
        <View className='text-12 ml-[40px] mt-[14px]'>
          <Text className='font-semibold'>{quizTopic}</Text>
          <Text className='font-normal'>{description}</Text>
        </View>
        <View className='flex-row items-center w-[265px] mt-4 justify-between self-center'>
          <Text className='font-normal'>{totalquestion} Question</Text>
            {completionStatus == "completed" 
              ? <View className="flex-row">
                  <Text className="">Completed</Text>
                  <Image source={icons.completed} tintColor="#36633e" resizeMode="contain" className="w-[24px] h-[24px]"/>
                </View>
              : completionStatus == "ongoing" 
                ? <View className="flex-row">
                    <Text className="">Ongoing</Text>
                    <Image source={icons.resume} tintColor="#253e48" resizeMode="contain" className="w-[24px] h-[24px]"/>
                  </View>
                : <View className="flex-row">
                    <Text className="">Start Quiz</Text>
                    <Image source={icons.chevronRight} tintColor="#161d2e" resizeMode="contain" className="w-[24px] h-[24px]"/>
                  </View> 
            }
        </View>
         
      </TouchableOpacity>
  )
}

export default ExploreQuizCard