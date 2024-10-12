import { Image, View, Text, TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress';

import { icons } from '@/constants'
import CustomButton from '../CustomButton';

const ExploreCourseCard = ({ 
  courseName,
  description,
  totalLessons,
  difficulty,
  quizzes,
  onPress
} : { 
  courseName: string,
  description: string,
  totalLessons: number,
  difficulty?: string,
  quizzes?: number,
  onPress: () => void
}) => {
  return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View className='w-full p-4'>
          <View className="flex-row justify-between w-full">
            <Text className="text-base text-[#161d2e]">{courseName}</Text>
            <View className='flex-row items-center bg-[#93b5ff] h-6 p-1 rounded-md'>
              <Text className='text-white text-xs mr-5 px-1 font-bold'>H2 Chemistry</Text>
              <View className="bg-[#F4F8FF] p-1 rounded-md absolute right-0 bottom-0">
                <Image source={icons.chemistry} tintColor="#475980" resizeMode="contain" className="w-4 h-4"/>
              </View>
            </View>
          </View>

          <Text className='font-light mt-4'>{description}</Text>

          <View className='flex-row justify-between items-center mt-3'>
            <View className='flex-row space-x-1.5'>
              <Text className='text-sm'>{totalLessons} lessons</Text>
              <Text>•</Text>
              <Text className='text-sm'>4 Quiz</Text>
              <Text>•</Text>
              <Text className='text-sm'>Intermediate</Text>
            </View>
            <View className="flex-row bg-[#e9f0ff] items-center p-1 rounded-md">
              <Text className="pl-1">Details</Text>

              <Image source={icons.chevronRight} tintColor="black" resizeMode="contain" className="w-5 h-5"/>

            </View>
          </View>

        </View>
      </TouchableOpacity>
  )
}

export default ExploreCourseCard