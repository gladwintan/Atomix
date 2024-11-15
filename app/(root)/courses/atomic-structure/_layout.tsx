import { Stack, router } from "expo-router";
import { Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        animation: "none",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
          headerLeft: () => (
            <CustomButton
              title="courses"
              textVariant="back"
              type="back"
              IconLeft={() => (
                <Image
                  source={icons.arrowLeft}
                  tintColor="#364463"
                  className="w-4 h-4"
                />
              )}
              onPress={() => router.replace("/(root)/(tabs)/course")}
            />
          ),
        }}
      />
      <Stack.Screen name="lesson-1" />
      <Stack.Screen name="lesson-2" />
      <Stack.Screen name="lesson-4" />
      <Stack.Screen name="lesson-3" />
    </Stack>
  );
};

export default Layout;
