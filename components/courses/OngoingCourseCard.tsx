import { Image, View, Text, TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress';

import { icons } from '@/constants'

function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: '2-digit'
  };

  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString('en-GB', options);
  return formattedDate.replace(/(\d{2})$/, "'$1");
}

const OngoingCourseCard = ({ 
  courseName,
  progress,
  lastLesson,
  onPress
} : { 
  courseName: string,
  progress: string,
  lastLesson: string,
  onPress: () => void
}) => {
  return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View className="w-[300px] p-4 px-6 space-y-1.5 rounded-xl shadow-sm bg-white border border-slate-100">
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-sm font-medium">{courseName}</Text>
            <View className="bg-[#93b5ff] p-1 rounded-md">
              <Image source={icons.chemistry} tintColor="white" resizeMode="contain" className="w-5 h-5"/>
            </View>
          </View>

          <View className='flex-row justify-between mb-3'>
            <View className='flex-row items-center'>
              <View className="bg-[#91B0F2] p-1 rounded-full">
                <Image source={icons.history} tintColor="white" resizeMode="contain" className="w-5 h-5"/>
              </View> 
              <View className='ml-2'>
                <Text className='text-xs'>Last lesson</Text>
                <Text className='text-xs font-light'>{formatDate(lastLesson)}</Text>
              </View>
            </View>

            <View className='flex-row items-center'>
              <View className="bg-[#8FABE5] p-1 rounded-full">
                <Image source={icons.quiz} tintColor="white" resizeMode="contain" className="w-5 h-5"/>
              </View> 
              <View className='ml-2'>
                <Text className='text-xs'>Quiz</Text>
                {/* To update uncompleted quizzes with data  */}
                <Text className='text-xs font-light'>5 uncompleted</Text>
              </View>
            </View>
          </View>
          
          <Progress.Bar progress={parseFloat(progress)} height={4} width={250} unfilledColor="#e2e8f0" borderWidth={0} color="#93B5FF" />
          
        </View>
      </TouchableOpacity>
  )
}

export default OngoingCourseCard