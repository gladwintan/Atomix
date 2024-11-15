import { useClerk, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <SafeAreaView className="h-full bg-white">
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      <CustomButton
        title="Sign Out"
        onPress={() => signOut(() => router.replace("/(root)/(tabs)/home"))}
        className="w-28 rounded-xl"
      />
    </SafeAreaView>
  );
};

export default Profile;
