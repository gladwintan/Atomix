import { FilterOption, SortOption } from "@/types/type";

export const filterOptions: FilterOption[] = [
  {
    label: "H1 Chemistry",
    value: { type: "level", option: "H1" },
  },
  {
    label: "H2 Chemistry",
    value: { type: "level", option: "H2" },
  },
  {
    label: "Beginner",
    value: { type: "difficulty", option: "Beginner" },
  },
  {
    label: "Intermediate",
    value: { type: "difficulty", option: "Intermediate" },
  },
  {
    label: "Advanced",
    value: { type: "difficulty", option: "Advanced" },
  },
];

export const sortOptions: SortOption[] = [
  { label: "Lessons", value: "Lessons", descending: true },
  { label: "Quizzes", value: "Quizzes", descending: true },
];
