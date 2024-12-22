import {
  ImageSourcePropType,
  TextInputProps,
  TouchableOpacityProps,
} from "react-native";

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
  course_id: number;
  course_name: string;
}

declare interface OngoingCourse extends Course {
  progress: string;
  updated_at: string;
  lessons_completed: number;
  quizzes_completed: number;
}

declare interface ExploreCourse extends Course {
  description: string;
  difficulty: string;
  lessons: number;
  quizzes: number;
  level: string;
  subject: string;
  completionStatus: "uncompleted" | "completed" | "ongoing";
}

declare interface Lesson {
  id: number;
  title: string;
  description: string;
  time: string;
  difficulty: number;
  contents?: Content[];
  status?: "uncompleted" | "ongoing" | "completed";
  progress?: number;
  lastCompletedAt?: string | null;
}

declare interface LessonCardProps extends Lesson {
  lessonsCompleted: number;
  lastLesson: boolean;
  onPress: () => void;
}

declare interface Question {
  question: string;
  imageSrc?: ImageSourcePropType;
}
declare interface BinaryQuestion extends Question {
  answer: boolean;
}

declare interface FillInTheBlankQuestion extends Question {
  options: string[];
  questionWithBlanks: { text: string; index: number }[];
  answer: string[];
}

declare interface MultipleResponseQuestion extends Question {
  options: { option: string; selected: boolean }[];
  answer: string[];
}

declare interface Notes {
  title: string;
  description: string;
  imageSrc?: ImageSourcePropType;
}

declare type Content = (
  | BinaryQuestion
  | FillInTheBlankQuestion
  | MultipleResponseQuestion
  | Notes
) & { type: string };

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
