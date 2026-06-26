export enum Difficulty {
  Beginner,
  Intermediate,
  Advanced,
}

export const difficultyLabel: Record<Difficulty, string> = {
  [Difficulty.Beginner]: "Beginner",
  [Difficulty.Intermediate]: "Intermediate",
  [Difficulty.Advanced]: "Advanced",
};

export interface Quiz {
  question: string;
  options: string[];
  answer: number;
}

export interface Resource {
  title: string;
  url: string;
  type: "mdn" | "youtube" | "article" | "docs" | "other";
}

export interface Lesson {
  id: string;
  code: string;
  number: number;
  section: string;
  title: string;
  subtitle: string;
  slug: string;
  image: string;
  difficulty: Difficulty;
  duration: string;
  tags: string[];
  prerequisites: string[];
  next?: string;
  previous?: string;
  completed?: boolean;
  estimatedReadingTime?: number;
  goal: string;
  explanation: string[];
  analogy?: {
    title: string;
    text: string;
  };
  codeExample?: string;
  result?: string;
  remember: string[];
  mistake?: {
    title: string;
    text: string;
  };
  quiz?: Quiz;
  resources?: Resource[];
  playground?: boolean;
}

export type Section = {
  id: string;
  name: string;
  label: string;
  enabled: boolean;
  lessons: Lesson[];
  lessonsRecord: Record<string, Lesson>;
};