import { View, Text, ScrollView, Image, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { createLikeForPost, deletePost, getLikeForPost, getPostDetailsWithReplies, removeLikeForPost, updatePost } from '@/lib/forum'
import { PostReply, ReplyDetails } from '@/types/type'
import { formatPostTime } from '@/lib/utils'
import CustomButton from '../CustomButton'
import { MaterialIcons } from '@expo/vector-icons'
import { icons } from '@/constants'
import { useUser } from '@clerk/clerk-expo'
import ReplyCard from './ReplyCard'
import { router } from 'expo-router'
import ReplyMenu from './ReplyMenu'
import EditMenu from './EditMenu'

const Post = ({
  postId
}: {
  postId: string
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const textInputRef = useRef<TextInput>(null)
  const [loading, setLoading] = useState(true)
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false)
  
  const [isEditing, setIsEditing] = useState(false)
  const [editedPostDescription, setEditedPostDescription] = useState("")
  const [editState, setEditState] = useState({ loading: false, error: "" })
  
  const [showDeleteMenu, setShowDeleteMenu] = useState(false)
  
  const [showReplyMenu, setShowReplyMenu] = useState(false)
  const [replyDetails, setReplyDetails] = useState<ReplyDetails>({ parentReplyId: null, author: ""})
  
  const [postTitle, setPostTitle] = useState("")
  const [postDescription, setPostDescription] = useState("")
  const [postDifficulty, setPostDifficulty] = useState("")
  const [postTopic, setPostTopic] = useState("")
  const [postAuthor, setPostAuthor] = useState("")
  const [postLikeCount, setPostLikeCount] = useState(0)
  const [postCreationDate, setPostCreationDate] = useState("")
  const [postLastUpdatedDate, setPostLastUpdatedDate] = useState("")
  const [postReplies, setPostReplies] = useState<PostReply[]>([])
  const [postLiked, setPostLiked] = useState(false)
  const [isAuthor, setIsAuthor] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      const { postDetails, success, error } = await getPostDetailsWithReplies(postId, userClerkId)
      
      if (postDetails) {
        setIsAuthor(postDetails.user_is_author)
        setPostTitle(postDetails.title)
        setPostDescription(postDetails.description)
        setPostDifficulty(postDetails.difficulty)
        setPostTopic(postDetails.topic)
        setPostAuthor(postDetails.name)
        setPostLikeCount(parseInt(postDetails.like_count))
        setPostCreationDate(postDetails.created_at)
        setPostLastUpdatedDate(postDetails.last_updated)
        setPostReplies(postDetails.replies)
        setPostLiked(postDetails.user_liked_post)
  
        setEditedPostDescription(postDetails.description)
      } else if (error) {
        //set error message
      }

      setLoading(false)
    }

    fetchData()

  }, [postId])

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        textInputRef.current?.focus()
      }, 100)
    }
  }, [isEditing])

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
    if (postDescription == editedPostDescription) {
      setIsEditing(false)
      return
    }

    setEditState({ ...editState, loading: true })
    const state = await updatePost(editedPostDescription, postId, userClerkId)
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

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView className='flex-1'>

        <View className='px-4 pb-3 border-b border-neutral-300'>            
          {isAuthor &&
            <EditMenu
              handleEdit={handleEditPost}
              handleDelete={handleDeletePost}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editState={editState}
            />
          }

          <Text className='font-openSans-medium mt-4 text-dark-base text-base'>{postTitle}</Text>
          
          <View className='flex-row items-center'>
            <Text numberOfLines={1} className='font-openSans text-dark-base max-w-[70vw]'>by {isAuthor ? "you" : postAuthor}</Text>
            <Text className='font-openSans mx-1.5 text-gray-600'>•</Text>
            <Text className='font-openSans text-gray-600'>{formatPostTime(postCreationDate)}</Text>
          </View>

          <TextInput
            ref={textInputRef}
            editable={isEditing}
            value={isEditing ? editedPostDescription : postDescription}
            onChangeText={setEditedPostDescription}
            className='font-openSans mt-4 text-dark-base'
            placeholder='No description given'
            multiline
            textAlignVertical='top'
            autoFocus
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
                onPress={() => {
                  setReplyDetails({ parentReplyId: null, author: postAuthor })
                  setShowReplyMenu(true)
                }}
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
        </View>
        
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
              replyCount={item.replyCount}
              userLiked={item.userLiked}
              postReplies={postReplies}
              setPostReplies={setPostReplies}
              setReplyDetails={setReplyDetails}
              setShowReplyMenu={setShowReplyMenu}
            />
          )}
          keyExtractor={(item, index) => item.replyId }
          ItemSeparatorComponent={() => (
            <View className="p-2 border-t border-neutral-100" />
          )}
          className="py-2 bg-white"
          scrollEnabled={false}
        />
      </ScrollView>

      {showReplyMenu &&
        <ReplyMenu
          postId={postId}
          parentReplyId={replyDetails.parentReplyId}
          author={replyDetails.author}
          postReplies={postReplies}
          setPostReplies={setPostReplies}
          setShowReplyMenu={setShowReplyMenu}
        />
      }          
    </KeyboardAvoidingView>

  )
}

export default Post