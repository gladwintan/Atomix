import { View, Text, TouchableOpacity } from "react-native"
import * as Progress from 'react-native-progress'
import { ExploreQuizType, OngoingQuiz } from "@/types/type"

const CarouselCard = ({item}: {item: OngoingQuiz})  => {
  return(
    <View>
      <Text>{item.course_name}</Text>
      <Text>Quiz {item.quiz_id} in progress</Text>

      <View>
        <Text>{item.progress}</Text>
        <Progress.Bar progress={item.progress} className='w-[254px] h-[21px] rounded-[10px]'/>
      </View>

      <TouchableOpacity className='bg-[#93b5ff]'>
        <Text>Continue Quiz</Text>
      </TouchableOpacity>
    </View>
  )
  
}

export default CarouselCard