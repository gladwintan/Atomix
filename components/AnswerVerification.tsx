import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
import ReactNativeModal from 'react-native-modal'

const AnswerVerification = ({ 
  correctAnswer, 
  message,
  nextPageUrl,
  lastPage,
  setAnswered
} : {
  correctAnswer: boolean,
  message: string,
  nextPageUrl?: string,
  lastPage?: boolean,
  setAnswered: (answered : boolean) => void
}) => {
  return (
    correctAnswer ?
      <ReactNativeModal 
        isVisible={true}
        backdropOpacity={0.1}
        className='w-11/12 rounded-3xl absolute bottom-3 self-center bg-white'
      >
        <View className='h-full mb-4'>
          <Text className='text-center text-xl p-10'>{message}</Text>
          <CustomButton
            title='continue'
            type='continue'
            onPress={() => {
              setAnswered(false);
              //@ts-ignore
              router.push(nextPageUrl)
            }}
          />
        </View>
      </ReactNativeModal>
      :
      <ReactNativeModal 
        isVisible={true}
        backdropOpacity={0.1}
        className='w-11/12 rounded-3xl absolute bottom-3 self-center bg-white'
      >
        <View className='h-full mb-4'>
          <Text className='text-center text-xl p-10'>{message}</Text>
          <CustomButton
            title='Try again'
            type='continue'
            onPress={() => {
              setAnswered(false);
            }}
          />
        </View>
      </ReactNativeModal>
  )
}

export default AnswerVerification