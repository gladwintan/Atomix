import { Image, View, Text, TouchableOpacity } from 'react-native'

import { icons } from '@/constants'
import ReactNativeModal from 'react-native-modal'
import { useState } from 'react'
import CustomButton from './CustomButton'

const LessonCard = ({
  id,
  title,
  description,
  time,
  difficulty,
  lessonsCompleted,
  lastLesson,
  onPress
} : {
  id: number,
  title: string,
  description: string,
  time: string,
  difficulty: number,
  lessonsCompleted: number,
  lastLesson?: boolean
  onPress: () => void
}) => {
  const [showRestartMenu, setShowRestartMenu] = useState(false)
  return (
    <View className='w-[350px]'>
      <View className="bg-slate-50 rounded-lg my-3">
        <View className='flex-row'>
          <View className='bg-[#0286FF]/70 items-center justify-center rounded-tl-lg rounded-br-lg'>
            <Text className='text-white px-3 font-medium'>{id}</Text>
          </View>
          <Text className='p-2 text-base font-medium'>{title}</Text>
        </View>

        <View className='flex-row items-center p-2'>
          <Image 
              source={icons.content} 
              tintColor="black" 
              resizeMode="contain" 
              className="w-6 h-6"
          />
          <Text className='p-2'>{description}</Text>
        </View>

        <View className='px-2 pb-3 flex-row w-full items-center justify-between'>
          <View className='p-1 flex-row items-center justify-center'>
            <Text className='font-bold mr-1 text-gray-500'>•</Text>
            <Text className='ml-1 text-sm text-gray-500'>Difficulty {difficulty}</Text>
          </View>

          <View className='p-1 flex-row items-center justify-center'>
            <Text className='font-bold mr-1 text-gray-500'>•</Text>
            <Image 
              source={icons.time} 
              tintColor="#6b7280" 
              resizeMode="contain" 
              className="w-5 h-5"
            />
            <Text className='ml-1 text-sm text-gray-500'>{time}</Text>
            
          </View>

          {(lessonsCompleted != -1) && id <= lessonsCompleted ?
            <TouchableOpacity
              onPress={() => setShowRestartMenu(true)} 
              className='bg-[#add0b3] w-32 p-1 place-self-end rounded-lg flex-row items-center justify-center'
            >
              <Text className='text-white font-medium'>Completed</Text>
              <Image 
                  source={icons.check} 
                  tintColor="white" 
                  resizeMode="contain" 
                  className="ml-1 w-5 h-5"
              />
            </TouchableOpacity>
            : id == (lessonsCompleted + 1) ?
            <TouchableOpacity
              onPress={onPress} 
              className='bg-[#0286FF]/80 w-32 p-1 place-self-end rounded-lg flex-row items-center justify-center'
            >
              <Text className='text-white font-medium'>Start lesson</Text>
              <Image 
                  source={icons.start} 
                  tintColor="white" 
                  resizeMode="contain" 
                  className="ml-1 w-5 h-5"
              />
            </TouchableOpacity>
            :
            <View
              className='bg-[#0286FF]/50 w-32 p-1 place-self-end rounded-lg flex-row items-center justify-center'
            >
              <Text className='text-white font-medium'>Locked</Text>
              <Image 
                  source={icons.lock} 
                  tintColor="white" 
                  resizeMode="contain" 
                  className="ml-1 w-5 h-5"
              />
            </View>
          }

          {showRestartMenu && 
            <ReactNativeModal
              isVisible={showRestartMenu}
            >
              <View className='rounded-lg p-4 h-[250px] w-[300px] self-center bg-white space-y-5 items-center justify-center'>
                <Text className='text-center text-base mb-2'>You have already completed this lesson</Text>
                <CustomButton
                  title="Restart lesson"
                  onPress={() => {
                    setShowRestartMenu(false);
                    onPress()
                  }}
                />
                <CustomButton
                  title="Start another lesson"
                  onPress={() => setShowRestartMenu(false)}
                />
              </View>
              
            </ReactNativeModal>
          }
        </View>
      </View>
      
      {!lastLesson && 
        <View 
          className={`${(id <= lessonsCompleted) ? "border-[#0286FF]" : "border-slate-300"} 
            ml-4 h-10 w-0 border-2 rounded-b-full rounded-t-full`
          }
        />
      }

    </View>
  )
}

export default LessonCard