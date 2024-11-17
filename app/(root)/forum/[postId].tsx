import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Post from '@/components/forum/Post'
import { useLocalSearchParams } from 'expo-router'

const PostPage = () => {
  const { postId } = useLocalSearchParams()
  
  return (
    <SafeAreaView>
      <Post postId={postId as string} />
    </SafeAreaView>
  )
}

export default PostPage