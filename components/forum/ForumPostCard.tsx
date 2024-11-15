import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import CustomButton from '../CustomButton';
import { icons } from '@/constants';
import { createLikeForPost, deletePost, getLikeForPost, removeLikeForPost } from '@/lib/forum';
import { MaterialIcons } from '@expo/vector-icons';
import { Post } from '@/types/type';

const ForumPostCard = ({
  postId,
  likes,
  question,
  posts,
  setPosts
} : {
  postId: string,
  likes: string,
  question: string,
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [likeCount, setLikeCount] = useState(parseInt(likes))
  const [postLiked, setPostLiked] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const like = await getLikeForPost(postId, userClerkId)
      if (like[0]?.id) {
        setPostLiked(true)
      }
    }
    if (userClerkId) fetchData()
  }, [userClerkId])

  const handleLikePost = async () => {
    if (!postLiked) {
      await createLikeForPost(postId, userClerkId)
      setLikeCount(likeCount + 1)
      setPostLiked(true)
    } else {
      await removeLikeForPost(postId, userClerkId)
      setLikeCount(likeCount - 1)
      setPostLiked(false)
    }
  }

  const handleDeletePost = () => {
    deletePost(postId, userClerkId)
    setPosts(posts.filter(post => !(post.id == postId)))
  }
  
  return (
    <View className='border items-center'>
      <Text>Question: {question}</Text>
      <Text>Post ID: {postId}</Text>
      <Text>Likes: {likeCount}</Text>
      <CustomButton
        title='like'
        IconLeft={() => postLiked 
            ? <MaterialIcons name='favorite' color='red'/>
            : <MaterialIcons name='favorite-border' color='gray'/>
        }
        onPress={handleLikePost}
      />
      <CustomButton
        title='DELETE'
        onPress={handleDeletePost}
      />
    </View>
  )
}

export default ForumPostCard