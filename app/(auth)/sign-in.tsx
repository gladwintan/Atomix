import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputTextField from "@/components/InputTextField";
import OAuth from "@/components/OAuth";
import { icons } from "@/constants";

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: signInForm.email,
        password: signInForm.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, signInForm]);

  return (
    <KeyboardAvoidingView
			className="flex-1"
			behavior={Platform.OS == "ios" ? "padding" : "height"}
		>
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <View className="relative w-full h-[250px]">
            <Text className="text-2xl text-black font-semibold absolute bottom-5 left-5">
              Welcome to Atomix
            </Text>
          </View>

          <View className="p-5">
            <InputTextField
              label="Email"
              placeholder="Enter email"
              textContentType="emailAddress"
              value={signInForm.email}
              onChangeText={(value) => setSignInForm({ ...signInForm, email: value })}
              icon={icons.email}
            />

            <InputTextField
              label="Password"
              placeholder="Enter password"
              secureTextEntry={true}
              textContentType="password"
              value={signInForm.password}
              onChangeText={(value) => setSignInForm({ ...signInForm, password: value })}
              icon={icons.password}
            />

            <Link
              href="/reset-password"
              className="underline mt-1"
            >
              Forgot Password?
            </Link>

            <CustomButton
              title="Sign In"
              onPress={onSignInPress}
              className="mt-7"
            />

            <OAuth />

            <Link
              href="/sign-up"
              className="text-base text-center mt-8"
            >
              Don't have an account? &nbsp;
              <Text className="text-black font-semibold">Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;