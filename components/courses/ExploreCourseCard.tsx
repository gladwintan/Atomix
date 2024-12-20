import { Image, View, Text, TouchableOpacity } from "react-native";

import { icons } from "@/constants";
import { getCourseLevelTagColour } from "@/lib/utils";

const ExploreCourseCard = ({
  courseName,
  description,
  lessons,
  completionStatus,
  difficulty,
  quizzes,
  level,
  subject,
  onPress,
}: {
  courseName: string;
  description: string;
  lessons: number;
  completionStatus: string;
  difficulty: string;
  quizzes: number;
  level: string;
  subject: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View className="w-full p-4">
        <View className="flex-row justify-between items-end w-full">
          <Text className="text-sm font-openSans text-dark-base">
            {courseName}
          </Text>
          <Text
            className={`${getCourseLevelTagColour(level)} p-0.5 px-1 rounded-full font-openSans-semibold text-white text-3xs`}
          >
            {level} {subject}
          </Text>
        </View>

        <Text className="font-openSans text-dark-light mt-1.5 text-[13px]">
          {description}
        </Text>

        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row space-x-1.5">
            <Text className="text-xs font-openSans text-gray-500">
              {lessons} Lessons
            </Text>
            <Text className="text-gray-500">•</Text>
            <Text className="text-xs font-openSans text-gray-500">
              {quizzes} Quizzes
            </Text>
            <Text className="text-gray-500">•</Text>
            <Text className="text-xs font-openSans text-gray-500">
              {difficulty}
            </Text>
          </View>

          {completionStatus == "completed" ? (
            <View className="flex-row bg-green-light items-center p-1 px-2 rounded-md">
              <Text className="font-openSans text-green-dark text-xs">
                completed
              </Text>
              <Image
                source={icons.completed}
                tintColor="#36633e"
                resizeMode="contain"
                className="ml-1 w-3.5 h-3.5"
              />
            </View>
          ) : completionStatus == "ongoing" ? (
            <View className="flex-row bg-primary-50 items-center p-1 px-2 rounded-md">
              <Text className="font-openSans text-dark-lighter text-xs">
                ongoing
              </Text>
              <Image
                source={icons.resume}
                tintColor="#364463"
                resizeMode="contain"
                className="ml-0.5 w-3.5 h-3.5"
              />
            </View>
          ) : (
            <View className="flex-row items-center rounded-md">
              <Text className="font-openSans text-gray-600 text-xs">
                Details
              </Text>
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
