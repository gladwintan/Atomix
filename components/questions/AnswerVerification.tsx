import React from "react";
import { View, Text } from "react-native";
import ReactNativeModal from "react-native-modal";

import CustomButton from "../CustomButton";

const AnswerVerification = ({
  correctAnswer,
  incorrectAnswerMessage,
  correctAnswerMessage,
  onPress,
}: {
  correctAnswer: boolean;
  incorrectAnswerMessage: string;
  correctAnswerMessage: string;
  onPress: () => void;
}) => {
  return (
    <ReactNativeModal
      isVisible={true}
      backdropOpacity={0.1}
      className="w-full rounded-3xl absolute -bottom-5 p-6 self-center bg-white"
    >
      <View className="h-full mb-2">
        <Text className="text-center text-base text-dark-base font-openSans-semibold">
          {correctAnswer ? "You are correct!" : "Please try again!"}
        </Text>
        <Text className="text-center text-base-dark font-openSans text-sm mt-4 mb-10">
          {correctAnswer ? correctAnswerMessage : incorrectAnswerMessage}
        </Text>
        <CustomButton
          title={correctAnswer ? "continue" : "Try again"}
          type="continue"
          textVariant="white"
          onPress={onPress}
        />
      </View>
    </ReactNativeModal>
  );
};

export default AnswerVerification;
