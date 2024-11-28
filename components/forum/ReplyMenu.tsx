import { View, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import ReactNativeModal from 'react-native-modal'
import { createReply } from '@/lib/forum'
import { useUser } from '@clerk/clerk-expo'
import { PostReply } from '@/types/type'
import CustomButton from '../CustomButton'

const ReplyMenu = ({
  postId,
  parentReplyId,
  author,
  postReplies,
  setPostReplies,
  setShowReplyMenu,
  showReplyMenu
}: {
  postId: string,
  parentReplyId: string | null,
  author: string,
  postReplies: PostReply[],
  setPostReplies:  React.Dispatch<React.SetStateAction<PostReply[]>>,
  setShowReplyMenu: React.Dispatch<React.SetStateAction<boolean>>,
  showReplyMenu: boolean
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [replyContent, setReplyContent] = useState("")

  const handleReply = async () => {
    const newReply = await createReply(replyContent, postId, parentReplyId, userClerkId)
    if (newReply.success) {
      setShowReplyMenu(false)
      setReplyContent("")
      setPostReplies([...postReplies, newReply.success])
    }
  }

  return (
    <ReactNativeModal
      isVisible={showReplyMenu}
      backdropOpacity={0.1}
      backdropColor='rgba(0, 0, 0, 0)'
      onBackdropPress={() => setShowReplyMenu(false)}
      className='justify-end w-full relative -bottom-5 self-center'
      avoidKeyboard
    >
      <View className='bg-white shadow-xl p-4'>
        <Text className='font-openSans text-gray-500 mb-2 text-xs'>Reply to {author}</Text>
        <TextInput
          value={replyContent}
          onChangeText={setReplyContent}
          className='font-openSans text-dark-base mb-4 max-h-[100px]'
          placeholder='Enter your reply here'
          multiline
          textAlignVertical='top'
          autoFocus
        />
        <CustomButton
          title='send reply'
          type='confirm'
          textVariant='white'
          className='self-end'
          onPress={handleReply}
        />
      </View>
    </ReactNativeModal>
  )
}

export default ReplyMenu
