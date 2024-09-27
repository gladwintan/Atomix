import { View, Text, TouchableOpacity } from 'react-native'

const LessonCard = ({
  id,
  title,
  description,
  onPress
} : {
  id: number,
  title: string,
  description: string,
  onPress: () => void
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="bg-slate-50 p-3 w-full my-3">
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default LessonCard