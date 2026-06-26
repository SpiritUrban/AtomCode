import type { Lesson } from "@/types/lesson";

export const jsAtomsLessons: Lesson[] = [
  {
    id: "variables",
    code: "JS-001",
    number: 1,
    title: "Variables",
    subtitle: "Boxes for your data",
    section: "jsAtoms",
    image: "/images/js-atoms/js-001-variables.png",
    difficulty: "Beginner",
    duration: "2 min",
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
  },
  {
    id: "let-vs-const",
    code: "JS-002",
    number: 2,
    title: "let vs const",
    subtitle: "Can the value change?",
    section: "jsAtoms",
    image: "/images/js-atoms/js-002-let-vs-const.png",
    difficulty: "Beginner",
    duration: "3 min",
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
  },
  {
    id: "primitive-types",
    code: "JS-003",
    number: 3,
    title: "Primitive Types",
    subtitle: "The basic building blocks",
    section: "jsAtoms",
    image: "/images/js-atoms/js-003-primitive-types.png",
    difficulty: "Beginner",
    duration: "3 min",
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
  },
];