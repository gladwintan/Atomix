import { Stack } from 'expo-router';

const Layout = () => {
  return (
      <Stack screenOptions={{ gestureEnabled: false, animation: 'none' }}>
        <Stack.Screen name="atomic-structure" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="chemical-bonding" options={{ headerShown: false }} />
        <Stack.Screen name="acid-base-equilibrium" options={{ headerShown: false }} />
        <Stack.Screen name="intro-to-organic-chem" options={{ headerShown: false }} />
      </Stack>
  );
}

export default Layout;