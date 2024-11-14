import React from "react";
import { View, Text } from "react-native";
import ReactNativeModal from "react-native-modal";

import CustomButton from "../CustomButton";

const AnswerVerification = ({
  correctAnswer,
  message,
  onPress,
}: {
  correctAnswer: boolean;
  message: string;
  onPress: () => void;
}) => {
  return correctAnswer ? (
    <ReactNativeModal
      isVisible={true}
      backdropOpacity={0.1}
      className="w-full rounded-3xl absolute -bottom-5 pb-6 self-center bg-white"
    >
      <View className="h-full mb-4">
        <Text className="text-center text-base p-10">{message}</Text>
        <CustomButton title="Continue" type="continue" onPress={onPress} />
      </View>
    </ReactNativeModal>
  ) : (
    <ReactNativeModal
      isVisible={true}
      backdropOpacity={0.1}
      className="w-full rounded-3xl absolute -bottom-5 pb-6 self-center bg-white"
    >
      <View className="h-full mb-4">
        <Text className="text-center text-base p-10">{message}</Text>
        <CustomButton title="Try again" type="continue" onPress={onPress} />
      </View>
    </ReactNativeModal>
  );
};

export default AnswerVerification;
