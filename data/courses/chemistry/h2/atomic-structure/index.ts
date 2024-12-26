import { Lesson } from "@/types/type";
import contents from "./content";

// id matches lesson id on database
const lessons: Lesson[] = [
  {
    id: 1,
    title: "Atomic Orbitals",
    description: "Identify and draw s, p, d orbitals",
    time: "5 mins",
    difficulty: 2,
    contents: contents.lesson1,
  },
  {
    id: 2,
    title: "I.E. and Atomic radius",
    description: "Ionisation energy",
    time: "10 mins",
    difficulty: 2,
    contents: contents.lesson2,
  },
  {
    id: 3,
    title: "I.E. trends",
    description: "Variations in I.E. across period and down group",
    time: "9 mins",
    difficulty: 3,
    contents: contents.lesson3,
  },
  {
    id: 4,
    title: "Anomalies of I.E. trend",
    description: "Exceptions to the I.E. trend",
    time: "6 mins",
    difficulty: 2,
    contents: contents.lesson3,
  },
];

export default lessons;
