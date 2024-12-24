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
    <View className="w-[100vw]">
      <Text>{title}</Text>
      <Text>{description}</Text>
      <CustomButton title="Next" type="continue" onPress={onPress} />
    </View>
  );
};

export default NotesCard;
