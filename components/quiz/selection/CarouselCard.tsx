import { View, Text, TouchableOpacity } from "react-native"
import * as Progress from 'react-native-progress'
import { ExploreQuizType, OngoingQuiz } from "@/types/type"

const CarouselCard = ({item}: {item: OngoingQuiz})  => {
  return(
    <View className="items-center rounded-[10px]">
      <Text className="text-[26px] font-bold">{item.quiz_name}</Text>
    
      <View className="justify-end p-3">
        <Text className="ml-auto">{item.progress}</Text>
        <Progress.Bar progress={item.progress} className='w-[254px] h-[21px] rounded-[10px]'/>

        <TouchableOpacity className='bg-[#93b5ff] rounded-[10px] ml-auto p-3 mt-3'>
        <Text>Continue Quiz</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
  
}

export default CarouselCard