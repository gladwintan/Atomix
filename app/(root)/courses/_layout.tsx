import { Stack } from 'expo-router';

const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name="atomic-structure" options={{ headerShown: false }} />
        <Stack.Screen name="chemical-bonding" options={{ headerShown: false }} />
        <Stack.Screen name="acid-base-equilibrium" options={{ headerShown: false }} />
        <Stack.Screen name="intro-to-organic-chem" options={{ headerShown: false }} />
      </Stack>
  );
}

export default Layout;