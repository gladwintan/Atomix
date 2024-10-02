import { Stack, router } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import { atomicStructureImages } from '@/constants';

const Layout = () => {
  return (
    
    <SafeAreaView className='h-full bg-white'>
      <View className='p-3 flex-row items-center justify-center'>
        <Text className='text-xl font-medium'>Atomic Orbitals</Text>
        <CustomButton
          title='End Lesson'
          onPress={() => router.replace('/(root)/courses/atomic-structure')}
          className='w-24 absolute right-2 rounded-xl'
          textVariant='secondary'
        />
      </View>

      <Stack screenOptions={{ contentStyle: { backgroundColor: "transparent" }}}>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false, 
            gestureEnabled: false, 
            contentStyle: { 
              backgroundColor: "transparent"
            }
          }} 
        />
        <Stack.Screen 
          name="page1" 
          options={{ 
            headerShown: false, 
            gestureEnabled: false, 
            contentStyle: { 
              backgroundColor: "transparent"
            } 
          }} 
        />
        <Stack.Screen 
          name="page2" 
          options={{ 
            headerShown: false, 
            gestureEnabled: false, 
            contentStyle: { 
              backgroundColor: "transparent"
            } 
          }} 
        />
        <Stack.Screen 
          name="page3" 
          options={{ 
            headerShown: false, 
            gestureEnabled: false, 
            contentStyle: { 
              backgroundColor: "transparent"
            } 
          }} 
        />
        <Stack.Screen 
          name="page4" 
          options={{ 
            headerShown: false, 
            gestureEnabled: false, 
            contentStyle: { 
              backgroundColor: "transparent"
            } 
          }} 
        />
        <Stack.Screen 
          name="completed" 
          options={{ 
            headerShown: false, 
            gestureEnabled: false, 
            contentStyle: { 
              backgroundColor: "transparent"
            } 
          }} 
        />
      </Stack>
    </SafeAreaView>
      
    
      
  );
}

export default Layout;