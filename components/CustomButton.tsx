import { TouchableOpacity, Text } from "react-native";

import { ButtonProps } from "@/types/type";

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-base-dark font-openSans";
    case "secondary":
      return "text-white text-xs font-openSans-semibold";
    case "white":
      return "text-white font-openSans-bold";
    case "danger":
      return "text-red-100 font-openSans";
    case "success":
      return "text-green-100 font-openSans";
    case "answer":
      return "text-dark-base text-base font-openSans";
    case "answerSuccess":
      return "text-white text-base font-semibold font-openSans";
    case "back":
      return "text-dark-light text-xs font-openSans";
    default:
      return "text-xs font-openSans-medium";
  }
};

const getButtonStyle = (type: ButtonProps["type"]) => {
  switch (type) {
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px] p-2 rounded-lg shadow-none";
    case "continue":
      return "w-3/4 self-center bg-primary-600 rounded-full p-2.5";
    case "boolean":
      return "w-36 p-2 bg-white border-2 border-slate-200 rounded-xl shadow-none";
    case "booleanSuccess":
      return "w-36 p-2 bg-green-600 rounded-xl";
    case "answer":
      return "bg-white rounded-lg px-3 py-1.5 ml-2 shadow-none border-slate-300 border";
    case "answerSuccess":
      return "bg-green-600 rounded-lg px-3 py-1.5 ml-2";
    case "back":
      return "shadow-none";
    case "cancel":
      return "border border-neutral-300 p-1 px-2 rounded-lg shadow-none";
    case "confirm":
      return "bg-primary-700 p-1 px-2 rounded-lg";
    case "transparent":
      return "bg-transparent shadow-none";
    default:
      return "bg-primary-500 p-2 px-3.5 rounded-full";
  }
};

const CustomButton = ({
  onPress,
  title,
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  textClassName,
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
      <Text className={`${getTextVariantStyle(textVariant)} ${textClassName}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
