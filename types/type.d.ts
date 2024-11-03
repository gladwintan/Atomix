import { TextInputProps, TouchableOpacityProps } from "react-native";

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