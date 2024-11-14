import { router } from "expo-router";
import React from "react";
import { Image, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";

const Lesson1 = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <CustomButton
        title="continue"
        onPress={() =>
          router.replace("/(root)/courses/atomic-structure/lesson-1/question1")
        }
        type="continue"
        className="absolute bottom-2"
      />
    </SafeAreaView>
  );
};

export default Lesson1;
