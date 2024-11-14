import { router } from "expo-router";
import React from "react";
import { View, Text, SafeAreaView } from "react-native";

import CustomButton from "@/components/CustomButton";

const Page1 = () => {
  return (
    <SafeAreaView>
      <Text>page1</Text>
      <CustomButton
        title="next"
        onPress={() =>
          router.push("/(root)/courses/atomic-structure/lesson-2/page2")
        }
      />
    </SafeAreaView>
  );
};

export default Page1;
