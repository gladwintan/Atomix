import { View, Text, TouchableOpacity } from 'react-native'

const LessonCard = ({
  id,
  title,
  description,
  completed,
  onPress
} : {
  id: number,
  title: string,
  description: string,
  completed?: boolean
  onPress: () => void
}) => {
  return (
    <TouchableOpacity onPress={onPress} className='w-[350px]'>
      <View className="bg-slate-50 p-3 my-3">
        <Text>{id}</Text>
        <Text>{title}</Text>
        <Text>{description}</Text>
        {completed &&
          <Text>Lesson completed</Text>
        }
      </View>
    </TouchableOpacity>
  )
}

export default LessonCard