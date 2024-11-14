import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/types/type";

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
	switch (variant) {
		case "primary":
			return "text-black";
		case "secondary":
			return "text-white text-xs";
		case "danger":
			return "text-red-100";
		case "success":
			return "text-green-100";
		case "answer": 
			return "text-dark-base text-base";
		case "answerSuccess": 
			return "text-white text-base font-semibold";
		case "back": 
			return "text-dark-light"
		default:
			return "text-white font-semibold";
  }
};

const getButtonStyle = (type: ButtonProps["type"]) => {
	switch (type) {
		case "outline": 
			return "bg-transparent border-neutral-300 border-[0.5px]";
		case "continue":
			return "w-5/6 self-center bg-primary-base rounded-full p-3";
		case "boolean":
			return "w-36 p-2 bg-white border-2 border-slate-200 rounded-xl shadow-none";
		case "booleanSuccess":
			return "w-36 p-2 bg-green-600 rounded-xl";	
		case "answer":
			return "bg-white rounded-lg px-3 py-1.5 ml-2 shadow-none border-slate-300 border";
		case "answerSuccess":
			return "bg-green-600 rounded-lg px-3 py-1.5 ml-2";
		case "back": 
			return "shadow-none"
		default:
			return "";
	}
}

const CustomButton = ({
	onPress,
	title,
	textVariant = "default",
	IconLeft,
	IconRight,
	className,
	type,
	...props
}: ButtonProps) => {
  return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.4}
			className={`flex flex-row justify-center items-center shadow-sm shadow-neutral-400/70 ${getButtonStyle(type)} ${className}`}
			{...props}
		>
			{IconLeft && <IconLeft />}
			<Text className={`${getTextVariantStyle(textVariant)}`}>
				{title}
			</Text>
			{IconRight && <IconRight />}
		</TouchableOpacity>
  );
};

export default CustomButton;

