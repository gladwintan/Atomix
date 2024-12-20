import { FilterOption, SortOption } from "@/types/type";

export const filterOptions: FilterOption[] = [
  {
    label: "H1 Chemistry",
    value: { type: "difficulty", option: "H1 Chemistry" },
  },
  {
    label: "H2 Chemistry",
    value: { type: "difficulty", option: "H2 Chemistry" },
  },
  {
    label: "Atomic Structure",
    value: { type: "topic", option: "Atomic Structure" },
  },
  {
    label: "Chemical Bonding",
    value: { type: "topic", option: "Chemical Bonding" },
  },
  {
    label: "Acid-Base Equilibrium",
    value: { type: "topic", option: "Acid-Base Equilibrium" },
  },
  {
    label: "Intro to Organic Chem",
    value: { type: "topic", option: "Intro to Organic Chem" },
  },
];

export const sortOptions: SortOption[] = [
  { label: "Newest", value: "Newest", descending: true },
  { label: "Likes", value: "Likes", descending: true },
  { label: "Replies", value: "Replies", descending: true },
];
