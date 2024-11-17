import { View, Text, SafeAreaView, ScrollView, Image, TextInput, FlatList } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { createLikeForPost, createReply, deletePost, getLikeForPost, getPostDetailsWithReplies, isPostAuthor, removeLikeForPost, updatePost } from '@/lib/forum'
import { PostReply } from '@/types/type'
import { formatPostTime } from '@/lib/utils'
import CustomButton from '../CustomButton'
import { MaterialIcons } from '@expo/vector-icons'
import { icons } from '@/constants'
import { useUser } from '@clerk/clerk-expo'
import ReplyCard from './ReplyCard'
import { router } from 'expo-router'

const Post = ({
  postId
}: {
  postId: string
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [isAuthor, setIsAuthor] = useState(false)
  const [loading, setLoading] = useState(true)
  const [postLiked, setPostLiked] = useState(false)
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false)
  
  const textInputRef = useRef<TextInput>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedPostDescription, setEditedPostDescription] = useState("")
  const [editState, setEditState] = useState({ loading: false, error: "" })

  const [showDeleteMenu, setShowDeleteMenu] = useState(false)

  const [showReplyMenu, setShowReplyMenu] = useState(false)
  const [replyContent, setReplyContent] = useState("")

  const [postTitle, setPostTitle] = useState("")
  const [postDescription, setPostDescription] = useState("")
  const [postDifficulty, setPostDifficulty] = useState("")
  const [postTopic, setPostTopic] = useState("")
  const [postAuthor, setPostAuthor] = useState("")
  const [postLikeCount, setPostLikeCount] = useState(0)
  const [postReplyCount, setPostReplyCount] = useState(0)
  const [postCreationDate, setPostCreationDate] = useState("")
  const [postLastUpdatedDate, setPostLastUpdatedDate] = useState("")
  const [postReplies, setPostReplies] = useState<PostReply[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostDetailsWithReplies(postId, userClerkId)
      const postDetails = data[0]

      setIsAuthor(postDetails.is_author)
      setPostTitle(postDetails.title)
      setPostDescription(postDetails.description)
      setPostDifficulty(postDetails.difficulty)
      setPostTopic(postDetails.topic)
      setPostAuthor(postDetails.name)
      setPostLikeCount(parseInt(postDetails.like_count))
      setPostReplyCount(postDetails.reply_count)
      setPostCreationDate(postDetails.created_at)
      setPostLastUpdatedDate(postDetails.last_updated)
      setPostReplies(postDetails.replies)

      setEditedPostDescription(postDetails.description)

      const like = await getLikeForPost(postId, userClerkId)
      if (like.id) {
        setPostLiked(true)
      }

      setLoading(false)
    }
    fetchData()
  }, [postId])

  const focusTextInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus()
    }
  }

  const handleLikePost = async () => {
    setLikeButtonDisabled(true)
    if (!postLiked) {
      await createLikeForPost(postId, userClerkId)
      setPostLikeCount(postLikeCount + 1)
      setPostLiked(true)
      setLikeButtonDisabled(false)
    } else {
      await removeLikeForPost(postId, userClerkId)
      setPostLikeCount(postLikeCount - 1)
      setPostLiked(false)
      setLikeButtonDisabled(false)
    }
  }

  const handleEditPost = async () => {
    setEditState({ ...editState, loading: true })
    const state = await updatePost(editedPostDescription, postId, userClerkId)
    console.log(state)
    if (state.error) {
      setEditState({ loading: false, ...state })
    }

    if (state.success) {
      setPostDescription(editedPostDescription)
      setPostLastUpdatedDate(new Date().toISOString())
      setIsEditing(false)
      setEditState({ loading: false, error: "" })
    }
  }

  const handleDeletePost = () => {
    deletePost(postId, userClerkId)
    router.back()
    //setPosts(posts.filter(post => !(post.id == postId)))
  }

  const handleReplyPost = async () => {
    const newReply = await createReply(replyContent, postId, null, userClerkId)
    setShowReplyMenu(false)
    setPostReplies([...postReplies, newReply.success])
  }

  return (
    <>
      <View className='px-4 pb-3 border-b border-neutral-300'>
        <Text>Post ID: {postId}</Text>
        <Text className='font-openSans-bold text-dark-base text-lg'>Question</Text>
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center'>
            <Text className='font-openSans text-dark-base'>by {postAuthor}</Text>
            <Text className='font-openSans mx-1.5 text-gray-600'>•</Text>
            <Text className='font-openSans text-gray-600'>{formatPostTime(postCreationDate)}</Text>
          </View>
          {(isAuthor && !isEditing && !showDeleteMenu) &&
            <View className='flex-row items-center space-x-1.5'>
              <CustomButton
                title=''
                type='transparent'
                IconLeft={() => <Image source={icons.edit} tintColor="#6b7280" className='w-5 h-5'/>}
                onPress={() => {
                  setShowDeleteMenu(false)
                  setIsEditing(!isEditing)
                  focusTextInput()
                }}
              />
              <CustomButton
                title=''
                type='transparent'
                IconLeft={() => <Image source={icons.deleteIcon} tintColor="#6b7280" className='w-5 h-5'/>}
                onPress={() => {
                  setIsEditing(false)
                  setShowDeleteMenu(!showDeleteMenu)
                }}
              />
            </View>
          }
        </View>

        {isAuthor && 
          (isEditing ?
            <View className='mt-3 justify-end items-center flex-row space-x-3'>
              {editState.loading ?
                <Text className='font-openSans text-dark-base mr-3'>updating post...</Text>
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
                onPress={handleEditPost}
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
                  onPress={handleDeletePost}
                />
              </View>
            )
          )
        }
        <Text className='font-openSans-medium mt-4 text-dark-base text-base'>{postTitle}</Text>

        <TextInput
          editable={isEditing}
          value={isEditing ? editedPostDescription : postDescription}
          onChangeText={setEditedPostDescription}
          className='font-openSans mt-4 text-dark-base leading-6'
          placeholder='No description given'
          multiline
          textAlignVertical='top'
          ref={textInputRef}  
        />

        <View className='flex-row items-center justify-between mt-6'>
          <Text className='font-openSans-light text-xs'>edited {formatPostTime(postLastUpdatedDate)}</Text>
          <View className='flex-row items-center justfy-center space-x-5'>
            <CustomButton
              title='Reply'
              textVariant='primary'
              textClassName='text-dark-lighter ml-1'
              type='transparent'
              IconLeft={() => <Image source={icons.reply} tintColor="#253048" className='w-4 h-4'/>}
              onPress={() => setShowReplyMenu(!showReplyMenu)}
            />
            <CustomButton
              title={postLikeCount.toString()}
              onPress={() => !likeButtonDisabled && handleLikePost()}
              type='transparent'
              textVariant='primary'
              textClassName='font-openSans-light ml-1'
              IconLeft={() => postLiked 
                ? <MaterialIcons name='favorite' color='#ff4f8a' size={20}/>
                : <MaterialIcons name='favorite-border' color='#6b7280' size={20}/>
              }
            />
          </View>
        </View>
        {showReplyMenu &&
          <View>
            <TextInput
              editable={showReplyMenu}
              value={replyContent}
              onChangeText={setReplyContent}
              className='font-openSans mt-4 text-dark-base leading-6'
              placeholder='Enter your reply here'
              multiline
              textAlignVertical='top'
            />
            <CustomButton
              title='send reply'
              type='confirm'
              textVariant='white'
              className='self-end'
              onPress={handleReplyPost}
            />
          </View>  
        }
      </View>
      <SafeAreaView>
        <FlatList
          data={postReplies}
          renderItem={({ item }) => (
            <ReplyCard
              replyId={item.replyId}
              parentReplyId={item.parentReplyId}
              postId={item.postId}
              content={item.content}
              author={item.author}
              isAuthor={item.isAuthor}
              creationDate={item.creationDate}
              lastUpdatedDate={item.lastUpdatedDate}
              likeCount={item.likeCount}
              postReplies={postReplies}
              setPostReplies={setPostReplies}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View className="p-2 border-t border-neutral-100" />
          )}
          className="py-2 bg-white"
        />
      </SafeAreaView>
    </>
  )
}

export default Post