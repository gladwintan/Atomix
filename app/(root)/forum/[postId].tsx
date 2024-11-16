import { View, Text } from 'react-native'
import React from 'react'
import Post from '@/components/forum/Post'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'

const PostPage = () => {
  const { postId } = useLocalSearchParams()
  console.log(postId)

  return (
    <View>
      <Post postId={postId[0]} />
    </View>
  )
}

export default PostPage