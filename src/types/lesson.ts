export type Lesson = {
  id: string;
  code: string;
  number: number;
  title: string;
  subtitle: string;
  section: string;
  image: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  goal: string;
  explanation: string[];
  analogy: {
    title: string;
    text: string;
  };
  codeExample: string;
  result: string;
  remember: string[];
  mistake?: {
    title: string;
    text: string;
  };
  quiz?: {
    question: string;
    options: string[];
    answer: number;
  };
};

export type Section = {
  id: string;
  name: string;
  label: string;
  enabled: boolean;
  lessons: Lesson[];
};