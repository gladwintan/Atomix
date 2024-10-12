import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
	switch (variant) {
		case "secondary":
			return "bg-gray-500";
		case "danger":
			return "bg-red-500";
		case "success":
			return "bg-green-500";
		case "outline":
			return "bg-transparent border-neutral-300 border-[0.5px]";
		default:
			return "bg-[#0286FF]";
	}
};

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
		case "boolean": 
			return "text-slate-700 font-medium text-base";
		case "answer":
			return "text-slate-800 font-normal text-base"
		default:
			return "text-white";
  }
};

const getButtonStyle = (type: ButtonProps["type"]) => {
	switch (type) {
		case "continue":
			return "w-5/6 self-center";
		case "boolean":
			return "w-36 bg-white border border-slate-200 rounded-2xl shadow-2xs";
		case "answer":
			return "bg-white rounded-xl py-1.5 ml-2"
		default:
			return "";
	}
}

const CustomButton = ({
	onPress,
	title,
	bgVariant = "primary",
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
			className={`rounded-full p-3 flex flex-row justify-center items-center shadow-sm shadow-neutral-400/70 
				${getBgVariantStyle(bgVariant)} ${getButtonStyle(type)} ${className}`}
			{...props}
		>
			{IconLeft && <IconLeft />}
			<Text className={`text-lg font-semibold ${getTextVariantStyle(textVariant)}`}>
				{title}
			</Text>
			{IconRight && <IconRight />}
		</TouchableOpacity>
  );
};

export default CustomButton;

