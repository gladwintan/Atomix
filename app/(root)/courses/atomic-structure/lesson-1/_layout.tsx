import { Stack, router } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";

const Layout = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="p-2 flex-row items-center justify-center">
        <Text className="font-medium text-base">Atomic Orbitals</Text>
        <TouchableOpacity
          onPress={() => router.replace("/(root)/courses/atomic-structure")}
          className="absolute right-4"
        >
          <Image source={icons.close} tintColor="gray" className="w-6 h-6" />
        </TouchableOpacity>
      </View>

      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: "none",
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="question1" />
        <Stack.Screen name="question2" />
        <Stack.Screen name="question3" />
        <Stack.Screen name="question4" />
        <Stack.Screen name="completed" />
      </Stack>
    </SafeAreaView>
  );
};

export default Layout;
