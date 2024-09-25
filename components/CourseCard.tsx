import { Image, View, Text, TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress';

import { icons } from '@/constants'

function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };

  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', options)
}
const CourseCard = ({ 
  courseName,
  progress,
  lastLesson 
} : { 
  courseName: string,
  progress: string,
  lastLesson: string 
}) => {
  return (
      <TouchableOpacity activeOpacity={0.5}>
        <View className="w-[300px] p-4 px-6 rounded-xl shadow-sm shadow-neutral-200 bg-white border border-slate-100">
          <View className="flex-row w-full">
            <View className="bg-[#0286FF] p-2 rounded-xl">
              <Image source={icons.chemistry} tintColor="white" resizeMode="contain" className="w-7 h-7"/>
            </View>
            <View className='h-full ml-4'>
              <Text className="text-base font-semibold">{courseName}</Text>
              <View className="flex flex-row mt-1 items-center">
                <Image source={icons.calendar} tintColor="#64748b" resizeMode="contain" className="w-4 h-4"/>
                <Text className="text-xs ml-1 text-slate-600">Last lesson: {formatDate(lastLesson)}</Text>
              </View>
            </View>
          </View>

          <View className="flex flex-row w-full items-center mt-3">
            <Text className="text-xs text-slate-600 mr-2">Progress:</Text>
            <Progress.Bar progress={parseFloat(progress)} height={4} width={190} unfilledColor="#e2e8f0" borderWidth={0} color="#0286FF" />
          </View>
        </View>
      </TouchableOpacity>
  )
}

export default CourseCard