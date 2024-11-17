import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import CustomButton from '../CustomButton';
import { icons } from '@/constants';
import { createLikeForPost, deletePost, getLikeForPost, removeLikeForPost } from '@/lib/forum';
import { MaterialIcons } from '@expo/vector-icons';
import { Post } from '@/types/type';
import { Href, Link, router } from 'expo-router';
import { formatPostTime } from '@/lib/utils';

const ForumPostCard = ({
  postId,
  likeCount,
  replyCount,
  question,
  difficulty,
  topic,
  author,
  creationDate,
  posts,
  setPosts
} : {
  postId: string,
  likeCount: string,
  replyCount: string,
  question: string,
  difficulty: string,
  topic: string,
  author: string, 
  creationDate: string,
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const handleDeletePost = () => {
    deletePost(postId, userClerkId)
    setPosts(posts.filter(post => !(post.id == postId)))
  }
  
  return (
    <TouchableOpacity 
      className='p-4'
      onPress={() => router.push(`/(root)/forum/${postId}` as Href)}
    >
      <View className='flex-row space-x-3'>
        <Text className='font-openSans-semibold bg-sky-400 text-white p-1 px-2 rounded-md'>{difficulty}</Text>
        <Text className='font-openSans-semibold bg-primary-700 text-white p-1 px-2 rounded-full'>{topic}</Text>
      </View>

      <Text className='font-openSans-medium text-base text-dark-base mt-3'>{question}</Text>

      <View className='flex-row items-center space-x-2.5 mt-2'>
        <Text className='font-openSans text-dark-light'>by {author}</Text>
        <View className='flex-row items-center space-x-1'>
          <Image source={icons.time} tintColor="#4b5563" className='h-4 w-4' />
          <Text className='text-gray-600'>posted {formatPostTime(creationDate)}</Text>
        </View>
      </View>

      <View className='flex-row items-center space-x-3 mt-6 justify-end'>
        <View className='flex-row items-center'>
          <Image source={icons.comment} tintColor="#6b7280" className='w-5 h-5' />
          <Text className='ml-1 font-openSans-light'>{replyCount}</Text>
        </View>
        <View className='flex-row items-center'>
          <MaterialIcons name='favorite-border' color='#6b7280' size={20}/>
          <Text className='ml-1 font-openSans-light'>{likeCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ForumPostCard