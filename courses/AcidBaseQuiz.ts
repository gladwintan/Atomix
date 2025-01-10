import { QuestionType } from '@/types/type';

export const quiz: QuestionType[] = [
  {
  "quiz_id": 1,
  "question_id": 1,
  "course_name": "Acid-Base Equilibrium",
  "question": "Determine the pH of a 0.25 M solution of acetic acid (CH₃COOH), given that the acid dissociation constant (Ka) for acetic acid is 1.8 × 10⁻⁵.",
  "options": ["2.87", "3.47", "4.74", "5.12"],
  "correctAnswer": "3.47",
  "explanation": "Using the Ka expression for acetic acid, we calculate the pH as approximately 3.47.",
  "questionType": "Multiple Choice"
  },
  {
    "quiz_id": 1,
    "question_id": 2,
    "course_name": "Acid-Base Equilibrium",
    "question": "For the weak base ammonia (NH₃), the base dissociation constant (Kb) is 1.8 × 10⁻⁵. What is the pH of a 0.1 M solution of ammonia?",
    "options": ["9.23", "11.13", "10.34", "12.01"],
    "correctAnswer": "11.13",
    "explanation": "Using the Kb expression for ammonia, we calculate the pH as approximately 11.13.",
    "questionType": "Multiple Choice"
  },
  {
    "quiz_id": 1,
    "question_id": 3,
    "course_name": "Acid-Base Equilibrium",
    "question": "In an acidic solution, the concentration of hydrogen ions [H⁺] is greater than the concentration of hydroxide ions [OH⁻].",
    "options": ["True", "False"],
    "correctAnswer": "True",
    "explanation": "In an acidic solution, the concentration of hydrogen ions [H⁺] is indeed greater than the concentration of hydroxide ions [OH⁻]. This is the defining characteristic of an acidic solution, where the pH is less than 7.",
    "questionType": "Binary"
  },
  {
    "quiz_id": 1,
    "question_id": 4,
    "course_name": "Acid-Base Equilibrium",
    "question": "The pH of a solution is calculated using the formula pH = -log[_________].",
    "options": [],
    "correctAnswer": "H⁺",
    "explanation": "The pH of a solution is calculated using the concentration of hydrogen ions [H⁺]. The formula pH = -log[H⁺] is used to determine the acidity or alkalinity of the solution.",
    "questionType": "Fill in the blank"
  },
  {
    "quiz_id": 1,
    "question_id": 5,
    "course_name": "Acid-Base Equilibrium",
    "question": "Acid strength increases as the bond strength of the acid's hydrogen atom decreases.",
    "options": ["True", "False"],
    "correctAnswer": "True",
    "explanation": "The weaker the bond between the hydrogen atom and the rest of the molecule, the easier it is for the acid to lose the proton (H⁺), making the acid stronger. For example, in hydrohalic acids (e.g., HF, HCl), the strength of the acid increases as the bond strength between the hydrogen and halogen decreases.",
    "questionType": "Binary"
  }
  
];
