import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.success) {
      router.replace("/(root)/(tabs)/home");
    } else {
      Alert.alert(result.success ? "Success" : "Error", result.message);
    }
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-5">
        <View className="flex-1 h-[1px] bg-black" />
        <Text className="text-lg mx-3">or</Text>
        <View className="flex-1 h-[1px] bg-black" />
      </View>

      <CustomButton
        title="Sign In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mr-5"
          />
        )}
        type="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
