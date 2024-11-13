import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Layout = () => {
  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ gestureEnabled: false, animation: 'none', headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="lesson-1" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="lesson-2" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="lesson-4" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="lesson-3" options={{ headerShown: false, gestureEnabled: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default Layout;