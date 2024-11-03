import { Image, View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { atomicStructureImages } from '@/constants'

const Lesson1 = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <Image
        source={atomicStructureImages.dOrbitals}
        resizeMode='contain'
        className='w-[300px] self-center'
      />
      <CustomButton
        title='continue'
        onPress={() => router.replace('/(root)/courses/atomic-structure/lesson-1/page1')}
        type='continue'
        className='absolute bottom-2'  
      />
    </SafeAreaView>
  )
}

export default Lesson1