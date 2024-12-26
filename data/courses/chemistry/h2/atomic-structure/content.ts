import { Content } from "@/types/type";
import dOrbitals from "@/assets/images/atomic-structure/d-orbitals.png";

const lesson1: Content[] = [
  {
    type: "Notes",
    title: "Notes",
    description: "Atomic orbital notes",
    imageSrc: dOrbitals,
  },
  {
    type: "Binary Question",
    imageSrc: dOrbitals,
    question: "The above is correct",
    answer: true,
    incorrectAnswerMessage: "Hint: check the orbitals",
    correctAnswerMessage: "Those are all the d orbitals",
  },
  {
    type: "Fill In The Blank Question",
    question: "Complete the following about the trend of atomic orbitals",
    questionWithBlanks: [
      { text: "Down the", index: 0 },
      { text: ",", index: -1 },
      { text: "size of atomic orbital", index: 1 },
      { text: ".", index: -1 },
      { text: "Across the", index: 2 },
      { text: ",", index: -1 },
      { text: "size of atomic orbital", index: 3 },
      { text: ".", index: -1 },
    ],
    options: ["group", "period", "decreases", "increases"],
    answer: ["group", "increases", "period", "decreases"],
    incorrectAnswerMessage: "Think about the IE",
    correctAnswerMessage: "Remember this trend",
  },
  {
    type: "Multiple Response Question",
    question: "Which orbitals are shown above?",
    options: [
      { option: "s", selected: false },
      { option: "p", selected: false },
      { option: "d", selected: false },
      { option: "f", selected: false },
    ],
    answer: ["s"],
    incorrectAnswerMessage: "Recall the shapes of all the orbitals",
    correctAnswerMessage: "s is spherical and p is dumbbell shaped",
  },
  {
    type: "Binary Question",
    imageSrc: dOrbitals,
    question: "The above is correct",
    answer: true,
    incorrectAnswerMessage: "Hint: check the orbitals",
    correctAnswerMessage: "Those are all the d orbitals",
  },
];

const lesson2: Content[] = [
  {
    type: "Notes",
    title: "Notes",
    description: "Atomic orbital notes",
    imageSrc: dOrbitals,
  },
  {
    type: "Binary Question",
    imageSrc: dOrbitals,
    question: "The above is correct",
    answer: true,
    incorrectAnswerMessage: "Hint: check the orbitals",
    correctAnswerMessage: "Those are all the d orbitals",
  },
];

const lesson3: Content[] = [
  {
    type: "Notes",
    title: "Notes",
    description: "Atomic orbital notes",
    imageSrc: dOrbitals,
  },
  {
    type: "Binary Question",
    imageSrc: dOrbitals,
    question: "The above is correct",
    answer: true,
    incorrectAnswerMessage: "Hint: check the orbitals",
    correctAnswerMessage: "Those are all the d orbitals",
  },
];

const lesson4: Content[] = [
  {
    type: "Notes",
    title: "Notes",
    description: "Atomic orbital notes",
    imageSrc: dOrbitals,
  },
  {
    type: "Binary Question",
    imageSrc: dOrbitals,
    question: "The above is correct",
    answer: true,
    incorrectAnswerMessage: "Hint: check the orbitals",
    correctAnswerMessage: "Those are all the d orbitals",
  },
];

const contents = {
  lesson1: lesson1,
  lesson2: lesson2,
  lesson3: lesson3,
  lesson4: lesson4,
};

export default contents;
