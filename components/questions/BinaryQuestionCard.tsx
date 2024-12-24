import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import CustomButton from "@/components/CustomButton";
import AnswerVerification from "@/components/questions/AnswerVerification";
import { BinaryQuestion } from "@/types/type";

const BinaryQuestionCard = ({
  question,
  answer,
  imageSrc,
  correctAnswerMessage,
  incorrectAnswerMessage,
  onPressNextQuestion,
}: BinaryQuestion & { onPressNextQuestion: () => void }) => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [answered, setAnswered] = useState(false);

  return (
    <View className="bg-white p-2 w-[100vw] flex-1">
      <View>
        {imageSrc && (
          <Image
            source={imageSrc}
            className="self-center w-10/12 max-w-md"
            resizeMode="contain"
          />
        )}
        <Text className="text-center text-base text-dark-base font-medium px-10 my-8">
          {question}
        </Text>

        <View className="bg-white flex-row justify-center space-x-5">
          <CustomButton
            title="True"
            type={isCorrectAnswer && answer ? "booleanSuccess" : "boolean"}
            textVariant={isCorrectAnswer && answer ? "answerSuccess" : "answer"}
            onPress={() => {
              setIsCorrectAnswer(answer);
              setAnswered(true);
            }}
          />
          <CustomButton
            title="False"
            type={isCorrectAnswer && !answer ? "booleanSuccess" : "boolean"}
            textVariant={
              isCorrectAnswer && !answer ? "answerSuccess" : "answer"
            }
            onPress={() => {
              setIsCorrectAnswer(!answer);
              setAnswered(true);
            }}
          />
        </View>
      </View>
      {answered && (
        <AnswerVerification
          correctAnswer={isCorrectAnswer}
          incorrectAnswerMessage={incorrectAnswerMessage}
          correctAnswerMessage={correctAnswerMessage}
          onPress={() => {
            setAnswered(false);
            isCorrectAnswer && onPressNextQuestion();
          }}
        />
      )}
    </View>
  );
};

export default BinaryQuestionCard;
