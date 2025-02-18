import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='topic' options={{headerShown: false}}/>
      <Stack.Screen name='results' options={{headerShown: false}}/>
      <Stack.Screen name='leaderboard' options={{headerShown: false}}/>
    </Stack>
  )
}

export default _layout