import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const Post = ({
  postId
}: {
  postId: string
}) => {
  return (
    <SafeAreaView>
      <Text>Post ID: {postId}</Text>
    </SafeAreaView>
  )
}

export default Post