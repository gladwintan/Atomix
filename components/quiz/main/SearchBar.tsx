import { ExploreQuizType, OngoingQuiz } from '@/types/type';
import React, { useState } from 'react';
import { View, TextInput} from 'react-native';


const SearchBar = ({value, onChangeText}: {value:string, onChangeText:(text:string) => void}) => {


  return (
    <View className='mb-3 items-center'>
      <TextInput
      className='w-96 h-[31px] bg-[#E9F0FF] rounded-[10px] mt-3'
      placeholder="  Search by course name"
      value={value}
      onChangeText={onChangeText}
      textAlign='center'
      />      
    </View>
  );
};


export default SearchBar;
