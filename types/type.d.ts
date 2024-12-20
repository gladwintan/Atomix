import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  textVariant?:
    | "primary"
    | "default"
    | "secondary"
    | "white"
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
    | "back"
    | "transparent"
    | "cancel"
    | "confirm";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  textClassName?: string;
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
  link?: Href;
}

declare interface LessonCardProps extends Lesson {
  lessonsCompleted: number;
  onPress: () => void;
}

declare interface BinaryQuestion {
  question: string;
  answer: boolean;
  onPressNextQuestion: () => void;
  imageSrc?: ImageSourcePropType;
}

declare interface FillInTheBlankQuestion {
  question: string;
  options: string[];
  questionWithBlanks: { text: string; index: number }[];
  answer: string[];
  onPressNextQuestion: () => void;
  imageSrc?: ImageSourcePropType;
}

declare interface MultipleResponseQuestion {
  options: { option: string; selected: boolean }[];
  question: string;
  answer: string[];
  onPressNextQuestion: () => void;
  imageSrc?: ImageSourcePropType;
}

declare interface Post {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  topic: string;
  like_count: string;
  reply_count: string;
  created_at: string;
  last_updated: string;
  author: string;
  user_is_author: boolean;
  user_liked_post: boolean;
  user_replied_post?: boolean;
  replies?: PostReply[];
}

declare interface PostReply {
  replyId: string;
  parentReplyId: string | null;
  postId: string;
  content: string;
  author: string;
  isAuthor: boolean;
  creationDate: string;
  lastUpdatedDate: string;
  likeCount: number;
  replyCount: number;
  userLiked: boolean;
  nestLevel: number;
}

declare interface ReplyDetails {
  parentReplyId: string | null;
  author: string;
}

declare interface FilterOption {
  label: string;
  value: { type: string; option: string };
}

declare interface SortOption {
  label: string;
  value: string;
  descending: boolean;
}
