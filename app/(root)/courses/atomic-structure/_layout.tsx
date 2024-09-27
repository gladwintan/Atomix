import { Stack } from 'expo-router';

const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="lesson1" options={{ headerShown: false }} />
        <Stack.Screen name="lesson2" options={{ headerShown: false }} />
        <Stack.Screen name="lesson3" options={{ headerShown: false }} />
        <Stack.Screen name="lesson4" options={{ headerShown: false }} />
      </Stack>
  );
}

export default Layout;