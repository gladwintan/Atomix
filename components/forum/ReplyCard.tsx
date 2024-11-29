import { View, Text, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PostReply, ReplyDetails } from '@/types/type'
import { formatPostTime } from '@/lib/utils'
import CustomButton from '../CustomButton'
import { MaterialIcons } from '@expo/vector-icons'
import { icons } from '@/constants'
import { createLikeForReply, deleteReply, getLikeForReply, removeLikeForReply, updateReply } from '@/lib/forum'
import { useUser } from '@clerk/clerk-expo'
import ReplyMenu from './ReplyMenu'
import EditMenu from './EditMenu'

const ReplyCard = ({
  replyId,
  parentReplyId,
  postId,
  content,
  creationDate,
  lastUpdatedDate,
  author,
  isAuthor,
  likeCount,
  replyCount,
  userLiked,
  postReplies,
  setPostReplies,
  setReplyDetails,
  setShowReplyMenu
} : PostReply & { 
  postReplies: PostReply[], 
  setPostReplies:  React.Dispatch<React.SetStateAction<PostReply[]>>,
  setReplyDetails:  React.Dispatch<React.SetStateAction<ReplyDetails>>,
  setShowReplyMenu: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [loading, setLoading] = useState(true)
  const [replyLikeCount, setReplyLikeCount] = useState(likeCount)
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false)
  const [replyLiked, setReplyLiked] = useState(userLiked)
  const [replyContent, setReplyContent] = useState(content)
  const [editedReplyContent, setEditedReplyContent] = useState(content)
  const [replyLastUpdatedDate, setReplyLastUpdatedDate] = useState(lastUpdatedDate)

  const [isEditing, setIsEditing] = useState(false)
  const [editState, setEditState] = useState({ loading: false, error: "" })

  const handleLikeReply = async () => {
    setLikeButtonDisabled(true)
    if (!replyLiked) {
      await createLikeForReply(replyId, userClerkId)
      setReplyLikeCount(replyLikeCount + 1)
      setReplyLiked(true)
      setLikeButtonDisabled(false)
    } else {
      await removeLikeForReply(replyId, userClerkId)
      setReplyLikeCount(replyLikeCount - 1)
      setReplyLiked(false)
      setLikeButtonDisabled(false)
    }
  }

  const handleEditReply = async () => {
    if (editedReplyContent != replyContent) {
      setEditState({ ...editState, loading: true })
      const state = await updateReply(editedReplyContent, replyId, userClerkId)
      if (state.error) {
        setEditState({ loading: false, ...state })
      }
  
      if (state.success) {
        setReplyContent(editedReplyContent)
        setReplyLastUpdatedDate(new Date().toISOString())
        setIsEditing(false)
        setEditState({ loading: false, error: "" })
      }
    } else {
      setIsEditing(false)
    }
  }

  const handleDeleteReply = () => {
    deleteReply(replyId, userClerkId)
    setPostReplies(postReplies.filter(reply => !(reply.replyId == replyId)))
  }

  return (

    <View className='px-4 py-2'>
      <View className='flex-row justify-between'>
        <View className='flex-row items-center space-x-2'>
          <View className='bg-primary-100 rounded-full w-7 h-7 items-center justify-center'>
            <Text className='font-openSans text-xs'>{author.slice(0, 1)}</Text>
          </View>
          <Text className='font-openSans text-dark-lighter'>{author}</Text>
          <Text className='font-openSans text-gray-600 text-[13px]'>{formatPostTime(creationDate)}</Text>
        </View>
        {isAuthor &&
          <EditMenu
            handleEdit={handleEditReply}
            handleDelete={handleDeleteReply}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editState={editState}
          />  
        }
      </View>

      <TextInput
        editable={isEditing}
        value={isEditing ? editedReplyContent : replyContent}
        onChangeText={setEditedReplyContent}
        className='font-openSans mt-4 text-dark-base leading-6'
        multiline
        textAlignVertical='top'
      />
      
      <View className='flex-row items-center justify-end mt-3'>
        <Text className='font-openSans-light text-xs mr-3'>{(creationDate != replyLastUpdatedDate) && "edited " + formatPostTime(replyLastUpdatedDate)}</Text>
        <CustomButton
          title='Reply'
          textVariant='primary'
          textClassName='text-dark-lighter ml-1'
          type='transparent'
          IconLeft={() => <Image source={icons.reply} tintColor="#253048" className='w-4 h-4'/>}
          onPress={() => {
            setReplyDetails({ parentReplyId: replyId, author: author })
            setShowReplyMenu(true)
          }}
        />
        <CustomButton
          title={replyLikeCount.toString()}
          onPress={() => !likeButtonDisabled && handleLikeReply()}
          type='transparent'
          textVariant='primary'
          textClassName='font-openSans-light ml-1'
          IconLeft={() => replyLiked 
            ? <MaterialIcons name='favorite' color='#ff4f8a' size={20}/>
            : <MaterialIcons name='favorite-border' color='#6b7280' size={20}/>
          }
        />
      </View>
    </View>

  )
}

export default ReplyCard