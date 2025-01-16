import { quiz } from "@/courses/AcidBaseQuiz";
import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface userName {
  id?: number,
  name: string,
  email: string
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success" | "boolean" | "answer";
  type?: "continue" | "boolean" | "answer";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  placeholder: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
}

declare interface Course {
  course_id: number;
  course_name: string;
}

declare interface OngoingCourse extends Course {
  progress: string;
  updated_at: string;
  lessons_completed: number;
}

declare interface ExploreCourse extends Course {
  description: string;
  total_lessons: number;
  completionStatus: "uncompleted" | "completed" | "ongoing"
}

declare interface LessonCardProps {
  id: number,
  title: string,
  description: string,
  time: string,
  difficulty: number,
  lessonsCompleted: number,
  lastLesson?: boolean
  onPress: () => void
}

declare interface Quiz {
  quiz_id: number;
  course_name: string;
  quiz_name
}

declare interface ExploreQuizType extends Quiz {
  description: string;
  quizzes: number;
  completionStatus: "uncompleted" | "completed" | "ongoing"
}
declare interface SelectQuizType extends Quiz {
  course_id: number;
  questions: number
}

declare interface OngoingQuiz extends Quiz {
  progress: number;
  updated_at: string;
}

declare interface QuestionType extends Quiz {
  question_id: number,
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  questionType: "Multiple Choice" | "Binary" | "Fill in the blank";
}

declare interface UserProgress {
  score: number;
  topic: string;
  answers: {questionId:number, userAnswer:string | null, isCorrect:boolean}[];
}

declare interface QuizAnswer {
  questionId: number; 
  userAnswer: string;
  isCorrect: boolean
}

