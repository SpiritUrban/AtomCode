import { Difficulty, type Lesson } from "@/types/lesson";
import image from "./image.png";

export const lesson: Lesson = {
  id: "JS-001",
  code: "JS-001",
  number: 1,
  section: "jsAtoms",
  title: "Variables",
  subtitle: "Boxes for your data",
  slug: "variables",
  image: image.src,
  difficulty: Difficulty.Beginner,
  duration: "2 min",
  tags: ["variables", "memory", "basics", "beginner"],
  prerequisites: [],
  next: "JS-002",
  estimatedReadingTime: 2,
  goal: "Learn what a variable is and why programmers use it.",
  explanation: [
    "Уяви звичайну коробку. Ти можеш покласти всередину будь-яку річ, а потім дістати її пізніше.",
    "У JavaScript роль такої коробки виконує змінна (variable).",
    "Змінна має ім'я. Через це ім'я програма знає, де лежить потрібне значення.",
    "Одного разу записавши значення, ти можеш використовувати його скільки завгодно разів.",
    "Це дозволяє програмам запам'ятовувати інформацію між різними командами.",
  ],
  analogy: {
    title: "Аналогія",
    text: "Змінна схожа на підписану коробку. На коробці написано 'name', а всередині лежить 'Vitalii'.",
  },
  codeExample: `let name = "Vitalii";

console.log(name);`,
  result: "Vitalii",
  remember: [
    "Змінна зберігає дані.",
    "Кожна змінна має ім'я.",
    "Через ім'я можна отримати значення.",
  ],
  mistake: {
    title: "Типова помилка",
    text: "Новачки часто думають, що змінна — це саме значення. Насправді це місце, де значення зберігається.",
  },
  quiz: {
    question: "Що зберігає змінна?",
    options: ["Дані", "Функції браузера", "CSS"],
    answer: 0,
  },
  resources: [
    {
      title: "MDN — JavaScript Variables",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations",
      type: "mdn",
    },
  ],
  playground: true,
};