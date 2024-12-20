import { Stack } from "expo-router";

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
      <Stack.Screen name="atomic-structure" />
      <Stack.Screen name="chemical-bonding" />
      <Stack.Screen name="acid-base-equilibrium" />
      <Stack.Screen name="intro-to-organic-chem" />
    </Stack>
  );
};

export default Layout;
