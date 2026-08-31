// Multi-stage lesson manifest for portal navigation and validation.
// Lesson content remains generated from materials/; this file is the structured index.

export type StageId = "s0" | "s1" | "s2";
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

export const STAGE2: Unit[] = [
  { id: "u1", num: 1, title: "Present Perfect (1) — Experiences", lessons: [
    L("s2",1,1,"Present perfect form: have/has + past participle"), L("s2",1,2,"Past participles: the third column"),
    L("s2",1,3,"Have you ever…? + ever/never"), L("s2",1,4,"Been vs gone"),
    L("s2",1,5,"Life experiences") ] },
  { id: "u2", num: 2, title: "Present Perfect (2) — Recent & Unfinished", lessons: [
    L("s2",2,1,"just, already, yet"), L("s2",2,2,"for & since — How long have you…?"),
    L("s2",2,3,"Present perfect vs past simple — the hinge"), L("s2",2,4,"News & recent events"),
    L("s2",2,5,"What you've done lately") ] },
  { id: "u3", num: 3, title: "Narrative Past — Continuous & Used To", lessons: [
    L("s2",3,1,"Past continuous: I was doing…"), L("s2",3,2,"while / when — interrupted actions"),
    L("s2",3,3,"used to — past habits & states"), L("s2",3,4,"Setting a scene in a story"),
    L("s2",3,5,"A memorable moment") ] },
  { id: "u4", num: 4, title: "First Conditional & Future Time", lessons: [
    L("s2",4,1,"First conditional: if + present, will"), L("s2",4,2,"Future time clauses: when, as soon as, until"),
    L("s2",4,3,"unless / if not"), L("s2",4,4,"Real plans & promises"),
    L("s2",4,5,"Plans & consequences") ] },
  { id: "u5", num: 5, title: "Hypotheticals — Second Conditional", lessons: [
    L("s2",5,1,"Second conditional: if + past, would"), L("s2",5,2,"Real vs unreal: 1st vs 2nd conditional"),
    L("s2",5,3,"If I were you… — hypothetical advice"), L("s2",5,4,"I wish…"),
    L("s2",5,5,"If I could… / my dreams") ] },
  { id: "u6", num: 6, title: "Relative Clauses", lessons: [
    L("s2",6,1,"who / which / that — people & things"), L("s2",6,2,"where / whose"),
    L("s2",6,3,"Leaving out the relative pronoun"), L("s2",6,4,"Defining people, places & things in detail"),
    L("s2",6,5,"Describe a person or place who/that…") ] },
  { id: "u7", num: 7, title: "Reported Speech", lessons: [
    L("s2",7,1,"say vs tell"), L("s2",7,2,"Reported statements (backshift)"),
    L("s2",7,3,"Reported questions"), L("s2",7,4,"Reporting advice & requests — asked me to…"),
    L("s2",7,5,"Report a conversation") ] },
  { id: "u8", num: 8, title: "The Passive", lessons: [
    L("s2",8,1,"Present simple passive"), L("s2",8,2,"Past simple passive"),
    L("s2",8,3,"by + agent — when to include it"), L("s2",8,4,"Processes, facts & news: active ↔ passive"),
    L("s2",8,5,"Describe how something is made") ] },
  { id: "u9", num: 9, title: "Connecting Ideas & Opinions", lessons: [
    L("s2",9,1,"because, so, so that — reason & result"), L("s2",9,2,"although, but, however — contrast"),
    L("s2",9,3,"Adding & sequencing ideas"), L("s2",9,4,"Expressing & justifying an opinion"),
    L("s2",9,5,"Give your opinion on…") ] },
  { id: "u10", num: 10, title: "Discussion Skills", lessons: [
    L("s2",10,1,"Agreeing & adding"), L("s2",10,2,"Disagreeing politely"),
    L("s2",10,3,"Hedging & softening"), L("s2",10,4,"A short structured discussion"),
    L("s2",10,5,"Discuss a topic with a partner") ] },
  { id: "u11", num: 11, title: "Storytelling & Real-World Topics", lessons: [
    L("s2",11,1,"Telling a detailed story (tense mix)"), L("s2",11,2,"Talking about work & study"),
    L("s2",11,3,"Technology, media & city life"), L("s2",11,4,"Handling an unexpected topic"),
    L("s2",11,5,"Detailed story + discuss a topic") ] },
  { id: "u12", num: 12, title: "Putting It Together (B1)", lessons: [
    L("s2",12,1,"Big review 1: perfect + narrative past"), L("s2",12,2,"Big review 2: conditionals, relatives, reported, passive"),
    L("s2",12,3,"Discussion clinic"), L("s2",12,4,"B1 mock discussion (8–12 min)"),
    L("s2",12,5,"Stage-2 summative + B1 milestone") ] },
];

export const STAGES: Record<StageId, Stage> = {
  s0: { id: "s0", num: 0, title: "Foundations", rank: "Recruit", cefr: "Pre-A1 → A1", entry: "True beginner", units: STAGE0 },
  s1: { id: "s1", num: 1, title: "Elementary", rank: "Citizen", cefr: "A2", entry: "A1 achieved or placement evidence", units: STAGE1 },
  s2: { id: "s2", num: 2, title: "Intermediate", rank: "Legionary", cefr: "B1", entry: "A2 achieved or placement evidence", units: STAGE2 },
};

/**
 * Single source of truth for "is this string a stage we ship?". Everything that
 * used to hardcode `id === "s0" || id === "s1"` reads this instead, so adding a
 * stage to STAGES cannot leave a stale guard silently rejecting it.
 */
export function isStageId(id: string): id is StageId {
  return Object.prototype.hasOwnProperty.call(STAGES, id);
}

export function getStage(id: string): Stage | null {
  return isStageId(id) ? STAGES[id] : null;
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
