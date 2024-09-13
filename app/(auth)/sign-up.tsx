import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputTextField from "@/components/InputTextField";

const SignUp = () => {
	return (
		<SafeAreaView>
			<InputTextField
					label="Email"
					placeholder="Enter email"
			/>
		</SafeAreaView>  
	);
};

export default SignUp;