import { Difficulty, type Lesson } from "@/types/lesson";
import image from "./image.png";

export const lesson: Lesson = {
  id: "JS-002",
  code: "JS-002",
  number: 2,
  section: "jsAtoms",
  title: "let vs const",
  subtitle: "Can the value change?",
  slug: "let-vs-const",
  image: image.src,
  difficulty: Difficulty.Beginner,
  duration: "3 min",
  tags: ["let", "const", "variables", "basics", "beginner"],
  prerequisites: ["JS-001"],
  previous: "JS-001",
  next: "JS-003",
  estimatedReadingTime: 3,
  goal: "Understand when to use let and when to use const.",
  explanation: [
    "JavaScript пропонує два сучасних способи створення змінних.",
    "const означає, що змінна завжди повинна посилатися на те саме значення.",
    "let означає, що значення можна змінювати пізніше.",
    "Якщо ти не плануєш нічого змінювати — використовуй const.",
    "Якщо значення буде змінюватися під час роботи програми — використовуй let.",
  ],
  analogy: {
    title: "Аналогія",
    text: "const — це коробка із замком. let — звичайна коробка, яку можна відкривати і міняти її вміст.",
  },
  codeExample: `let score = 10;

score = 20;

const age = 30;

// age = 31 ❌`,
  result: "TypeError: Assignment to constant variable.",
  remember: [
    "let можна змінювати.",
    "const не можна переприсвоювати.",
    "За замовчуванням використовуй const.",
  ],
  mistake: {
    title: "Типова помилка",
    text: "Багато хто думає, що const робить дані повністю незмінними. Насправді він лише забороняє переприсвоїти саму змінну.",
  },
  quiz: {
    question: "Яку змінну варто використовувати за замовчуванням?",
    options: ["const", "let", "var"],
    answer: 0,
  },
  resources: [
    {
      title: "MDN — let",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
      type: "mdn",
    },
    {
      title: "MDN — const",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const",
      type: "mdn",
    },
  ],
  playground: true,
};