import { View, Text } from 'react-native'
import React from 'react' 
import { Stack } from 'expo-router'
import { NavigationContainer } from '@react-navigation/native'

const _layout = () => {
  return (
      <Stack>
        <Stack.Screen name='quiz 1' options={{headerShown: false}}/>
        <Stack.Screen name='quiz 2' options={{headerShown: false}}/>
      </Stack>
  )
}

export default _layout