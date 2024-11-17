import { View, Text, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PostReply } from '@/types/type'
import { formatPostTime } from '@/lib/utils'
import CustomButton from '../CustomButton'
import { MaterialIcons } from '@expo/vector-icons'
import { icons } from '@/constants'
import { createLikeForReply, deleteReply, getLikeForReply, removeLikeForReply, updateReply } from '@/lib/forum'
import { useUser } from '@clerk/clerk-expo'

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
  postReplies,
  setPostReplies
} : PostReply & { 
  postReplies: PostReply[], 
  setPostReplies:  React.Dispatch<React.SetStateAction<PostReply[]>>
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [loading, setLoading] = useState(true)
  const [replyLikeCount, setReplyLikeCount] = useState(likeCount)
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false)
  const [replyLiked, setReplyLiked] = useState(false)
  const [replyContent, setReplyContent] = useState(content)
  const [editedReplyContent, setEditedReplyContent] = useState(content)
  const [replyLastUpdatedDate, setReplyLastUpdatedDate] = useState(lastUpdatedDate)

  const [isEditing, setIsEditing] = useState(false)
  const [editState, setEditState] = useState({ loading: false, error: "" })
  const [showDeleteMenu, setShowDeleteMenu] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const like = await getLikeForReply(replyId, userClerkId)
      if (like.id) {
        setReplyLiked(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [replyId])

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
    setShowDeleteMenu(false)
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
        {(isAuthor && !isEditing && !showDeleteMenu) &&
          <View className='flex-row items-center space-x-1.5'>
            <CustomButton
              title=''
              type='transparent'
              IconLeft={() => <Image source={icons.edit} tintColor="#6b7280" className='w-4 h-4'/>}
              onPress={() => {
                setShowDeleteMenu(false)
                setIsEditing(!isEditing)
              }}
            />
            <CustomButton
              title=''
              type='transparent'
              IconLeft={() => <Image source={icons.deleteIcon} tintColor="#6b7280" className='w-4 h-4'/>}
              onPress={() => {
                setIsEditing(false)
                setShowDeleteMenu(!showDeleteMenu)
              }}
            />
          </View>
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

       {isAuthor && 
          (isEditing ?
            <View className='mt-3 justify-end items-center flex-row space-x-3'>
              {editState.loading ?
                <Text className='font-openSans text-dark-base mr-3'>updating reply...</Text>
                : 
                <Text className='font-openSans text-red-400 mr-3'>{editState.error}</Text>
              }
              <CustomButton
                title='cancel'
                type='cancel'
                textVariant='primary'
                onPress={() => {
                  setIsEditing(false)
                  setEditState({ loading: false, error: "" })
                }}
              />
              <CustomButton
                title='save changes'
                type='confirm'
                textVariant='white'
                onPress={handleEditReply}
              />
            </View>
            : (showDeleteMenu &&
                <View className='mt-3 justify-end items-center flex-row space-x-3'>
                <CustomButton
                  title='cancel'
                  type='cancel'
                  textVariant='primary'
                  onPress={() => {
                    setShowDeleteMenu(false)
                  }}
                />
                <CustomButton
                  title='Delete'
                  type='confirm'
                  textVariant='white'
                  className='bg-red-400'
                  onPress={handleDeleteReply}
                />
              </View>
            )
          )
        }
      
      <View className='flex-row items-center justify-end mt-3'>
        <Text className='font-openSans-light text-xs mr-3'>{(creationDate != replyLastUpdatedDate) && "edited " + formatPostTime(replyLastUpdatedDate)}</Text>
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