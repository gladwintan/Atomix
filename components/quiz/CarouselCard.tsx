import { View, Text } from "react-native"
import { ExploreQuizType } from "@/types/type"

const CarouselCard = ({Quizname}:{Quizname:string})  => {
  return(
    <View>
      <Text>{Quizname}</Text>
    </View>
  )
  
}

export default CarouselCard