import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { QuestionType } from '@/types/type'
import index from '@/app/(root)/quiz/topic/acid-base-equilibrium'

const BinaryQuestion = ({currentQuestion}:{currentQuestion: QuestionType}) => {
  return (
    <View>
      <Text>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity 
        key={index}>
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
      
    </View>
  )
}

export default BinaryQuestion