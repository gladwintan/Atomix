import { useState } from 'react'
import { View, Text, Image } from 'react-native'
import CustomButton from '../CustomButton'
import { icons } from '@/constants'

const EditMenu = ({
  handleEdit,
  handleDelete,
  isEditing,
  setIsEditing,
  editState
}: {
  handleEdit: () => void,
  handleDelete: () => void,
  isEditing: boolean,
  setIsEditing:  React.Dispatch<React.SetStateAction<boolean>>,
  editState: { loading: boolean, error: string }
}) => {
  const [showDeleteMenu, setShowDeleteMenu] = useState(false)

  return ( 
    <View>
      {
        (!isEditing && !showDeleteMenu) ? (
          <View className='flex-row items-center space-x-1.5'>
            {/* Edit Button */}
            <CustomButton
              title=''
              type='transparent'
              IconLeft={() => <Image source={icons.edit} tintColor="#6b7280" className='w-5 h-5'/>}
              onPress={() => {
                setShowDeleteMenu(false)
                setIsEditing(true)
              }}
            />

            {/* Delete Button */}
            <CustomButton
              title=''
              type='transparent'
              IconLeft={() => <Image source={icons.deleteIcon} tintColor="#6b7280" className='w-5 h-5'/>}
              onPress={() => {
                setIsEditing(false)
                setShowDeleteMenu(true)
              }}
            />
          </View>
        ) : isEditing ? (
          <View className='mt-3 justify-end items-center flex-row space-x-3'>
            {/* Editing state */}
            {editState.loading ?
              <Text className='font-openSans text-dark-base mr-3'>updating post...</Text>
              : 
              <Text className='font-openSans text-red-400 mr-3'>{editState.error}</Text>
            }

            {/* Cancel edit button */}
            <CustomButton
              title='cancel'
              type='cancel'
              textVariant='primary'
              onPress={() => {
                setIsEditing(false)
              }}
            />

            {/* Confirm edit button */}
            <CustomButton
              title='save changes'
              type='confirm'
              textVariant='white'
              onPress={handleEdit}
            />
          </View> 
        ) : showDeleteMenu ? (
          <View className='mt-3 justify-end items-center flex-row space-x-3'>
            {/* Cancel delete button */}
            <CustomButton
              title='cancel'
              type='cancel'
              textVariant='primary'
              onPress={() => {
                setShowDeleteMenu(false)
              }}
            />

            {/* Delete button */}
            <CustomButton
              title='Delete'
              type='confirm'
              textVariant='white'
              className='bg-red-400'
              onPress={() => {
                setShowDeleteMenu(false)
                handleDelete()
              }}
            />
          </View>
        ) : null
      }
    </View>
  )
}

export default EditMenu