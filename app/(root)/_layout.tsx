import { SelectionProvider } from '@/trash/Usercontext';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="courses" options={{ headerShown: false }} />
        <Stack.Screen name="quiz" options={{ headerShown: false }} />
      </Stack>

  );
}

export default Layout;