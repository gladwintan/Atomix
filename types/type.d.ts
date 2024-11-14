import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textVariant?:
    | "primary"
    | "default"
    | "secondary"
    | "danger"
    | "success"
    | "answerSuccess"
    | "answer"
    | "back";
  type?:
    | "outline"
    | "continue"
    | "boolean"
    | "booleanSuccess"
    | "answer"
    | "answerSuccess"
    | "back";
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
  id?: number;
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
  completionStatus: "uncompleted" | "completed" | "ongoing";
}

declare interface Lesson {
  id: number;
  title: string;
  description: string;
  time: string;
  difficulty: number;
  lastLesson: boolean;
  link?: Href<string>;
}

declare interface LessonCardProps extends Lesson {
  lessonsCompleted: number;
  onPress: () => void;
}

declare interface BinaryQuestion {
  question: string;
  answer: boolean;
  nextPageUrl: Href<string>;
  imageSrc?: ImageSourcePropType;
}

declare interface FillInTheBlankQuestion {
  options: string[];
  questionWithBlanks: { text: string; index: number }[];
  answer: string[];
  nextPageUrl: Href<string>;
  imageSrc?: ImageSourcePropType;
}

declare interface MultipleResponseQuestion {
  options: { option: string; selected: boolean }[];
  question: string;
  answer: string[];
  nextPageUrl: Href<string>;
  imageSrc?: ImageSourcePropType;
}