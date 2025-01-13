import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { QuestionType } from '@/types/type'
import index from '@/app/(root)/quiz/topic/acid-base-equilibrium'

const BinaryQuestion = ({currentQuestion, onPress}:{currentQuestion: QuestionType, onPress: (option:string) => void}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const getOptionStyle = (option: string) => {
    const baseStyle = 'w-[178px] h-[247px] rounded-[10px] justify-center items-center font-sans text-[32px] mr-3';
  
    if(option === 'True') {
      return selectedOption === 'True'
      ? `${baseStyle} bg-[#336ce7] opacity-50`
      : `${baseStyle} bg-[#236ce7]`;
    }

    if (option === 'False') {
      return selectedOption === 'False'
      ? `${baseStyle} bg-[#E7336C] opacity-50`
      : `${baseStyle} bg-[#E7336C]`;
    }

    return baseStyle;   
  };

  return (
    <View>
      <Text className='justify-center text-[18px] font-sans p-3'>{currentQuestion.question}</Text>
      <View className='flex-row justify-center ml-3'>
        {currentQuestion.options.map((option, index) => (
        <TouchableOpacity 
        key={index}
        className={getOptionStyle(option)}
        onPress={() => {setSelectedOption(option); onPress(option)}}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default BinaryQuestion;