import dOrbitals from "@/assets/images/atomic-structure/d-orbitals.png";
import {
  Lesson,
} from "@/types/type";

export const info = {
  courseName: "Atomic Structure",
  courseDescription: "Learn about atomic orbitals and ionisation energy",
};

export const images = {
  dOrbitals,
};

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Atomic Orbitals",
    description: "Identify and draw s, p, d orbitals",
    link: "/courses/atomic-structure/lesson-1",
    time: "5 mins",
    difficulty: 2,
    lastLesson: false,
  },
  {
    id: 2,
    title: "I.E. and Atomic radius",
    description: "Ionisation energy",
    link: "/courses/atomic-structure/lesson-2",
    time: "10 mins",
    difficulty: 2,
    lastLesson: false,
  },
  {
    id: 3,
    title: "I.E. trends",
    description: "Variations in I.E. across period and down group",
    link: "/courses/atomic-structure/lesson-3",
    time: "9 mins",
    difficulty: 3,
    lastLesson: false,
  },
  {
    id: 4,
    title: "Anomalies of I.E. trend",
    description: "Exceptions to the I.E. trend",
    link: "/courses/atomic-structure/lesson-4",
    time: "6 mins",
    difficulty: 2,
    lastLesson: true,
  },
];
