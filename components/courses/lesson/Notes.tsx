import { View, Text } from "react-native";
import React from "react";
import { Notes } from "@/types/type";
import CustomButton from "../../CustomButton";

const NotesCard = ({
  title,
  description,
  imageSrc,
  onPress,
}: Notes & { onPress: () => void }) => {
  return (
    <View className="w-[100vw] flex-1">
      <View className="px-4 flex-1">
        <Text className="font-openSans-medium text-base">{title}</Text>
        <Text className="font-openSans text-sm">{description}</Text>
      </View>
      <CustomButton
        title="Next"
        type="continue"
        textVariant="white"
        onPress={onPress}
      />
    </View>
  );
};

export default NotesCard;
