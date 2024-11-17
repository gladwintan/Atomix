import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        animation: "none",
        headerShown: false,
        contentStyle : {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="[postId]" />
    </Stack>
  );
};

export default Layout;
