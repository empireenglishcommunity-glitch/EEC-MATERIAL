// Stage-0 per-unit formative quizzes.
// Source of truth: curriculum/07-assessment-item-banks.md §3 (✅ = correct answer).
// Low-stakes: feedback + spaced review, not gatekeeping. Auto-graded server-side.

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number; // 0-based index of the correct option
};

export type UnitQuiz = {
  unit: string; // "u0".."u10"
  num: number;
  title: string;
  questions: QuizQuestion[];
};

const q = (id: string, prompt: string, options: string[], answer: number): QuizQuestion => ({
  id,
  prompt,
  options,
  answer,
});

export const QUIZZES: Record<string, UnitQuiz> = {
  u0: {
    unit: "u0",
    num: 0,
    title: "Welcome & Sounds",
    questions: [
      q("u0q1", "Which word has the /p/ sound?", ["big", "pen", "van"], 1),
      q("u0q2", '"Can you repeat, please?" is used to…', [
        "ask someone to say it again",
        "say goodbye",
        "say thanks",
      ], 0),
      q("u0q3", 'The number after "twelve" is…', ["thirteen", "thirty", "twenty"], 0),
      q("u0q4", "Which word has the /v/ sound?", ["fan", "very", "ban"], 1),
    ],
  },
  u1: {
    unit: "u1",
    num: 1,
    title: "Introducing Yourself",
    questions: [
      q("u1q1", "___ your name?", ["What's", "Where", "Who"], 0),
      q("u1q2", "I'm ___ engineer.", ["a", "an", "the"], 1),
      q("u1q3", '"Where are you from?" → "I\'m ___ Cairo."', ["in", "from", "at"], 1),
      q("u1q4", "This is Sara. ___ is a doctor.", ["He", "She", "It"], 1),
    ],
  },
  u2: {
    unit: "u2",
    num: 2,
    title: "Family & People",
    questions: [
      q("u2q1", "This is my brother. ___ name is Ali.", ["Her", "His", "Your"], 1),
      q("u2q2", "I ___ two sisters.", ["have", "has", "am"], 0),
      q("u2q3", "She ___ a big family.", ["have", "has", "is"], 1),
      q("u2q4", '"How old are you?" → "I\'m twenty-five ___ old."', ["year", "years", "age"], 1),
    ],
  },
  u3: {
    unit: "u3",
    num: 3,
    title: "My Things & Places",
    questions: [
      q("u3q1", "There ___ three chairs.", ["is", "are", "am"], 1),
      q("u3q2", "The keys are ___ the table.", ["on", "in", "under"], 0),
      q("u3q3", 'Plural of "watch":', ["watchs", "watches", "watch"], 1),
      q("u3q4", "It's ___ apple.", ["a", "an", "the"], 1),
    ],
  },
  u4: {
    unit: "u4",
    num: 4,
    title: "Daily Routine",
    questions: [
      q("u4q1", "She ___ up at 7.", ["get", "gets", "getting"], 1),
      q("u4q2", "What time ___ you start work?", ["do", "does", "are"], 0),
      q("u4q3", "I ___ drink coffee (100% of the time).", ["never", "always", "sometimes"], 1),
      q("u4q4", "It's 7:30 = half past ___.", ["six", "seven", "eight"], 1),
    ],
  },
  u5: {
    unit: "u5",
    num: 5,
    title: "Free Time & Ability",
    questions: [
      q("u5q1", "I like ___.", ["swimming", "swim", "to swimming"], 0),
      q("u5q2", "She ___ drive.", ["can", "cans", "is can"], 0),
      q("u5q3", "___ you like football?", ["Do", "Are", "Does"], 0),
      q("u5q4", "I ___ play the guitar (not able).", ["don't", "can't", "not"], 1),
    ],
  },
  u6: {
    unit: "u6",
    num: 6,
    title: "Food & Shopping",
    questions: [
      q("u6q1", "I'd ___ a tea, please.", ["like", "want", "liking"], 0),
      q("u6q2", "There isn't ___ sugar.", ["some", "any", "a"], 1),
      q("u6q3", "___ is it? (price)", ["How much", "How many", "What time"], 0),
      q("u6q4", "Can I ___ the menu, please?", ["have", "has", "having"], 0),
    ],
  },
  u7: {
    unit: "u7",
    num: 7,
    title: "Describing People & Things",
    questions: [
      q("u7q1", "Choose the correct word order:", [
        "a big red car",
        "a car big red",
        "a red car big",
      ], 0),
      q("u7q2", "She ___ got long hair.", ["has", "have", "is"], 0),
      q("u7q3", "It's ___ (colour of the sky).", ["blue", "blue color", "a blue"], 0),
      q("u7q4", "He is ___ (not short).", ["tall", "taller", "tallest"], 0),
    ],
  },
  u8: {
    unit: "u8",
    num: 8,
    title: "Places & Directions",
    questions: [
      q("u8q1", "___ a bank near here?", ["Is there", "There is", "Are there"], 0),
      q("u8q2", "Turn ___. (opposite of right)", ["left", "straight", "up"], 0),
      q("u8q3", "Go ___ the street.", ["along", "in", "at"], 0),
      q("u8q4", "The pharmacy is ___ to the bank.", ["next", "on", "under"], 0),
    ],
  },
  u9: {
    unit: "u9",
    num: 9,
    title: "Happening Now",
    questions: [
      q("u9q1", "Right now, I ___ studying.", ["am", "is", "are"], 0),
      q("u9q2", '"-ing" form of "run":', ["runing", "running", "runn"], 1),
      q("u9q3", "She ___ TV now.", ["watch", "is watching", "watches"], 1),
      q("u9q4", "I ___ usually work on Friday, but today I ___ working.", [
        "don't / am",
        "am / don't",
        "not / am",
      ], 0),
    ],
  },
  u10: {
    unit: "u10",
    num: 10,
    title: "Putting It Together",
    questions: [
      q("u10q1", "I'm from Egypt and I ___ a student.", ["am", "is", "are"], 0),
      q("u10q2", "He ___ up at 6 and ___ to work.", [
        "gets / goes",
        "get / go",
        "getting / going",
      ], 0),
      q("u10q3", "There ___ a bed and two windows in my room.", ["is", "are", "am"], 0),
      q("u10q4", "I like ___ and I can ___.", [
        "cooking / swim",
        "cook / swimming",
        "to cook / swimming",
      ], 0),
    ],
  },
};

export function getQuiz(unitKey: string): UnitQuiz | null {
  return QUIZZES[unitKey] ?? null;
}
