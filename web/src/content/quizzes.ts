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

// Stage-1 per-unit formative quizzes. Keys are stage-qualified ("s1-uN") so
// results never collide with Stage-0's "uN" keys in quiz-results.json.
// Source of truth: the authored Stage-1 lessons in materials/stage1/.
export const STAGE1_QUIZZES: Record<string, UnitQuiz> = {
  "s1-u1": {
    unit: "s1-u1",
    num: 1,
    title: "The Past — Was & Were",
    questions: [
      q("s1u1q1", "Yesterday I ___ at home all day.", ["was", "were", "am"], 0),
      q("s1u1q2", "They ___ tired after the long trip.", ["was", "were", "are"], 1),
      q("s1u1q3", "___ you at the party last night?", ["Were", "Was", "Did"], 0),
      q("s1u1q4", "A good reply to \u201cHow was your weekend?\u201d is:", [
        "It was great.",
        "Yes, I do.",
        "I am fine.",
      ], 0),
    ],
  },
  "s1-u2": {
    unit: "s1-u2",
    num: 2,
    title: "The Past — Regular Verbs",
    questions: [
      q("s1u2q1", "Yesterday I ___ (work) until six.", ["worked", "work", "working"], 0),
      q("s1u2q2", "The \u2011ed in \u201cvisited\u201d sounds like:", ["/\u026ad/", "/t/", "/d/"], 0),
      q("s1u2q3", "Spelling: stop + \u2011ed =", ["stopped", "stoped", "stopeed"], 0),
      q("s1u2q4", "Which word usually comes first when telling a day?", ["First", "Later", "Finally"], 0),
    ],
  },
  "s1-u3": {
    unit: "s1-u3",
    num: 3,
    title: "The Past — Irregulars & Questions",
    questions: [
      q("s1u3q1", "Last week I ___ (go) to Alexandria.", ["went", "goed", "gone"], 0),
      q("s1u3q2", "Which question is correct?", ["Did you go?", "Did you went?", "You did go?"], 0),
      q("s1u3q3", "___ did you see at the station? (a person)", ["Who", "What", "Where"], 0),
      q("s1u3q4", "I ___ eat breakfast this morning.", ["didn't", "wasn't", "don't"], 0),
    ],
  },
  "s1-u4": {
    unit: "s1-u4",
    num: 4,
    title: "Future Plans",
    questions: [
      q("s1u4q1", "I ___ going to travel next month.", ["am", "is", "will"], 0),
      q("s1u4q2", "The phone is ringing. \u201cI ___ answer it!\u201d", ["'ll", "'m going to", "will to"], 0),
      q("s1u4q3", "___ you going to do tonight?", ["What are", "What do", "What will"], 0),
      q("s1u4q4", "A plan you decided earlier uses:", ["be going to", "will", "would"], 0),
    ],
  },
  "s1-u5": {
    unit: "s1-u5",
    num: 5,
    title: "Making Comparisons",
    questions: [
      q("s1u5q1", "Cairo is ___ than Luxor.", ["bigger", "more big", "biggest"], 0),
      q("s1u5q2", "This is the ___ hotel in the city.", [
        "most expensive",
        "more expensive",
        "expensivest",
      ], 0),
      q("s1u5q3", "She is as tall ___ her brother.", ["as", "than", "that"], 0),
      q("s1u5q4", "Which is correct?", ["more comfortable", "comfortabler", "more comfortabler"], 0),
    ],
  },
  "s1-u6": {
    unit: "s1-u6",
    num: 6,
    title: "Food, Quantity & Restaurants",
    questions: [
      q("s1u6q1", "How ___ water do you drink a day?", ["much", "many", "some"], 0),
      q("s1u6q2", "There aren't ___ eggs left.", ["any", "some", "much"], 0),
      q("s1u6q3", "I have ___ friends in Cairo.", ["a few", "a little", "much"], 0),
      q("s1u6q4", "The most polite way to order is:", [
        "Could I have the soup, please?",
        "Give me the soup.",
        "I want soup.",
      ], 0),
    ],
  },
  "s1-u7": {
    unit: "s1-u7",
    num: 7,
    title: "Health & Advice",
    questions: [
      q("s1u7q1", "I ___ a headache.", ["have", "feel", "am"], 0),
      q("s1u7q2", "You ___ see a doctor. (advice)", ["should", "have", "are"], 0),
      q("s1u7q3", "\u201cYou don't have to come\u201d means:", [
        "it is not necessary",
        "it is forbidden",
        "you must come",
      ], 0),
      q("s1u7q4", "Which sounds like advice, not an order?", [
        "I think you should rest.",
        "Rest.",
        "You rest now.",
      ], 0),
    ],
  },
  "s1-u8": {
    unit: "s1-u8",
    num: 8,
    title: "Travel & Transport",
    questions: [
      q("s1u8q1", "How do I ___ to the airport?", ["get", "go", "arrive"], 0),
      q("s1u8q2", "Ask permission for yourself:", [
        "Could I sit here?",
        "Could you sit here?",
        "Do you sit here?",
      ], 0),
      q("s1u8q3", "\u201cYou can't smoke here\u201d means it is:", ["forbidden", "not necessary", "optional"], 0),
      q("s1u8q4", "I go to work ___ bus.", ["by", "on", "with"], 0),
    ],
  },
  "s1-u9": {
    unit: "s1-u9",
    num: 9,
    title: "People, Feelings & Everyday Situations",
    questions: [
      q("s1u9q1", "The film was really ___.", ["boring", "bored", "bore"], 0),
      q("s1u9q2", "She speaks English very ___.", ["well", "good", "goodly"], 0),
      q("s1u9q3", "At the moment I ___ working from home.", ["am", "usually", "was"], 0),
      q("s1u9q4", "\u201cWhat's your manager like?\u201d asks about:", [
        "her personality",
        "how she feels today",
        "what she wants",
      ], 0),
    ],
  },
  "s1-u10": {
    unit: "s1-u10",
    num: 10,
    title: "Putting It Together (A2)",
    questions: [
      q("s1u10q1", "I ___ to Luxor last year.", ["went", "go", "going"], 0),
      q("s1u10q2", "I'm going ___ travel in the summer.", ["to", "will", "for"], 0),
      q("s1u10q3", "Dahab is ___ than Cairo.", ["quieter", "more quiet", "quietest"], 0),
      q("s1u10q4", "We don't have ___ time before the train.", ["much", "many", "few"], 0),
      q("s1u10q5", "You ___ rest \u2014 you look tired. (advice)", ["should", "have", "must to"], 0),
    ],
  },
};

// Stage-2 per-unit formative quizzes. Keys are stage-qualified ("s2-uN").
// Source of truth: the authored Stage-2 lessons in materials/stage2/.
// Each item targets a documented Stage-2 error, not trivia: the distractors are
// the mistakes the coach notes say learners actually make.
export const STAGE2_QUIZZES: Record<string, UnitQuiz> = {
  "s2-u1": {
    unit: "s2-u1",
    num: 1,
    title: "Present Perfect — Experiences",
    questions: [
      q("s2u1q1", "___ you ever been to Turkey?", ["Have", "Has", "Did"], 0),
      q("s2u1q2", "She ___ never tried sushi.", ["has", "have", "is"], 0),
      q("s2u1q3", "The past participle of \u201cgo\u201d (for experience) is:", ["gone", "went", "goed"], 0),
      q("s2u1q4", "He isn't here \u2014 he's ___ to the bank.", ["gone", "been", "going"], 0),
      q("s2u1q5", "Which sentence gives no date?", [
        "I've visited Jordan.",
        "I visited Jordan in 2019.",
        "I was visiting Jordan.",
      ], 0),
    ],
  },
  "s2-u2": {
    unit: "s2-u2",
    num: 2,
    title: "Present Perfect — Recent & Unfinished",
    questions: [
      q("s2u2q1", "I've ___ finished \u2014 two minutes ago.", ["just", "yet", "since"], 0),
      q("s2u2q2", "I haven't called her ___.", ["yet", "already", "just"], 0),
      q("s2u2q3", "I've lived here ___ 2019.", ["since", "for", "from"], 0),
      q("s2u2q4", "I've worked here ___ three years.", ["for", "since", "during"], 0),
      q("s2u2q5", "Which is correct?", [
        "I saw him yesterday.",
        "I've seen him yesterday.",
        "I've saw him yesterday.",
      ], 0),
    ],
  },
  "s2-u3": {
    unit: "s2-u3",
    num: 3,
    title: "Narrative Past — Continuous & Used To",
    questions: [
      q("s2u3q1", "I ___ working when the phone rang.", ["was", "were", "am"], 0),
      q("s2u3q2", "The long background action takes:", ["past continuous", "past simple", "present perfect"], 0),
      q("s2u3q3", "I ___ play football every Friday, but I stopped.", ["used to", "use to", "am used to"], 0),
      q("s2u3q4", "Choose the correct pair:", [
        "While I was cooking, the lights went out.",
        "While I cooked, the lights were going out.",
        "While I was cooking, the lights were going out.",
      ], 0),
    ],
  },
  "s2-u4": {
    unit: "s2-u4",
    num: 4,
    title: "First Conditional & Future Time",
    questions: [
      q("s2u4q1", "If it ___ tomorrow, we'll stay in.", ["rains", "will rain", "rained"], 0),
      q("s2u4q2", "I'll call you as soon as I ___.", ["arrive", "will arrive", "arrived"], 0),
      q("s2u4q3", "___ you hurry, you'll miss the train.", ["Unless", "If", "When"], 0),
      q("s2u4q4", "Which is WRONG?", [
        "If I will see him, I'll tell him.",
        "If I see him, I'll tell him.",
        "I'll tell him if I see him.",
      ], 0),
    ],
  },
  "s2-u5": {
    unit: "s2-u5",
    num: 5,
    title: "Hypotheticals — Second Conditional",
    questions: [
      q("s2u5q1", "If I ___ more time, I would travel.", ["had", "have", "will have"], 0),
      q("s2u5q2", "If I were you, I ___ take the job.", ["'d", "'ll", "will"], 0),
      q("s2u5q3", "Which one is about something UNREAL?", [
        "If I won the prize, I'd move house.",
        "If I win the prize, I'll move house.",
        "When I win the prize, I'll move house.",
      ], 0),
      q("s2u5q4", "I wish I ___ more languages.", ["spoke", "speak", "will speak"], 0),
    ],
  },
  "s2-u6": {
    unit: "s2-u6",
    num: 6,
    title: "Relative Clauses",
    questions: [
      q("s2u6q1", "The woman ___ lives next door is a nurse.", ["who", "which", "what"], 0),
      q("s2u6q2", "That's the caf\u00e9 ___ we first met.", ["where", "which", "who"], 0),
      q("s2u6q3", "That's the man ___ car was stolen.", ["whose", "who's", "who"], 0),
      q("s2u6q4", "Which sentence is WRONG?", [
        "The man who he lives here is my uncle.",
        "The man who lives here is my uncle.",
        "The man living here is my uncle.",
      ], 0),
      q("s2u6q5", "You can leave out the relative pronoun when it is:", [
        "the object of the clause",
        "the subject of the clause",
        "always",
      ], 0),
    ],
  },
  "s2-u7": {
    unit: "s2-u7",
    num: 7,
    title: "Reported Speech",
    questions: [
      q("s2u7q1", "She ___ me she was tired.", ["told", "said", "spoke"], 0),
      q("s2u7q2", "\u201cI am busy.\u201d \u2192 He said he ___ busy.", ["was", "is", "has been"], 0),
      q("s2u7q3", "\u201cWhere do you live?\u201d \u2192 She asked me where I ___.", ["lived", "did live", "do live"], 0),
      q("s2u7q4", "\u201cPlease wait.\u201d \u2192 He asked me ___ wait.", ["to", "that", "for"], 0),
      q("s2u7q5", "Which is correct?", [
        "She said that she'd finished.",
        "She said me that she'd finished.",
        "She told that she'd finished.",
      ], 0),
    ],
  },
  "s2-u8": {
    unit: "s2-u8",
    num: 8,
    title: "The Passive",
    questions: [
      q("s2u8q1", "Coffee ___ grown in Brazil.", ["is", "are", "has"], 0),
      q("s2u8q2", "The bridge ___ built in 1998.", ["was", "is", "were"], 0),
      q("s2u8q3", "Include \u201cby + agent\u201d when:", [
        "the doer is new or important information",
        "always",
        "never",
      ], 0),
      q("s2u8q4", "Which is WRONG?", [
        "The letter sent yesterday by my sister.",
        "The letter was sent yesterday by my sister.",
        "My sister sent the letter yesterday.",
      ], 0),
    ],
  },
  "s2-u9": {
    unit: "s2-u9",
    num: 9,
    title: "Connecting Ideas & Opinions",
    questions: [
      q("s2u9q1", "I left early ___ I could catch the train.", ["so that", "because", "although"], 0),
      q("s2u9q2", "___ it was expensive, I bought it.", ["Although", "However", "Despite"], 0),
      q("s2u9q3", "Which punctuation is right?", [
        "It's expensive. However, it's worth it.",
        "It's expensive, however it's worth it.",
        "It's expensive however, it's worth it.",
      ], 0),
      q("s2u9q4", "A complete B1 opinion turn needs:", [
        "an opinion plus a reason",
        "an opinion only",
        "a long list of facts",
      ], 0),
    ],
  },
  "s2-u10": {
    unit: "s2-u10",
    num: 10,
    title: "Discussion Skills",
    questions: [
      q("s2u10q1", "The most useful move in a real discussion is:", [
        "partial agreement",
        "total agreement",
        "silence",
      ], 0),
      q("s2u10q2", "Which disagreement is politest?", [
        "I see it differently, actually.",
        "That's wrong.",
        "No.",
      ], 0),
      q("s2u10q3", "\u201cIt depends\u201d is an example of:", ["hedging", "agreeing", "reporting"], 0),
      q("s2u10q4", "When someone challenges your point, the strongest move is to:", [
        "concede the fair part, then hold the rest",
        "repeat your point louder",
        "change the subject",
      ], 0),
    ],
  },
  "s2-u11": {
    unit: "s2-u11",
    num: 11,
    title: "Storytelling & Real-World Topics",
    questions: [
      q("s2u11q1", "To say something happened EARLIER than your story, use:", [
        "had + past participle",
        "was + -ing",
        "have + past participle",
      ], 0),
      q("s2u11q2", "I've worked there ___ 2021.", ["since", "for", "from"], 0),
      q("s2u11q3", "In my job I'm responsible ___ the schedule.", ["for", "of", "about"], 0),
      q("s2u11q4", "An opinion is stronger when you anchor it in:", [
        "a specific personal example",
        "a general statement",
        "a longer sentence",
      ], 0),
      q("s2u11q5", "If a word is missing mid-sentence, the best move is to:", [
        "describe it in other words and keep going",
        "stop and translate",
        "start the turn again",
      ], 0),
    ],
  },
  "s2-u12": {
    unit: "s2-u12",
    num: 12,
    title: "Putting It Together (B1)",
    questions: [
      q("s2u12q1", "I ___ there twice, but I didn't go last year.", ["'ve been", "went", "was going"], 0),
      q("s2u12q2", "If I ___ you, I'd ask for more.", ["were", "was going to be", "am"], 0),
      q("s2u12q3", "She asked me ___ I had finished.", ["if", "that", "do"], 0),
      q("s2u12q4", "The office ___ renovated last year.", ["was", "is", "has"], 0),
      q("s2u12q5", "The B1 rubric scores Fluency, Coherence, Accuracy, Range and:", [
        "Interaction",
        "Vocabulary size",
        "Accent",
      ], 0),
    ],
  },
};

const ALL_QUIZZES: Record<string, UnitQuiz> = { ...QUIZZES, ...STAGE1_QUIZZES, ...STAGE2_QUIZZES };

export function getQuiz(unitKey: string): UnitQuiz | null {
  return ALL_QUIZZES[unitKey] ?? null;
}

/** Stage-qualified quiz key. Stage 0 keeps its legacy "uN" keys; later stages use "sN-uM". */
export function quizKey(stageId: string, unitId: string): string {
  return stageId === "s0" ? unitId : `${stageId}-${unitId}`;
}

export function getUnitQuiz(stageId: string, unitId: string): UnitQuiz | null {
  return getQuiz(quizKey(stageId, unitId));
}
