import { router } from "expo-router";
import React from "react";
import { View, Text, SafeAreaView } from "react-native";

import CustomButton from "@/components/CustomButton";

const Page3 = () => {
  return (
    <SafeAreaView>
      <Text>page3</Text>
      <CustomButton
        title="next"
        onPress={() =>
          router.push("/(root)/courses/atomic-structure/lesson-2/page4")
        }
      />
    </SafeAreaView>
  );
};

export default Page3;
