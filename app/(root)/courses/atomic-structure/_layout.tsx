import { Stack } from 'expo-router';

const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="lesson-1" options={{ headerShown: false }} />
        <Stack.Screen name="lesson-2" options={{ headerShown: false }} />
        <Stack.Screen name="lesson-3" options={{ headerShown: false }} />
        <Stack.Screen name="lesson-4" options={{ headerShown: false }} />
      </Stack>
  );
}

export default Layout;