import { Image, View, Text, TouchableOpacity, Dimensions } from 'react-native'

const breakDescription = (text: string, wordsPerLine: number) => {
  const words = text.split(' ');  
  const lines: string[] = [];
  let line = '';

  for (let i = 0; i < words.length; i++) {
    line += words[i] + ' ';

    if ((i + 1) % wordsPerLine === 0) {
      lines.push(line.trim());
      line = ''; 
    }
  }

  if (line) lines.push(line.trim());

  return lines.join('\n'); 
};


const ExploreQuizCard = ({ 
  quizTopic,
  description,
  totalquizzes,
  completionStatus,
  difficulty,
  quizzes,
  onPress
} : { 
  quizTopic: string,
  description: string,
  totalquizzes: number,
  completionStatus: string
  difficulty?: string,
  quizzes?: number,
  onPress: () => void
}) => {
  const height = Dimensions.get('window').height
  const quarterHeight = height / 4
  return (
    <View className='items-center'>
      <TouchableOpacity className={`rounded-[10px] w-[345px] h-${quarterHeight} bg-[#B2E0FB] flex-row items-center justify-between border-[1px] border-black`} onPress={onPress}>
        <View className='ml-[20px] flex-1'>
            <Text className='font-bold text-18'>{quizTopic}</Text>
            <Text className='font-normal text-12' numberOfLines={3}>{breakDescription(description, 6)}</Text>
            <Text className='font-normal text-12'>{totalquizzes} Quiz</Text>
        </View> 
        {completionStatus == "completed" 
          ? (<Text className='text-[12px]'>Completed</Text>)
          : completionStatus == "ongoing" 
            ? (<Text className='text-[12px]'>Ongoing</Text>)
            : (<Text className='text-[12px]'>Start</Text>)
        }
        <Image source={require('@/assets/icons/chevron-right.png')} className='w-[48px] h-[48px]'/>
      </TouchableOpacity>
    </View>
    
  )
}

export default ExploreQuizCard