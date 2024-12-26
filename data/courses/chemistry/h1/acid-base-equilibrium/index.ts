import { Lesson } from "@/types/type";
import contents from "./content";

// id matches lesson id on database
const lessons: Lesson[] = [
  {
    id: 9,
    title: "Acids and Bases",
    description: "Defining acids and bases",
    time: "5 mins",
    difficulty: 2,
    contents: contents.lesson1,
  },
];

export default lessons;
