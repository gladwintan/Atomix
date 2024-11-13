import { Image, View, Text, TouchableOpacity } from 'react-native'

import { icons } from '@/constants'
import CustomButton from '../CustomButton';

const ExploreCourseCard = ({ 
  courseName,
  description,
  totalLessons,
  completionStatus,
  difficulty,
  quizzes,
  onPress
} : { 
  courseName: string,
  description: string,
  totalLessons: number,
  completionStatus: string
  difficulty?: string,
  quizzes?: number,
  onPress: () => void
}) => {
  return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View className='w-full p-4'>
          <View className="flex-row justify-between items-end w-full">
            <Text className="text-sm text-dark-base">{courseName}</Text>
            <View className="bg-primary-50 p-1 rounded-md shadow-sm">
              <Image source={icons.chemistry} tintColor="#475980" resizeMode="contain" className="w-4 h-4"/>
            </View>
          </View>

          <Text className='font-light text-dark-base mt-2.5 text-xs leading-5'>{description}</Text>

          <View className='flex-row justify-between items-center mt-4'>
            <View className='flex-row space-x-1.5'>
              <Text className='text-xs text-dark-base'>{totalLessons} lessons</Text>
              <Text>•</Text>
              <Text className='text-xs text-dark-base'>4 Quiz</Text>
              <Text>•</Text>
              <Text className='text-xs text-dark-base'>Intermediate</Text>
            </View>

            {completionStatus == "completed" 
              ? <View className="flex-row bg-green-light items-center p-1 rounded-md">
                  <Text className="pl-1 text-green-dark text-xs">Completed</Text>
                  <Image source={icons.completed} tintColor="#36633e" resizeMode="contain" className="ml-1 w-4 h-4"/>
                </View>
              : completionStatus == "ongoing" 
                ? <View className="flex-row bg-primary-50 items-center p-1 rounded-md">
                    <Text className="pl-1 text-dark-lighter text-xs">Ongoing</Text>
                    <Image source={icons.resume} tintColor="#364463" resizeMode="contain" className="w-5 h-5"/>
                  </View>
                : <View className="flex-row items-center rounded-md">
                    <Text className="pl-1 text-gray-600 text-xs">Details</Text>
                    <Image source={icons.chevronRight} tintColor="#4b5563" resizeMode="contain" className="w-5 h-5"/>
                  </View>
            }
          </View>

        </View>
      </TouchableOpacity>
  )
}

export default ExploreCourseCard