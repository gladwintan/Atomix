import { Image, View, Text, TouchableOpacity } from "react-native";

import { icons } from "@/constants";

const ExploreCourseCard = ({
  courseName,
  description,
  totalLessons,
  completionStatus,
  difficulty,
  quizzes,
  onPress,
}: {
  courseName: string;
  description: string;
  totalLessons: number;
  completionStatus: string;
  difficulty?: string;
  quizzes?: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View className="w-full p-4">
        <View className="flex-row justify-between items-end w-full">
          <Text className="text-sm font-openSans text-dark-base">{courseName}</Text>
          <View className="bg-primary-50 p-1 rounded-md shadow-sm">
            <Image
              source={icons.chemistry}
              tintColor="#475980"
              resizeMode="contain"
              className="w-4 h-4"
            />
          </View>
        </View>

        <Text className="font-openSans-light text-dark-base mt-3 text-[13px] leading-6">
          {description}
        </Text>

        <View className="flex-row justify-between items-center mt-6">
          <View className="flex-row space-x-1.5">
            <Text className="text-xs font-openSans text-dark-light">
              {totalLessons} lessons
            </Text>
            <Text className="text-dark-light">•</Text>
            <Text className="text-xs font-openSans text-dark-light">4 Quiz</Text>
            <Text className="text-dark-light">•</Text>
            <Text className="text-xs font-openSans text-dark-light">Intermediate</Text>
          </View>

          {completionStatus == "completed" ? (
            <View className="flex-row bg-green-light items-center p-1 rounded-md">
              <Text className="font-openSans pl-1 text-green-dark text-xs">Completed</Text>
              <Image
                source={icons.completed}
                tintColor="#36633e"
                resizeMode="contain"
                className="ml-1 w-4 h-4"
              />
            </View>
          ) : completionStatus == "ongoing" ? (
            <View className="flex-row bg-primary-50 items-center p-1 rounded-md">
              <Text className="font-openSans pl-1 text-dark-lighter text-xs">Ongoing</Text>
              <Image
                source={icons.resume}
                tintColor="#364463"
                resizeMode="contain"
                className="w-5 h-5"
              />
            </View>
          ) : (
            <View className="flex-row items-center rounded-md">
              <Text className="font-openSans pl-1 text-gray-600 text-xs">Details</Text>
              <Image
                source={icons.arrowRight}
                tintColor="#4b5563"
                resizeMode="contain"
                className="w-5 h-5"
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExploreCourseCard;
