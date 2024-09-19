import { Link, router } from "expo-router";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo"
import { useState } from "react";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputTextField from "@/components/InputTextField";

const SignUp = () => {
	const { isLoaded, signUp, setActive } = useSignUp()
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({
				...verification,
				state: "pending"
			})
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2))
			Alert.alert("Error", error.errors[0].longMessage);
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
				setVerification({ ...verification, state: "success" })
      } else {
				setVerification({ 
					...verification, 
					error: "Verification failed", 
					state: "failed" 
				})
      }
    } catch (error: any) {
      setVerification({
				...verification,
				error: error.errors[0].longMessage,
				state: "failed"
			})
    }
  }

  return (
		<KeyboardAvoidingView
			className="flex-1"
			behavior={Platform.OS == "ios" ? "padding" : "height"}
		>
			<ScrollView className="flex-1 bg-white">
				<View className="flex-1 bg-white">
					<View className="relative w-full h-[250px]">
						<Text className="text-2xl text-black absolute bottom-5 left-5">
							Create Your Account
						</Text>
					</View>

					<View className="p-5">
						<InputTextField
							label="Name"
							placeholder="Enter name"
							onChangeText={(name) => setForm({ ...form, name: name })}
						/>
						<InputTextField
							label="Email"
							placeholder="Enter email"
							textContentType="emailAddress"
							onChangeText={(email) => setForm({ ...form, email: email })}
						/>
						<InputTextField
							label="Password"
							placeholder="Enter password"
							secureTextEntry={true}
							textContentType="password"
							onChangeText={(password) => setForm({ ...form, password: password })}
						/>
						<CustomButton
							title="Sign Up"
							className="mt-6"
							onPress={onSignUpPress}
						/>
						<Link
							href="/sign-in"
							className="text-base text-center mt-10"
						>
							Already have an account? &nbsp;
							<Text className="text-black font-semibold">Sign In</Text>
						</Link>
					</View>
					
					{/* pop-up to verify email */}
					<ReactNativeModal
						isVisible={verification.state === "pending" || verification.state === "failed"}
						onModalHide={() => {
							if (verification.state === "success") {
								setShowSuccessModal(true);
							}
						}}
					>
						<View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
							<Text className="font-semibold text-2xl mb-2">
								Verification
							</Text>
							<Text className="mb-5">
								We've sent a verification code to {form.email}.
							</Text>
							<InputTextField
								label={"Code"}
 								placeholder={"123456"}
								value={verification.code}
								keyboardType="numeric"
								onChangeText={(code) =>
									setVerification({ ...verification, code })
								}
							/>
							{verification.error && (
								<Text className="text-red-600 text-base mt-1">
									{verification.error}
								</Text>
							)}
							<CustomButton
								title="Verify Email"
								onPress={onPressVerify}
								className="mt-5 bg-success-500"
							/>
						</View>
					</ReactNativeModal>

					{/* pop-up to indicate successful email verification */}
					<ReactNativeModal isVisible={showSuccessModal}>
						<View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
							<Text className="text-3xl font-bold text-center">
								Verified
							</Text>
							<Text className="text-base text-slate-400 text-center mt-2">
								You have successfully verified your account.
							</Text>
							<CustomButton
								title="Browse Home"
								onPress={() => {
									setShowSuccessModal(false);
									router.push(`/(root)/(tabs)/home`);
								}}
								className="mt-5"
							/>
						</View>
					</ReactNativeModal>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
  );
};

export default SignUp;