import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClerk, useUser } from '@clerk/clerk-expo'
import { useState } from "react";
import { Button } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import { Client, Account, ID, Storage } from 'react-native-appwrite';
import { storage } from '@/appwrite'

import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const Profile = () => {
  const { user } = useUser()
  const { signOut } = useClerk()

  const [imageUri, setImageUri] = useState<string|null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState(null);

  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[4,3],
      quality:1
    });
  }

return (
  <SafeAreaView className="h-full bg-white">
    <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
    <CustomButton 
      title='Sign Out'
      onPress={() => signOut(() => router.replace("/(root)/(tabs)/home"))}
      className="w-28 rounded-xl"
    />
    <View >
      <Button title='Pick an Image' onPress={pickImage}/>
      {imageUri && typeof imageUri === 'string' ?  (
        <Image source={{uri: imageUri}} style={{ width: 200, height: 200, marginTop: 20 }}/>
        ) : (
        <Text>No image available</Text>
      )}
      <Button title='Upload Image' />
    </View>
  </SafeAreaView>  
);
}

export default Profile