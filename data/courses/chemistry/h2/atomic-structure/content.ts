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
  },
  {
    type: "Binary Question",
    imageSrc: dOrbitals,
    question: "The above is correct",
    answer: true,
  },
];

const contents = {
  lesson1: lesson1,
};

export default contents;
