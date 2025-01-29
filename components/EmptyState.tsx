import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

const EmptyState = ({
  title,
  description,
  imageSrc,
  containerClassName,
}: {
  title: string;
  description?: string;
  imageSrc: ImageSourcePropType;
  containerClassName?: string;
}) => {
  return (
    <View className={`p-2 w-screen items-center ${containerClassName}`}>
      <Image source={imageSrc} resizeMode="contain" className="h-16" />
      <Text className="font-openSans-medium text-dark-base text-xs mt-4 max-w-[60vw]">
        {title}
      </Text>
      <Text className="font-openSans text-gray-500 text-xs mt-1.5 max-w-[60vw] text-center">
        {description}
      </Text>
    </View>
  );
};

export default EmptyState;
