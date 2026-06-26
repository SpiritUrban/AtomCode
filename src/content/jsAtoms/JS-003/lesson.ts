import { Difficulty, type Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "JS-003",
  code: "JS-003",
  number: 3,
  section: "jsAtoms",
  title: "Primitive Types",
  subtitle: "The basic building blocks",
  slug: "primitive-types",
  image: "/images/js-atoms/JS-003/image.png",
  difficulty: Difficulty.Beginner,
  duration: "3 min",
  tags: ["types", "primitives", "string", "number", "boolean", "basics", "beginner"],
  prerequisites: ["JS-001", "JS-002"],
  previous: "JS-002",
  estimatedReadingTime: 3,
  goal: "Learn the basic data types in JavaScript.",
  explanation: [
    "Будь-яка інформація у JavaScript має свій тип.",
    "Числа використовуються для математичних обчислень.",
    "Рядки (strings) зберігають текст.",
    "Boolean має лише два значення: true або false.",
    "null означає навмисно порожнє значення.",
    "undefined означає, що значення ще не встановлено.",
  ],
  analogy: {
    title: "Аналогія",
    text: "Типи даних схожі на різні види LEGO-цеглинок. Вони різні за формою, але саме з них будується вся програма.",
  },
  codeExample: `let age = 42;

let name = "Vitalii";

let isAdmin = true;

let empty = null;

let future;`,
  result: `42
"Vitalii"
true
null
undefined`,
  remember: [
    "Number — числа.",
    "String — текст.",
    "Boolean — true / false.",
    "null — порожньо навмисно.",
    "undefined — значення ще немає.",
  ],
  mistake: {
    title: "Типова помилка",
    text: "Новачки часто плутають null і undefined. Це різні значення з різним призначенням.",
  },
  quiz: {
    question: "Який тип використовується для тексту?",
    options: ["String", "Boolean", "Number"],
    answer: 0,
  },
  resources: [
    {
      title: "MDN — Data types",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures",
      type: "mdn",
    },
  ],
  playground: true,
};