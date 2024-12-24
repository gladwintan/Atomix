import { View, Text } from "react-native";
import React from "react";
import { Notes } from "@/types/type";
import CustomButton from "../CustomButton";

const NotesCard = ({
  title,
  description,
  imageSrc,
  onPress,
}: Notes & { onPress: () => void }) => {
  return (
    <View className="w-[100vw] h-full">
      <View className="px-4">
        <Text className="font-openSans-medium text-base">{title}</Text>
        <Text className="font-openSans text-sm">{description}</Text>
      </View>
      <CustomButton
        title="Next"
        type="continue"
        textVariant="white"
        onPress={onPress}
        className="absolute bottom-3"
      />
    </View>
  );
};

export default NotesCard;
