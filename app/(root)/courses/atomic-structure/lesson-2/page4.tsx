import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import { View, Text, SafeAreaView } from "react-native";

import CustomButton from "@/components/CustomButton";
import { updateCourseProgress } from "@/lib/courses";

const Page4 = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  return (
    <SafeAreaView>
      <Text>page4</Text>
      <CustomButton
        title="next"
        onPress={() => {
          updateCourseProgress("Atomic Structure", 2, userClerkId);
          router.replace("/(root)/courses/atomic-structure");
        }}
      />
    </SafeAreaView>
  );
};

export default Page4;
