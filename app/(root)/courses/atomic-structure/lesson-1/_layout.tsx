import { Stack } from "expo-router";
import { createContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import LessonHeader from "@/components/courses/LessonHeader";

export const ProgressContext = createContext<
  React.Dispatch<React.SetStateAction<number>> | undefined
>(undefined);

const Layout = () => {
  const [progress, setProgress] = useState(0);

  return (
    <ProgressContext.Provider value={setProgress}>
      <SafeAreaView className="h-full bg-white">
        <LessonHeader progress={progress} courseName="atomic-structure" />

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
    </ProgressContext.Provider>
  );
};

export default Layout;
