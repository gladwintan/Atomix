import { Image, View, Text, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import InputField from '../InputTextField'
import CustomButton from '../CustomButton'
import { icons } from '@/constants'
import { createPost } from '@/lib/forum'
import { useUser } from '@clerk/clerk-expo'
import { Post } from '@/types/type'

const CreatePostMenu = ({
  setShowCreateMenu,
}: {
  setShowCreateMenu: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [topic, setTopic] = useState("")
  
  return (
    <View className='p-4'>
      <Text>{title}</Text>
      <InputField 
        label='Question'
        placeholder='Question' 
        onChangeText={setTitle}
        multiline
        textAlignVertical='top'
        containerStyle=''
      />
      <InputField 
        label='Topic'
        placeholder='Topic' 
        onChangeText={setTopic}
        textAlignVertical='top'
        containerStyle=''
      />
      <InputField 
        label='Difficulty'
        placeholder='Difficulty' 
        onChangeText={setDifficulty}
        textAlignVertical='top'
        containerStyle=''
      />
      <InputField 
        label='Additional description'
        placeholder='Enter additional details about the question here' 
        onChangeText={setDescription}
        multiline
        textAlignVertical='top'
        containerStyle=''
        inputStyle='leading-5'
      />
      <View>
        <CustomButton 
          title='create'
          IconRight={() => <Image source={icons.add} className='w-4 h-4' />}
          onPress={() => {
            createPost(title, description, difficulty, topic, userClerkId);
            setShowCreateMenu(false)
          }}
          className='place-self-start'
        />
      </View>
    </View>    
  )
}

export default CreatePostMenu