import { Lesson } from "@/types/type";
import contents from "./content";

// id matches lesson id on database
const lessons: Lesson[] = [
  {
    id: 7,
    title: "IUPAC naming",
    description: "Name different organic compounds based on the convention",
    time: "5 mins",
    difficulty: 2,
    contents: contents.lesson1,
  },
];

export default lessons;
