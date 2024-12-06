import { QuizType } from '@/types/type';

export const quiz: QuizType[] = [
  {
  "id": 1,
  "quiz_topic": "Acid-Base Equilibrium",
  "text": "Determine the pH of a 0.25 M solution of acetic acid (CH₃COOH), given that the acid dissociation constant (Ka) for acetic acid is 1.8 × 10⁻⁵.",
  "options": ["2.87", "3.47", "4.74", "5.12"],
  "correctAnswer": "3.47",
  "explanation": "Using the Ka expression for acetic acid, we calculate the pH as approximately 3.47.",
  "questionType": "Multiple Choice"
  },
  {
    "id": 2,
    "quiz_topic": "Acid-Base Equilibrium",
    "text": "For the weak base ammonia (NH₃), the base dissociation constant (Kb) is 1.8 × 10⁻⁵. What is the pH of a 0.1 M solution of ammonia?",
    "options": ["9.23", "11.13", "10.34", "12.01"],
    "correctAnswer": "11.13",
    "explanation": "Using the Kb expression for ammonia, we calculate the pH as approximately 11.13.",
    "questionType": "Multiple Choice"
  } 
];
