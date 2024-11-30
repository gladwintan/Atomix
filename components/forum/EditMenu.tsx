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
          <View className='flex-row items-center'>
            {/* Edit Button */}
            <CustomButton
              title=''
              type='transparent'
              IconLeft={() => <Image source={icons.edit} tintColor="#9ca3af" className='w-4 h-4 text-gray-400'/>}
              onPress={() => {
                setShowDeleteMenu(false)
                setIsEditing(true)
              }}
              className='p-1'
            />

            {/* Delete Button */}
            <CustomButton
              title=''
              type='transparent'
              IconLeft={() => <Image source={icons.deleteIcon} tintColor="#9ca3af" className='w-4 h-4'/>}
              onPress={() => {
                setIsEditing(false)
                setShowDeleteMenu(true)
              }}
              className='p-1'
            />
          </View>
        ) : isEditing ? (
          <View className='justify-end items-center flex-row space-x-2'>
            {/* Editing state */}
            {editState.loading ?
              <Text className='font-openSans text-dark-base mr-3'>updating post...</Text>
              : editState.error ?
              <Text className='font-openSans text-red-400 mr-3'>{editState.error}</Text>
              : null
            }

            {/* Cancel edit button */}
            <CustomButton
              title='cancel'
              type='cancel'
              textVariant='primary'
              textClassName='text-xs'
              onPress={() => {
                setIsEditing(false)
              }}
            />

            {/* Confirm edit button */}
            <CustomButton
              title='save changes'
              type='confirm'
              textVariant='white'
              textClassName='text-xs'
              onPress={handleEdit}
            />
          </View> 
        ) : showDeleteMenu ? (
          <View className='justify-end items-center flex-row space-x-2'>
            {/* Cancel delete button */}
            <CustomButton
              title='cancel'
              type='cancel'
              textVariant='primary'
              textClassName='text-xs'
              onPress={() => {
                setShowDeleteMenu(false)
              }}
            />

            {/* Delete button */}
            <CustomButton
              title='Delete'
              type='confirm'
              textVariant='white'
              textClassName='text-xs'
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