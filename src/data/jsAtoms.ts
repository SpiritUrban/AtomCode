import type { Lesson } from "@/types/lesson";

export const jsAtomsLessons: Lesson[] = [
  {
    id: "js-001",
    code: "JS-001",
    number: 1,
    title: "Variables",
    subtitle: "Storing data in named containers",
    section: "jsAtoms",
    image: "/images/js-atoms/js-001-variables.svg",
    difficulty: "Beginner",
    duration: "3 min",
    goal: "Understand what a variable is and how to declare one in JavaScript.",
    explanation: [
      "A variable is a named container that holds a value.",
      "You create a variable with let or const, then assign data to it.",
      "Once stored, you can read or update the value using the variable name.",
    ],
    analogy: {
      title: "Labeled box",
      text: "Think of a variable like a labeled box in a warehouse. The label is the name, the contents are the value. You can open the box and change what's inside (with let).",
    },
    codeExample: `let username = "Alex";
let score = 42;

console.log(username); // "Alex"
console.log(score);    // 42`,
    result: 'username holds "Alex", score holds 42',
    remember: [
      "Variables store values under a name",
      "Use let when the value may change later",
      "Variable names should describe what they hold",
    ],
    mistake: {
      title: "Using a variable before declaring it",
      text: "Always declare a variable before you use it. JavaScript will throw a ReferenceError if you skip this step.",
    },
    quiz: {
      question: "What keyword creates a variable that can be reassigned?",
      options: ["const", "let", "var only", "fixed"],
      answer: 1,
    },
  },
  {
    id: "js-002",
    code: "JS-002",
    number: 2,
    title: "let vs const",
    subtitle: "Choosing the right declaration keyword",
    section: "jsAtoms",
    image: "/images/js-atoms/js-002-let-vs-const.svg",
    difficulty: "Beginner",
    duration: "4 min",
    goal: "Know when to use let versus const and why it matters.",
    explanation: [
      "let declares a variable you can reassign later.",
      "const declares a variable that cannot be reassigned after initialization.",
      "Default to const. Switch to let only when you need to change the binding.",
    ],
    analogy: {
      title: "Sticky note vs engraved plaque",
      text: "let is like a sticky note — you can peel it off and write a new value. const is like an engraved plaque — once set, the label stays fixed (though the object inside may still change).",
    },
    codeExample: `let mood = "happy";
mood = "excited"; // OK with let

const PI = 3.14159;
// PI = 3.14; // Error! Cannot reassign const

const colors = ["red", "blue"];
colors.push("green"); // OK — mutating the array, not reassigning`,
    result: "let can be reassigned; const cannot be reassigned",
    remember: [
      "Prefer const by default",
      "Use let when the variable will be reassigned",
      "const prevents rebinding, not mutation of objects/arrays",
    ],
    quiz: {
      question: "Which line will cause an error?",
      options: [
        'const x = 1; x = 2;',
        'let x = 1; x = 2;',
        'const arr = []; arr.push(1);',
        'let name = "A"; name = "B";',
      ],
      answer: 0,
    },
  },
  {
    id: "js-003",
    code: "JS-003",
    number: 3,
    title: "Primitive Types",
    subtitle: "The building blocks of JavaScript values",
    section: "jsAtoms",
    image: "/images/js-atoms/js-003-primitive-types.svg",
    difficulty: "Beginner",
    duration: "5 min",
    goal: "Identify the seven primitive types and recognize them in code.",
    explanation: [
      "Primitives are the simplest values in JavaScript — they are not objects.",
      "The seven primitives are: string, number, boolean, null, undefined, symbol, and bigint.",
      "typeof helps you inspect what type a value is at runtime.",
    ],
    analogy: {
      title: "Periodic table of values",
      text: "Primitives are like chemical elements — basic units that combine to build more complex structures. Strings are words, numbers are quantities, booleans are yes/no switches.",
    },
    codeExample: `typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (historical quirk!)
typeof 10n        // "bigint"
typeof Symbol()   // "symbol"`,
    result: "Each primitive has a distinct typeof result (except null)",
    remember: [
      "7 primitive types: string, number, boolean, null, undefined, symbol, bigint",
      "typeof null returns \"object\" — a famous JavaScript quirk",
      "Primitives are immutable — you cannot change them in place",
    ],
    mistake: {
      title: "Confusing null and undefined",
      text: "undefined means a variable was declared but not assigned. null is an intentional absence of value. They are not interchangeable.",
    },
    quiz: {
      question: "What does typeof null return?",
      options: ["null", "undefined", "object", "boolean"],
      answer: 2,
    },
  },
];