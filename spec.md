# Специфікація проєкту AtomCode

## 1. Суть проєкту

AtomCode — це візуальна освітня платформа для атомарного вивчення програмування.

Ідея: одна маленька тема = один атом знання = один екран.

Проєкт стартує з розділу JSAtoms, але архітектуру потрібно одразу закласти під майбутні розділи:

* JSAtoms
* CSSAtoms
* HTMLAtoms
* GitAtoms
* ReactAtoms
* TSAtoms
* NodeAtoms
* LinuxAtoms

## 2. Технології

Проєкт робити на Next.js.

Сайт буде розміщуватися на GitHub Pages, тому потрібно закласти статичний деплой.

В Next.js використовувати static export:

```js
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

GitHub Pages приймає статичні файли або деплой через GitHub Actions. Next.js у режимі `output: "export"` генерує статичний сайт під час `next build`.

## 3. Загальна структура сайту

Головний layout:

```txt
┌──────────────────────────────────────────────┐
│ Top Navbar                                   │
├───────────────┬──────────────────────────────┤
│ Left Aside    │ Main Lesson Screen            │
│ Lesson list   │                              │
│               │  ┌────────────┬────────────┐ │
│               │  │ Image      │ Text       │ │
│               │  │            │ Explanation│ │
│               │  └────────────┴────────────┘ │
└───────────────┴──────────────────────────────┘
```

## 4. Top Navbar

Навбар зверху на всю ширину.

У ньому мають бути пункти:

* AtomCode
* JSAtoms
* CSSAtoms
* HTMLAtoms
* GitAtoms
* ReactAtoms
* About

Поки активним буде тільки JSAtoms. Інші розділи можна зробити як disabled або як заготовки.

## 5. Left Aside

Зліва має бути вертикальне меню, притиснуте до лівого краю.

У ньому список уроків активного розділу.

Для JSAtoms на старті:

* JS-001 Variables
* JS-002 let vs const
* JS-003 Primitive Types

При кліку на урок у головному вікні має відображатися відповідний lesson screen.

Активний урок має бути візуально підсвічений.

## 6. Main Lesson Screen

На екрані одночасно показується один урок.

Структура уроку:

```txt
┌──────────────────────────────────────────────┐
│ Lesson Screen                                │
│                                              │
│ ┌────────────────────┬─────────────────────┐ │
│ │ Comic Image         │ Explanation Panel   │ │
│ │                     │                     │ │
│ │                     │ Title               │ │
│ │                     │ Goal                │ │
│ │                     │ Explanation         │ │
│ │                     │ Analogy             │ │
│ │                     │ Code                │ │
│ │                     │ Remember            │ │
│ │                     │ Buttons             │ │
│ └────────────────────┴─────────────────────┘ │
└──────────────────────────────────────────────┘
```

Зліва — картинка уроку.

Справа — пояснювальний текст.

## 7. Поведінка скролу

Сайт має працювати як вертикальна презентація.

Колесо миші перемикає уроки:

* scroll down → наступний урок
* scroll up → попередній урок

Один урок займає весь доступний екран під navbar.

Потрібно зробити debounce/throttle, щоб один рух колеса не проскролював одразу кілька уроків.

Клік по aside також має міняти активний урок.

## 8. Структура даних уроку

Уроки мають зберігатися як дані, а не бути захардкожені в компонентах.

Приклад структури:

```ts
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
```

## 9. Перші 3 уроки

Створити файл:

```txt
src/data/jsAtoms.ts
```

У ньому мають бути перші три уроки:

* JS-001 Variables
* JS-002 let vs const
* JS-003 Primitive Types

Картинки покласти в:

```txt
public/images/js-atoms/
```

Назви файлів:

```txt
js-001-variables.png
js-002-let-vs-const.png
js-003-primitive-types.png
```

## 10. Компоненти

Бажана структура:

```txt
src/
  app/
    page.tsx
    layout.tsx
    globals.css

  components/
    TopNavbar.tsx
    Sidebar.tsx
    LessonViewer.tsx
    LessonImage.tsx
    LessonContent.tsx
    CodeBlock.tsx
    QuizBlock.tsx
    LessonControls.tsx

  data/
    sections.ts
    jsAtoms.ts

  types/
    lesson.ts
```

## 11. Кнопки в уроці

У правій панелі додати кнопки:

* Previous
* Next
* Mark as learned
* Copy code

Поки прогрес можна зберігати в localStorage.

## 12. Візуальний стиль

Стиль має відповідати ідеї comic infographic education.

Візуальний напрям:

* темний або напівтемний фон
* яскраві акценти
* карточний інтерфейс
* великі заголовки
* легка гейміфікація
* код у красивому темному блоці
* активний урок у sidebar підсвічений

Бренд:

```txt
AtomCode
Learn programming one atom at a time.
```

## 13. Головна ідея UX

Користувач не читає довгу статтю.

Він проходить атом за атомом.

Один екран — одна думка.

Картинка дає образ.

Текст пояснює.

Код показує приклад.

Quiz перевіряє розуміння.

## 14. Важливо

Не робити систему тільки під JavaScript.

JSAtoms — це перший розділ.

Архітектура має дозволяти легко додати:

```ts
cssAtoms.ts
htmlAtoms.ts
gitAtoms.ts
reactAtoms.ts
```

і підключити їх у загальну карту розділів.

## 15. Очікуваний результат першої версії

Потрібно отримати працюючий сайт на Next.js:

* відкривається на GitHub Pages
* є navbar
* є sidebar
* є 3 уроки
* уроки перемикаються кліком
* уроки перемикаються колесом миші
* зліва показується картинка
* справа показується пояснення
* є кнопки Previous / Next / Mark as learned / Copy code
* структура даних готова для масштабування курсу
