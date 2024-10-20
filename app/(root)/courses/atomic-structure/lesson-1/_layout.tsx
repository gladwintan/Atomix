import { Stack, router } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import { atomicStructureImages, icons } from '@/constants';

const Layout = () => {
  return (
    
    <SafeAreaView className='h-full bg-white'>
      <View className='p-2 flex-row items-center justify-center'>
        <Text className='font-medium text-base'>Atomic Orbitals</Text>
        <TouchableOpacity
          onPress={() => router.replace('/(root)/courses/atomic-structure')}
          className='absolute right-4'
        >
          <Image source={icons.close} tintColor="gray" className='w-6 h-6'/>
        </TouchableOpacity>
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