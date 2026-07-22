// Stage-0 lesson manifest (titles) for the portal dashboard.
// Content lives in the repo curriculum; this is the structured index the portal renders.

export type Lesson = { id: string; title: string };
export type Unit = { id: string; num: number; title: string; lessons: Lesson[] };

const L = (u: number, n: number, title: string): Lesson => ({
  id: `s0-u${u}-l${String(n).padStart(2, "0")}`,
  title,
});

export const STAGE0: Unit[] = [
  { id: "u0", num: 0, title: "Welcome & Sounds", lessons: [
    L(0,1,"Welcome & how this works"), L(0,2,"The alphabet & letter sounds"),
    L(0,3,"Hard sounds: /p/–/b/, /v/–/f/"), L(0,4,"Survival phrases"), L(0,5,"Numbers 0–20") ] },
  { id: "u1", num: 1, title: "Introducing Yourself", lessons: [
    L(1,1,"Greetings & How are you?"), L(1,2,"Hello, I'm…"), L(1,3,"Where are you from?"),
    L(1,4,"What do you do?"), L(1,5,"Self-introduction task") ] },
  { id: "u2", num: 2, title: "Family & People", lessons: [
    L(2,1,"My family"), L(2,2,"This is my… (his/her)"), L(2,3,"have / has"),
    L(2,4,"Ages & numbers 20–100"), L(2,5,"Describe your family") ] },
  { id: "u3", num: 3, title: "My Things & Places", lessons: [
    L(3,1,"Objects & a/an"), L(3,2,"Plurals"), L(3,3,"There is / There are"),
    L(3,4,"Prepositions of place"), L(3,5,"Describe your room") ] },
  { id: "u4", num: 4, title: "Daily Routine", lessons: [
    L(4,1,"My day"), L(4,2,"He/she + verb-s"), L(4,3,"Telling the time"),
    L(4,4,"Frequency adverbs"), L(4,5,"Describe your typical day") ] },
  { id: "u5", num: 5, title: "Free Time & Ability", lessons: [
    L(5,1,"I like… (+ -ing)"), L(5,2,"Hobbies"), L(5,3,"Can you…?"),
    L(5,4,"Do you like…?"), L(5,5,"Talk about your free time") ] },
  { id: "u6", num: 6, title: "Food & Shopping", lessons: [
    L(6,1,"Food & drink"), L(6,2,"some / any"), L(6,3,"I'd like…"),
    L(6,4,"Prices"), L(6,5,"Café/shop role-play") ] },
  { id: "u7", num: 7, title: "Describing People & Things", lessons: [
    L(7,1,"Colours & adjectives"), L(7,2,"Adjective + noun"), L(7,3,"Appearance"),
    L(7,4,"have got"), L(7,5,"Describe a person") ] },
  { id: "u8", num: 8, title: "Places & Directions", lessons: [
    L(8,1,"Places in town"), L(8,2,"Is there a…?"), L(8,3,"Giving directions"),
    L(8,4,"Prepositions of movement"), L(8,5,"Directions task") ] },
  { id: "u9", num: 9, title: "Happening Now", lessons: [
    L(9,1,"I'm …-ing (present continuous)"), L(9,2,"What are they doing?"), L(9,3,"now vs usually"),
    L(9,4,"What are you wearing?"), L(9,5,"Narrate a scene") ] },
  { id: "u10", num: 10, title: "Putting It Together", lessons: [
    L(10,1,"Big review 1"), L(10,2,"Big review 2"), L(10,3,"Accent clinic"),
    L(10,4,"A1 mock conversation"), L(10,5,"Summative + graduation") ] },
];

export const ALL_LESSON_IDS: string[] = STAGE0.flatMap((u) => u.lessons.map((l) => l.id));
export const TOTAL_LESSONS = ALL_LESSON_IDS.length;

// Flat, ordered view of every lesson with its unit context + running index.
// Used for the lesson page (title, prev/next navigation).
export type FlatLesson = {
  id: string;
  title: string;
  unitNum: number;
  unitTitle: string;
  index: number; // 0-based position across all Stage-0 lessons
};

export const FLAT_LESSONS: FlatLesson[] = STAGE0.flatMap((u) =>
  u.lessons.map((l) => ({ id: l.id, title: l.title, unitNum: u.num, unitTitle: u.title, index: 0 })),
).map((l, i) => ({ ...l, index: i }));

export function getFlatLesson(id: string): FlatLesson | null {
  return FLAT_LESSONS.find((l) => l.id === id) ?? null;
}

export function getAdjacentLessons(id: string): { prev: FlatLesson | null; next: FlatLesson | null } {
  const i = FLAT_LESSONS.findIndex((l) => l.id === id);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? FLAT_LESSONS[i - 1] : null,
    next: i < FLAT_LESSONS.length - 1 ? FLAT_LESSONS[i + 1] : null,
  };
}
