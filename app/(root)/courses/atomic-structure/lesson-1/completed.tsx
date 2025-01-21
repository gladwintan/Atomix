import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

import CustomButton from "@/components/CustomButton";
import { updateCourseProgress } from "@/lib/courses";

const CompletedPage = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  return (
    <SafeAreaView className="h-full bg-white">
      <CustomButton
        title="return to course page"
        onPress={() => {
          updateCourseProgress("Atomic Structure", 1, userClerkId);
          router.replace("/(root)/courses/atomic-structure");
        }}
        type="continue"
        className="absolute bottom-2"
      />
    </SafeAreaView>
  );
};

export default CompletedPage;
