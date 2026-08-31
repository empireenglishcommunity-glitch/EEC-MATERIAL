// Multi-stage lesson manifest for portal navigation and validation.
// Lesson content remains generated from materials/; this file is the structured index.

export type StageId = "s0" | "s1";
export type Lesson = { id: string; title: string };
export type Unit = { id: string; num: number; title: string; lessons: Lesson[] };
export type Stage = {
  id: StageId;
  num: number;
  title: string;
  rank: string;
  cefr: string;
  entry: string;
  units: Unit[];
};

const L = (stage: StageId, unit: number, lesson: number, title: string): Lesson => ({
  id: `${stage}-u${unit}-l${String(lesson).padStart(2, "0")}`,
  title,
});

export const STAGE0: Unit[] = [
  { id: "u0", num: 0, title: "Welcome & Sounds", lessons: [
    L("s0",0,1,"Welcome & how this works"), L("s0",0,2,"The alphabet & letter sounds"),
    L("s0",0,3,"Hard sounds: /p/–/b/, /v/–/f/"), L("s0",0,4,"Survival phrases"), L("s0",0,5,"Numbers 0–20") ] },
  { id: "u1", num: 1, title: "Introducing Yourself", lessons: [
    L("s0",1,1,"Greetings & How are you?"), L("s0",1,2,"Hello, I'm…"), L("s0",1,3,"Where are you from?"),
    L("s0",1,4,"What do you do?"), L("s0",1,5,"Self-introduction task") ] },
  { id: "u2", num: 2, title: "Family & People", lessons: [
    L("s0",2,1,"My family"), L("s0",2,2,"This is my… (his/her)"), L("s0",2,3,"have / has"),
    L("s0",2,4,"Ages & numbers 20–100"), L("s0",2,5,"Describe your family") ] },
  { id: "u3", num: 3, title: "My Things & Places", lessons: [
    L("s0",3,1,"Objects & a/an"), L("s0",3,2,"Plurals"), L("s0",3,3,"There is / There are"),
    L("s0",3,4,"Prepositions of place"), L("s0",3,5,"Describe your room") ] },
  { id: "u4", num: 4, title: "Daily Routine", lessons: [
    L("s0",4,1,"My day"), L("s0",4,2,"He/she + verb-s"), L("s0",4,3,"Telling the time"),
    L("s0",4,4,"Frequency adverbs"), L("s0",4,5,"Describe your typical day") ] },
  { id: "u5", num: 5, title: "Free Time & Ability", lessons: [
    L("s0",5,1,"I like… (+ -ing)"), L("s0",5,2,"Hobbies"), L("s0",5,3,"Can you…?"),
    L("s0",5,4,"Do you like…?"), L("s0",5,5,"Talk about your free time") ] },
  { id: "u6", num: 6, title: "Food & Shopping", lessons: [
    L("s0",6,1,"Food & drink"), L("s0",6,2,"some / any"), L("s0",6,3,"I'd like…"),
    L("s0",6,4,"Prices"), L("s0",6,5,"Café/shop role-play") ] },
  { id: "u7", num: 7, title: "Describing People & Things", lessons: [
    L("s0",7,1,"Colours & adjectives"), L("s0",7,2,"Adjective + noun"), L("s0",7,3,"Appearance"),
    L("s0",7,4,"have got"), L("s0",7,5,"Describe a person") ] },
  { id: "u8", num: 8, title: "Places & Directions", lessons: [
    L("s0",8,1,"Places in town"), L("s0",8,2,"Is there a…?"), L("s0",8,3,"Giving directions"),
    L("s0",8,4,"Prepositions of movement"), L("s0",8,5,"Directions task") ] },
  { id: "u9", num: 9, title: "Happening Now", lessons: [
    L("s0",9,1,"I'm …-ing (present continuous)"), L("s0",9,2,"What are they doing?"), L("s0",9,3,"now vs usually"),
    L("s0",9,4,"What are you wearing?"), L("s0",9,5,"Narrate a scene") ] },
  { id: "u10", num: 10, title: "Putting It Together", lessons: [
    L("s0",10,1,"Big review 1"), L("s0",10,2,"Big review 2"), L("s0",10,3,"Accent clinic"),
    L("s0",10,4,"A1 mock conversation"), L("s0",10,5,"Summative + graduation") ] },
];

export const STAGE1: Unit[] = [
  { id: "u1", num: 1, title: "The Past (1) — Was & Were", lessons: [
    L("s1",1,1,"I was, you were"), L("s1",1,2,"Negatives & questions with was/were"),
    L("s1",1,3,"There was / There were"), L("s1",1,4,"How was it? A past experience"),
    L("s1",1,5,"Where were you last weekend?") ] },
  { id: "u2", num: 2, title: "The Past (2) — Regular Verbs", lessons: [
    L("s1",2,1,"Yesterday I worked"), L("s1",2,2,"The -ed sounds: /t/, /d/, /ɪd/"),
    L("s1",2,3,"Spelling rules for -ed"), L("s1",2,4,"Sequencing a day"),
    L("s1",2,5,"What did you do yesterday?") ] },
  { id: "u3", num: 3, title: "The Past (3) — Irregulars & Questions", lessons: [
    L("s1",3,1,"Irregular verbs: went, had, did, saw, ate"), L("s1",3,2,"Irregular verbs: bought, got, came, made, took"),
    L("s1",3,3,"Past questions & negatives"), L("s1",3,4,"Telling a short story"),
    L("s1",3,5,"Tell me about your last holiday") ] },
  { id: "u4", num: 4, title: "Future Plans", lessons: [
    L("s1",4,1,"I'm going to…"), L("s1",4,2,"Asking about plans"),
    L("s1",4,3,"I'll… — decisions, offers & predictions"), L("s1",4,4,"Going to vs will"),
    L("s1",4,5,"My plans for next month") ] },
  { id: "u5", num: 5, title: "Making Comparisons", lessons: [
    L("s1",5,1,"Comparatives with -er"), L("s1",5,2,"Longer & irregular comparatives"),
    L("s1",5,3,"Superlatives"), L("s1",5,4,"as…as, too & enough"),
    L("s1",5,5,"Compare two cities") ] },
  { id: "u6", num: 6, title: "Food, Quantity & Restaurants", lessons: [
    L("s1",6,1,"Countable, uncountable, some & any"), L("s1",6,2,"much, many, a lot of, a few, a little"),
    L("s1",6,3,"How much? How many?"), L("s1",6,4,"Ordering politely at a restaurant"),
    L("s1",6,5,"Role-play: ordering a meal") ] },
  { id: "u7", num: 7, title: "Health & Advice", lessons: [
    L("s1",7,1,"Body & symptoms"), L("s1",7,2,"Giving advice with should"),
    L("s1",7,3,"Obligation & necessity"), L("s1",7,4,"Health habits & the doctor"),
    L("s1",7,5,"Give a friend health advice") ] },
  { id: "u8", num: 8, title: "Travel & Transport", lessons: [
    L("s1",8,1,"Transport & getting around"), L("s1",8,2,"Requests & permission"),
    L("s1",8,3,"Booking & travel rules"), L("s1",8,4,"Narrate a past trip"),
    L("s1",8,5,"Tell me about a trip you took") ] },
  { id: "u9", num: 9, title: "People, Feelings & Everyday Situations", lessons: [
    L("s1",9,1,"Feelings & personality"), L("s1",9,2,"Adverbs of manner"),
    L("s1",9,3,"Usually vs now"), L("s1",9,4,"On the phone & small talk"),
    L("s1",9,5,"A two-minute chat about your week") ] },
  { id: "u10", num: 10, title: "Putting It Together (A2)", lessons: [
    L("s1",10,1,"Big review: past narration"), L("s1",10,2,"Big review: range"),
    L("s1",10,3,"Personal accent clinic"), L("s1",10,4,"The A2 exchange mock"),
    L("s1",10,5,"Stage-1 summative + A2 milestone") ] },
];

export const STAGES: Record<StageId, Stage> = {
  s0: { id: "s0", num: 0, title: "Foundations", rank: "Recruit", cefr: "Pre-A1 → A1", entry: "True beginner", units: STAGE0 },
  s1: { id: "s1", num: 1, title: "Elementary", rank: "Citizen", cefr: "A2", entry: "A1 achieved or placement evidence", units: STAGE1 },
};

export function getStage(id: string): Stage | null {
  return id === "s0" || id === "s1" ? STAGES[id] : null;
}

export function getStageLessonIds(stageId: StageId): string[] {
  return STAGES[stageId].units.flatMap((unit) => unit.lessons.map((lesson) => lesson.id));
}

/** Kept as the Stage-0 total for legacy imports; new pages use getStageLessonIds. */
export const TOTAL_LESSONS = getStageLessonIds("s0").length;
export const ALL_LESSON_IDS = (Object.keys(STAGES) as StageId[]).flatMap(getStageLessonIds);

export type FlatLesson = {
  id: string;
  title: string;
  stageId: StageId;
  stageNum: number;
  stageTitle: string;
  unitNum: number;
  unitTitle: string;
  index: number; // stage-local, zero-based position
};

export function getStageFlatLessons(stageId: StageId): FlatLesson[] {
  const stage = STAGES[stageId];
  return stage.units
    .flatMap((unit) => unit.lessons.map((lesson) => ({ lesson, unit })))
    .map(({ lesson, unit }, index) => ({
      id: lesson.id,
      title: lesson.title,
      stageId,
      stageNum: stage.num,
      stageTitle: stage.title,
      unitNum: unit.num,
      unitTitle: unit.title,
      index,
    }));
}

export const FLAT_LESSONS = (Object.keys(STAGES) as StageId[]).flatMap(getStageFlatLessons);

export function getFlatLesson(id: string): FlatLesson | null {
  return FLAT_LESSONS.find((lesson) => lesson.id === id) ?? null;
}

export function getAdjacentLessons(id: string): { prev: FlatLesson | null; next: FlatLesson | null } {
  const lesson = getFlatLesson(id);
  if (!lesson) return { prev: null, next: null };
  const stageLessons = getStageFlatLessons(lesson.stageId);
  const index = stageLessons.findIndex((candidate) => candidate.id === id);
  return {
    prev: index > 0 ? stageLessons[index - 1] : null,
    next: index < stageLessons.length - 1 ? stageLessons[index + 1] : null,
  };
}

export function stageDashboardPath(locale: string, stageId: StageId): string {
  return stageId === "s0" ? `/${locale}/portal` : `/${locale}/portal/stages/${stageId}`;
}
