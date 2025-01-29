import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { Stack, router } from "expo-router";
import { Image } from "react-native";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        animation: "none",
        headerShown: false,
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="[courseId]"
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
    </Stack>
  );
};

export default Layout;
