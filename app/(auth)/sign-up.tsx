import { Link } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputTextField from "@/components/InputTextField";

const SignUp = () => {
    
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
						/>
						<InputTextField
							label="Email"
							placeholder="Enter email"
							textContentType="emailAddress"
						/>
						<InputTextField
							label="Password"
							placeholder="Enter password"
							secureTextEntry={true}
							textContentType="password"
						/>
						<CustomButton
							title="Sign Up"
							className="mt-6"
						/>
						<Link
							href="/sign-in"
							className="text-lg text-center text-general-200 mt-10"
						>
							Already have an account? &nbsp;
							<Text className="text-black font-semibold">Log In</Text>
						</Link>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
  );
};

export default SignUp;