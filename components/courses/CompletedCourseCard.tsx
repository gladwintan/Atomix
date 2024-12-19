import { Image, View, Text, TouchableOpacity } from "react-native";

import { icons } from "@/constants";
import { formatDate } from "@/lib/utils";

const CompletedCourseCard = ({
  courseName,
  progress,
  lastLesson,
  onPress,
}: {
  courseName: string;
  progress: string;
  lastLesson: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View className="w-[120px] min-h-[120px] p-2 justify-between items-center rounded-xl shadow-sm shadow-neutral-300 bg-white">
        <Text className="text-sm text-dark-base font-openSans text-center">
          {courseName}
        </Text>

        <View className="items-center space-y-1.5">
          <View className="flex-row items-center space-x-1">
            <Text className="text-xs text-gray-500 font-openSans">
              completed
            </Text>
            <Image
              source={icons.completed}
              tintColor="#6b7280"
              resizeMode="contain"
              className="w-3 h-3"
            />
          </View>

          <View className="bg-[#E9F0FF] p-1 px-2 rounded-md">
            <Text className="text-xs text-dark-base font-openSans-light">
              {formatDate(lastLesson)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CompletedCourseCard;
