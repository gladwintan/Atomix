import { router } from "expo-router";
import React, { useEffect } from "react";
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
  correctAnswerMessage,
  incorrectAnswerMessage,
  onPressNextQuestion,
  imageSrc,
}: FillInTheBlankQuestion & { onPressNextQuestion: () => void }) => {
  const [remainingOptions, setRemainingOptions] = useState(options);
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);

  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  useEffect(() => {
    if (selectedAnswer.length != answer.length) return;

    const arr = selectedAnswer.filter(
      (selection, index) => selection == answer[index]
    );
    setAnsweredCorrectly(arr.length == answer.length);
  }, [selectedAnswer]);

  return (
    <View className="bg-white p-3 w-[100vw] flex-1">
      {imageSrc && (
        <Image
          source={imageSrc}
          className="self-center w-10/12 max-w-md"
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
      {selectedAnswer.length == answer.length && (
        <AnswerVerification
          correctAnswer={answeredCorrectly}
          incorrectAnswerMessage={incorrectAnswerMessage}
          correctAnswerMessage={correctAnswerMessage}
          onPress={() => {
            setSelectedAnswer([]);
            answeredCorrectly
              ? onPressNextQuestion()
              : setRemainingOptions(options);
          }}
        />
      )}
    </View>
  );
};

export default FillInTheBlankQuestionCard;
