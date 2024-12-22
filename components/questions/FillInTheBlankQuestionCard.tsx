import { router } from "expo-router";
import React from "react";
import { useState } from "react";
import { Image, View, Text } from "react-native";

import AnswerVerification from "@/components/questions/AnswerVerification";
import { FillInTheBlankQuestion } from "@/types/type";

import CustomButton from "../CustomButton";

const FillInTheBlankQuestionCard = ({
  question,
  options,
  questionWithBlanks,
  answer,
  onPressNextQuestion,
  imageSrc,
}: FillInTheBlankQuestion & { onPressNextQuestion: () => void }) => {
  const [remainingOptions, setRemainingOptions] = useState(options);
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);

  const checkAnswer = () => {
    const arr = selectedAnswer.filter(
      (selection, index) => selection == answer[index]
    );
    return arr.length == answer.length;
  };

  return (
    <View className="bg-white p-3 w-[100vw]">
      {imageSrc && (
        <Image
          source={imageSrc}
          className="self-center w-11/12 max-w-md"
          resizeMode="contain"
        />
      )}

      <Text className="text-center px-2 text-base font-medium text-dark-lighter my-3">
        {question}
      </Text>

      <View className="flex-row flex-wrap items-center justify-center p-10 gap-y-4">
        {questionWithBlanks.map((text, index) =>
          text.index == -1 ? (
            <Text key={index} className="text-base text-dark-base">
              {" "}
              {text.text}
            </Text>
          ) : text.index < selectedAnswer.length ? (
            <View key={index} className="flex-row items-center">
              <Text className="text-base text-dark-base">{text.text}</Text>
              <CustomButton
                title={selectedAnswer[text.index]}
                type="answer"
                textVariant="answer"
                onPress={() => {
                  setSelectedAnswer(
                    selectedAnswer.filter(
                      (selection) => selection != selectedAnswer[text.index]
                    )
                  );
                  setRemainingOptions([
                    ...remainingOptions,
                    selectedAnswer[text.index],
                  ]);
                }}
              />
            </View>
          ) : index == questionWithBlanks.length - 1 ? (
            <Text key={index} className="text-base text-dark-base">
              {text.text}
            </Text>
          ) : (
            <Text key={index} className="text-base text-dark-base">
              {text.text} ________
            </Text>
          )
        )}
      </View>
      <View className="px-10 flex-row flex-wrap gap-x-6 gap-y-4 justify-center">
        {remainingOptions.map((option, index) => (
          <CustomButton
            key={index}
            title={option}
            type="answer"
            textVariant="answer"
            onPress={() => {
              setSelectedAnswer([...selectedAnswer, option]);
              setRemainingOptions(
                remainingOptions.filter((remaining) => remaining != option)
              );
            }}
          />
        ))}
      </View>
      {selectedAnswer.length == answer.length &&
        (checkAnswer() ? (
          <AnswerVerification
            correctAnswer={true}
            message="Yay! you are correct"
            onPress={() => {
              setSelectedAnswer([]);
              onPressNextQuestion();
            }}
          />
        ) : (
          <AnswerVerification
            correctAnswer={false}
            message="Please try again!"
            onPress={() => {
              setSelectedAnswer([]);
              setRemainingOptions(options);
            }}
          />
        ))}
    </View>
  );
};

export default FillInTheBlankQuestionCard;
