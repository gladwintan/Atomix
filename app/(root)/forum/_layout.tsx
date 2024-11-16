import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        animation: "none",
        headerShown: false,
      }}
    >
      <Stack.Screen name="[postId]" />
    </Stack>
  );
};

export default Layout;
