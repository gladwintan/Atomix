import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { QuestionType } from '@/types/type'
import CustomButton from '@/components/CustomButton'

const FillInTheBlankQuestion = ({currentQuestion}:{currentQuestion: QuestionType}) => {
    
  const [remainingOptions, setRemainingOptions] = useState(currentQuestion.options)
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])

  return (
    <View >
      <Text>{currentQuestion.question}</Text>
      <CustomButton
          title={currentQuestion.question}
          type='answer'
          textVariant='answer'
          onPress={() => {
            setSelectedAnswer(
              selectedAnswer.filter(question => question != currentQuestion.question)
            )
            setRemainingOptions([
              ...remainingOptions,
              currentQuestion.question
            ])
          }}
        />
    </View>
  )
}

export default FillInTheBlankQuestion