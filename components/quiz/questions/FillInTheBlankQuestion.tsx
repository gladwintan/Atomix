import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

import { QuestionType } from '@/types/type'
import CustomButton from '@/components/CustomButton'

const FillInTheBlankQuestion = ({currentQuestion}:{currentQuestion: QuestionType}) => {
    
  const [userAnswer, setUserAnswer] = useState('');

  return (
    <View >
      <Text>{currentQuestion.question}</Text>
      <TextInput 
        className='h-[40px] outline-1 outline-gray w-4/5 mb-20 pl-10'
        placeholder="Type your answer here"
        value={userAnswer}
        onChangeText={setUserAnswer}
      />
    </View>
  )
}

export default FillInTheBlankQuestion