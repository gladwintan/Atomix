import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../CustomButton";
import { router } from "expo-router";
import { updateLessonProgress } from "@/lib/courses";
import { useUser } from "@clerk/clerk-expo";

const LessonCompletionCard = ({
  courseId,
  lessonId,
}: {
  courseId: string;
  lessonId: string;
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const handleLessonCompletion = () => {
    router.replace(`/(root)/courses/${courseId}`);
    updateLessonProgress("1.0", lessonId, userClerkId);
  };

  return (
    <View className="flex-1">
      <View className="flex-1 p-2 items-center justify-center">
        <Text className="text-base font-openSans-semibold">
          Lesson Completed
        </Text>
      </View>
      <CustomButton
        title="Back to course"
        type="continue"
        textVariant="white"
        onPress={handleLessonCompletion}
      />
    </View>
  );
};

export default LessonCompletionCard;
