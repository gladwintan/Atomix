import { Image, View, Text, TouchableOpacity } from 'react-native'

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

const CompletedCourseCard = ({ 
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
        <View className="w-[120px] min-h-[120px] p-2 justify-between items-center rounded-xl shadow-sm shadow-neutral-300 bg-white">
          <Text className="text-sm text-center">{courseName}</Text>

          <View className='items-center space-y-1'>
            <View className='flex-row items-center space-x-1'>
              <Text className='text-xs font-light'>completed</Text>
              <Image source={icons.completed} tintColor="black" resizeMode="contain" className="w-3 h-3"/>
            </View>
              
            <View className='bg-[#E9F0FF] p-1 px-2 rounded-md'>
              <Text className='text-xs font-light'>{formatDate(lastLesson)}</Text>            
            </View>
          </View>
              
        </View>
      </TouchableOpacity>
  )
}

export default CompletedCourseCard