import { Image, View, Text, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";

import { icons } from "@/constants";
import { formatDate } from "@/lib/utils";
import { Href, router } from "expo-router";

const OngoingCourseCard = ({
  courseId,
  courseName,
  progress,
  lastLesson,
  quizzesUncompleted,
}: {
  courseId: number;
  courseName: string;
  progress: string;
  lastLesson: string;
  quizzesUncompleted: number;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push(`/courses/${courseId}` as Href)}
    >
      <View className="w-[290px] p-3 px-5 rounded-xl bg-white border-[0.5px] border-neutral-200">
        <View className="flex-row justify-between items-center w-full mb-3">
          <Text className="text-sm text-dark-base font-openSans-medium">
            {courseName}
          </Text>
          <View className="bg-primary-base p-1 rounded-md">
            <Image
              source={icons.chemistry}
              tintColor="white"
              resizeMode="contain"
              className="w-4 h-4"
            />
          </View>
        </View>

        <View className="flex-row justify-between mb-5">
          <View className="flex-row items-center">
            <View className="bg-primary-600 p-1 rounded-full">
              <Image
                source={icons.history}
                tintColor="white"
                resizeMode="contain"
                className="w-5 h-5"
              />
            </View>
            <View className="ml-2">
              <Text className="text-xs text-dark-base font-openSans">
                Last lesson
              </Text>
              <Text className="text-2xs text-gray-500 font-openSans">
                {formatDate(lastLesson)}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="bg-primary-600 p-1 rounded-full">
              <Image
                source={icons.quiz}
                tintColor="white"
                resizeMode="contain"
                className="w-5 h-5"
              />
            </View>
            <View className="ml-2">
              <Text className="text-xs text-dark-base font-openSans">Quiz</Text>
              {/* To update uncompleted quizzes with data  */}
              <Text className="text-2xs text-gray-500 font-openSans">
                {quizzesUncompleted} uncompleted
              </Text>
            </View>
          </View>
        </View>

        <Progress.Bar
          progress={parseFloat(progress)}
          height={4}
          width={250}
          unfilledColor="#e2e8f0"
          borderWidth={0}
          color="#93B5FF"
        />
      </View>
    </TouchableOpacity>
  );
};

export default OngoingCourseCard;
