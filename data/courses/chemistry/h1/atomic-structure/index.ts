import { Lesson } from "@/types/type";
import contents from "./content";

// id matches lesson id on database
const lessons: Lesson[] = [
  {
    id: 8,
    title: "Atomic Orbitals",
    description: "Identify and draw s, p, d orbitals",
    time: "5 mins",
    difficulty: 2,
    contents: contents.lesson1,
  },
];

export default lessons;
