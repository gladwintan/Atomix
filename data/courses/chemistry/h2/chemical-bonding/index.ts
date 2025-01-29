import { Lesson } from "@/types/type";
import contents from "./content";

// id matches lesson id on database
const lessons: Lesson[] = [
  {
    id: 6,
    title: "VSEPR theory",
    description: "Determine shapes and angles of molecules",
    time: "5 mins",
    difficulty: 3,
    contents: contents.lesson1,
  },
];

export default lessons;
