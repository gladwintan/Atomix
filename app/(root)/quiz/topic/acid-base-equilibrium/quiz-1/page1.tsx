import { View, Text, Alert, Button, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as Progress from 'react-native-progress'
import { useEffect } from 'react'

import { QuestionType, UserProgress, QuizAnswer } from '@/types/type'
import { quiz } from '@/courses/AcidBaseQuiz'
import MultipleResponseQuestion from '@/components/quiz/questions/MultipleChoiceQuestion'
import FillInTheBlankQuestion from '@/components/quiz/questions/FillInTheBlankQuestion'
import BinaryQuestion from '@/components/quiz/questions/BinaryQuestion'

const page1= () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion: QuestionType = quiz[currentIndex]

  const initialProgress = (): UserProgress => {
    return {
      score: 0,
      topic: '',
      answers: []
    }
  }

  const [userProgress, setUserProgress] = useState<UserProgress>(initialProgress)

  const handleAnswer = (userAnswer:string) => {
    const isCorrect = userAnswer === currentQuestion.correctAnswer;
    
    const newAnswer = {
      questionId: currentQuestion.question_id,
      userAnswer: userAnswer,
      isCorrect,
    };

    setUserProgress((prevstate) => {
      const existingAnswerIndex = prevstate.answers.findIndex(
        (answer) => answer.questionId === currentQuestion.question_id
      );

      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...prevstate.answers];
        updatedAnswers[existingAnswerIndex] = newAnswer;
        return { 
          ...prevstate, 
          answers: updatedAnswers, 
          topic:currentQuestion.course_name, 
          score: isCorrect ? prevstate.score : prevstate.score};
      } else {
        return { 
          ...prevstate, 
          answers: [...prevstate.answers, newAnswer], 
          topic:currentQuestion.course_name, 
          score: isCorrect ? prevstate.score + 1 : prevstate.score };
      }
    });
  };

  const handleNext = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }};

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); 
    } else {
      handleQuit()
    }}; 

  const handleSubmit = () => {
    Alert.alert(
      "Confirm Submission?",
      `Have you answered all questions?`,
      [{text: "OK",
          onPress: () => {
            router.push({
              pathname: '/quiz/results',
              params: { score: userProgress.score, topic: userProgress.topic, answer: JSON.stringify(userProgress.answers), totalQuestions: quiz.length},
            });},},]);};

  const handleQuit = () => {
    Alert.alert(
      "Confirm Quit?",
      `Have you answered all questions?`,
      [{text: "OK",
          onPress: () => {
            router.push({
              pathname: '/quiz',
            });},},]);}

  const progress = (currentIndex / quiz.length) 
  
  return(
    <SafeAreaView>
      <View className='w-full h-full'>

        <View className='bg-[#91B0F2] w-full h-1/5 rounded-bl-[20px] rounded-br-[20px] items-center'>
          <Text className='font-bold text-[25px] mt-3'>{currentQuestion.course_name}</Text>
          <View className='w-[332px] mt-6'>
            <Text className='self-end text-[25px]'>{progress*100} %</Text>
            <Progress.Bar progress={progress} height={28} width={332} unfilledColor="#e2e8f0" borderWidth={1} color="#93E2FF" animationType='timing' borderColor='black' borderRadius={10}/>
          </View>
        </View> 

        {currentQuestion.questionType == 'Multiple Choice' 
        ? <MultipleResponseQuestion currentQuestion={currentQuestion} onPress={handleAnswer}/>
        : currentQuestion.questionType == 'Fill in the blank'
          ? <FillInTheBlankQuestion currentQuestion={currentQuestion} onPress={handleAnswer}/> 
          : <BinaryQuestion currentQuestion={currentQuestion} onPress={handleAnswer}/>
        }
        
        <View className='flex-row mt-5 justify-center'>
          <TouchableOpacity onPress={handleBack} className='w-[176px] h-[69px] flex-row rounded-l-[10px] bg-[#A8C4FF] items-center justify-center mr-3'>
            <Image className='w-[32px] h-[32px]' source={require('@/assets/icons/chevron-left.png')}/>
            <Text>{currentIndex == 0 ? 'Quit' : 'Back'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} className='w-[176px] h-[69px] flex-row rounded-r-[10px] bg-[#A8C4FF] items-center justify-center'>
            <Text>{currentIndex !== quiz.length - 1 ? 'Next' : 'Submit'}</Text>
            <Image className='w-[32px] h-[32px]' source={require('@/assets/icons/chevron-right.png')}/>
          </TouchableOpacity>
        </View>
 
      </View>
    </SafeAreaView>
  )
}

export default page1