import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { Stack, router } from "expo-router";
import { Image } from "react-native";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: "none",
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="[postId]"
        options={{
          headerTitle: "",
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
          headerLeft: () => (
            <CustomButton
              title="back"
              textVariant="back"
              type="back"
              IconLeft={() => (
                <Image
                  source={icons.arrowLeft}
                  tintColor="#364463"
                  className="w-3 h-3 mr-1"
                />
              )}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="my-activity"
        options={{
          headerTitle: "My Activity",
          headerTitleStyle: {
            fontFamily: "openSans",
            fontWeight: "700",
            fontSize: 16,
            color: "#161d2e",
          },
          headerShown: true,
          headerShadowVisible: true,
          headerStyle: { backgroundColor: "white" },
          headerLeft: () => (
            <CustomButton
              title="back"
              textVariant="back"
              type="back"
              IconLeft={() => (
                <Image
                  source={icons.arrowLeft}
                  tintColor="#364463"
                  className="w-3 h-3 mr-1"
                />
              )}
              onPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
