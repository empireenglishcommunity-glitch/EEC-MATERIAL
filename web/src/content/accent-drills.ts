// Accent Lab — Stage-0 record-and-compare drills.
// Source of truth: curriculum/03-accent-lab-syllabus.md (cards C1–C9, V1).
// Honesty guardrail (GC-5): target = clear, confident, neutral American accent + high
// intelligibility. Native-like is an aspirational ceiling, never a promise.

export type AccentDrill = {
  id: string;
  stage: "s0" | "s1";
  unit?: number;
  sound: string; // e.g. "/p/ vs /b/"
  titleEn: string;
  titleAr: string;
  cueEn: string;
  cueAr: string;
  phrase: string; // the sentence the learner records + compares
  words: string[];
  pairs: string[]; // minimal pairs
  signature?: boolean;
};

export const STAGE0_ACCENT_DRILLS: AccentDrill[] = [
  {
    id: "c1-p-b",
    stage: "s0",
    sound: "/p/ vs /b/",
    titleEn: "The /p/ sound",
    titleAr: "صوت الـ /p/",
    cueEn: "/p/ = lips together + a puff of air, no voice. /b/ = same lips, no puff, with voice.",
    cueAr: "الـ /p/ = الشفايف مقفولة مع نفخة هوا وبدون صوت. الـ /b/ = نفس الشفايف بدون نفخة ومع صوت.",
    phrase: "A person pays for the paper.",
    words: ["pen", "people", "happy", "stop", "cup"],
    pairs: ["pen / Ben", "pig / big", "cap / cab"],
  },
  {
    id: "c2-v-f",
    stage: "s0",
    sound: "/v/ vs /f/",
    titleEn: "The /v/ sound",
    titleAr: "صوت الـ /v/",
    cueEn: "Both = top teeth on the lower lip. /v/ has voice, /f/ has none.",
    cueAr: "الاتنين = السنان العليا على الشفة السفلى. الـ /v/ بصوت، والـ /f/ من غير صوت.",
    phrase: "I have very few friends.",
    words: ["very", "five", "video", "love", "seven"],
    pairs: ["van / fan", "very / ferry", "save / safe"],
  },
  {
    id: "c3-th",
    stage: "s0",
    sound: "/θ/ and /ð/",
    titleEn: "The 'th' sounds",
    titleAr: "أصوات الـ 'th'",
    cueEn: "Tongue tip lightly between the teeth. /θ/ no voice (think), /ð/ with voice (this).",
    cueAr: "طرف اللسان خفيف بين السنان. الـ /θ/ من غير صوت (think)، والـ /ð/ بصوت (this).",
    phrase: "This is my three brothers.",
    words: ["think", "three", "mother", "father", "this"],
    pairs: ["think / sink", "this / dis", "three / tree"],
  },
  {
    id: "c4-j",
    stage: "s0",
    sound: "/dʒ/ (\"j\")",
    titleEn: "The 'j' sound (Egyptian priority)",
    titleAr: "صوت الـ 'j' (أولوية للمصريين)",
    cueEn: "Egyptian ج = /g/, so /dʒ/ is the hard one. Tongue to the ridge, soft burst + voice (like 'jam'). Don't say a hard /g/.",
    cueAr: "الجيم المصري = /g/، فالـ /dʒ/ هو الصعب. اللسان لفوق ورا السنان مع انفجار خفيف وصوت (زي بداية 'jam'). ماتقولش جيم مصري.",
    phrase: "My job is a good job.",
    words: ["job", "judge", "orange", "page", "engineer"],
    pairs: ["jet / get", "job / gob", "jail / gale"],
  },
  {
    id: "c5-ng",
    stage: "s0",
    sound: "/ŋ/ (the -ing sound)",
    titleEn: "The -ing sound",
    titleAr: "صوت الـ -ing",
    cueEn: "Back of the tongue up, nasal — but no hard 'g' at the end. Not 'readin', not 'readingg'.",
    cueAr: "آخر اللسان لفوق، صوت من المناخير — بس من غير جيم قوية في الآخر. مش 'readin' ولا 'readingg'.",
    phrase: "Good morning, I'm reading and working.",
    words: ["doing", "reading", "morning", "going", "running"],
    pairs: ["thin / thing", "sin / sing", "ban / bang"],
  },
  {
    id: "c6-r-l",
    stage: "s0",
    sound: "American /r/ and dark /l/",
    titleEn: "American /r/ and dark /l/",
    titleAr: "الـ /r/ الأمريكاني والـ /l/ الغامقة",
    cueEn: "/r/ = tongue bunched/curled back, NO trill (not an Arabic ر). Dark /l/ at word ends = back of tongue raised.",
    cueAr: "الـ /r/ = اللسان مقوّس لورا، من غير تكرار (مش راء عربية مكررة). الـ /l/ الغامقة في آخر الكلمة = آخر اللسان لفوق.",
    phrase: "The red car is really far.",
    words: ["red", "right", "car", "world", "well"],
    pairs: ["right / light", "road / load", "feel / fee"],
  },
  {
    id: "c8-s-endings",
    stage: "s0",
    sound: "-s / -es endings",
    titleEn: "The -s / -es endings",
    titleAr: "نهايات الـ -s / -es",
    cueEn: "After voiceless: /s/ (books). After voiced/vowel: /z/ (pens). After sibilants: /ɪz/ (boxes). Don't add a vowel ('bookes').",
    cueAr: "بعد صوت مهموس: /s/ (books). بعد صوت مجهور/حرف علة: /z/ (pens). بعد الصفير: /ɪz/ (boxes). ماتزودش حرف علة ('bookes').",
    phrase: "The boxes and books are on the tables.",
    words: ["books", "pens", "boxes", "watches", "dogs"],
    pairs: ["books /s/", "pens /z/", "boxes /ɪz/"],
  },
  {
    id: "c9-clusters",
    stage: "s0",
    sound: "Consonant clusters",
    titleEn: "Consonant clusters (no extra vowel)",
    titleAr: "التجمعات الساكنة (من غير حرف علة زيادة)",
    cueEn: "Say the cluster WITHOUT adding a vowel — glide through it. Not 'iskool' or 'sitreet'. This is the highest-value Arabic fix.",
    cueAr: "انطق التجمع من غير ما تزود حرف علة — عدّي عليه بسلاسة. مش 'iskool' ولا 'sitreet'. ده أهم تصحيح للعربي.",
    phrase: "School starts on the street.",
    words: ["school", "street", "spring", "desk", "world"],
    pairs: ["school (not iskool)", "street (not sitreet)", "desk (not deskuh)"],
    signature: true,
  },
  {
    id: "v1-ship-sheep",
    stage: "s0",
    sound: "/ɪ/ vs /iː/ (ship / sheep)",
    titleEn: "Short vs long 'i' (ship / sheep)",
    titleAr: "الـ i القصيرة والطويلة (ship / sheep)",
    cueEn: "/ɪ/ short & relaxed (ship); /iː/ long & tense, with a smile (sheep). Don't merge both into one Arabic /i/.",
    cueAr: "الـ /ɪ/ قصيرة ومسترخية (ship)؛ والـ /iː/ طويلة ومشدودة مع ابتسامة (sheep). ماتدمجش الاتنين في ياء عربية واحدة.",
    phrase: "I live to leave.",
    words: ["ship / sheep", "bit / beat", "live / leave"],
    pairs: ["ship / sheep", "bit / beat", "live / leave"],
  },
];

// Stage-1 Accent Lab drills — one per unit, drawn from each unit's Accent Lab.
// IDs are stage-qualified so practiced state never collides with Stage 0.
export const STAGE1_ACCENT_DRILLS: AccentDrill[] = [
  {
    id: "s1-u1-was-were",
    stage: "s1",
    unit: 1,
    sound: "was / were (weak vs strong)",
    titleEn: "Weak and strong \u201cwas\u201d",
    titleAr: "\u0627\u0644\u0640 was \u0627\u0644\u062e\u0641\u064a\u0641\u0629 \u0648\u0627\u0644\u0642\u0648\u064a\u0629",
    cueEn: "In a normal sentence, \u201cwas\u201d is weak: /w\u0259z/. Stress it only to correct someone. The /w/ has round lips, not a /v/.",
    cueAr: "\u0641\u064a \u0627\u0644\u062c\u0645\u0644\u0629 \u0627\u0644\u0639\u0627\u062f\u064a\u0629 \u201cwas\u201d \u062a\u064a\u062c\u064a \u062e\u0641\u064a\u0641\u0629: /w\u0259z/. \u0645\u0627\u062a\u0636\u063a\u0637\u0647\u0627\u0634 \u0625\u0644\u0627 \u0644\u0645\u0627 \u062a\u0635\u062d\u062d. \u0648\u0627\u0644\u0640 /w/ \u0628\u0634\u0641\u0627\u064a\u0641 \u0645\u062f\u0648\u0631\u0629\u060c \u0645\u0634 /v/.",
    phrase: "I was tired, and they were busy.",
    words: ["was", "were", "wasn't", "weren't"],
    pairs: ["was /w\u0259z/ (weak)", "WAS (strong)", "were / weren't"],
  },
  {
    id: "s1-u2-ed-endings",
    stage: "s1",
    unit: 2,
    sound: "-ed: /t/ \u00b7 /d/ \u00b7 /\u026ad/",
    titleEn: "The three past -ed endings",
    titleAr: "\u0646\u0647\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u0627\u0636\u064a \u0627\u0644\u062a\u0644\u0627\u062a\u0629",
    cueEn: "/t/ after a voiceless sound (worked), /d/ after a voiced sound (played), /\u026ad/ only after t or d (wanted) \u2014 that one adds a syllable.",
    cueAr: "/t/ \u0628\u0639\u062f \u0635\u0648\u062a \u0645\u0647\u0645\u0648\u0633 (worked)\u060c /d/ \u0628\u0639\u062f \u0635\u0648\u062a \u0645\u062c\u0647\u0648\u0631 (played)\u060c /\u026ad/ \u0628\u0633 \u0628\u0639\u062f t \u0623\u0648 d (wanted) \u2014 \u062f\u064a \u0628\u062a\u0632\u0648\u062f \u0645\u0642\u0637\u0639.",
    phrase: "I worked, played, and waited.",
    words: ["worked", "played", "wanted", "watched", "needed"],
    pairs: ["worked /t/", "played /d/", "wanted /\u026ad/"],
    signature: true,
  },
  {
    id: "s1-u3-irregular-did",
    stage: "s1",
    unit: 3,
    sound: "irregular pasts + didn't",
    titleEn: "Clear irregulars, crisp \u201cdidn't\u201d",
    titleAr: "\u0623\u0641\u0639\u0627\u0644 \u0634\u0627\u0630\u0629 \u0648\u0627\u0636\u062d\u0629 \u0648 didn't \u0645\u0636\u0628\u0648\u0637\u0629",
    cueEn: "Say the irregular vowels fully (went, saw, ate, bought). \u201cdid\u201d is weak, but \u201cdidn't\u201d needs a clear final /t/.",
    cueAr: "\u0627\u0646\u0637\u0642 \u062d\u0631\u0648\u0641 \u0627\u0644\u0639\u0644\u0629 \u0641\u064a \u0627\u0644\u0634\u0627\u0630 \u0643\u0627\u0645\u0644\u0629 (went, saw, ate, bought). \u201cdid\u201d \u062e\u0641\u064a\u0641\u0629\u060c \u0644\u0643\u0646 \u201cdidn't\u201d \u0644\u0627\u0632\u0645 \u062a\u0642\u0641\u0644 \u0628\u0640 /t/ \u0648\u0627\u0636\u062d\u0629.",
    phrase: "I went and saw a lot, but I didn't stay.",
    words: ["went", "saw", "ate", "bought", "didn't"],
    pairs: ["did /d\u026ad/ (weak)", "didn't (clear /t/)"],
  },
  {
    id: "s1-u4-going-to",
    stage: "s1",
    unit: 4,
    sound: "going to \u2192 gonna",
    titleEn: "\u201cgoing to\u201d in natural speech",
    titleAr: "\u201cgoing to\u201d \u0641\u064a \u0627\u0644\u0643\u0644\u0627\u0645 \u0627\u0644\u0637\u0628\u064a\u0639\u064a",
    cueEn: "Native speakers link \u201cgoing to\u201d into /\u0261\u0259n\u0259/. You should recognise \u201cgonna\u201d even if you say the full form. Stress the main verb after it.",
    cueAr: "\u0627\u0644\u0645\u062a\u062d\u062f\u062b\u064a\u0646 \u0628\u064a\u0648\u0635\u0644\u0648\u0627 \u201cgoing to\u201d \u0644\u0640 /\u0261\u0259n\u0259/. \u0627\u0644\u0645\u0647\u0645 \u062a\u0641\u0647\u0645 \u201cgonna\u201d \u062d\u062a\u0649 \u0644\u0648 \u0628\u062a\u0642\u0648\u0644 \u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0643\u0627\u0645\u0644. \u0648\u0627\u0636\u063a\u0637 \u0627\u0644\u0641\u0639\u0644 \u0628\u0639\u062f\u0647\u0627.",
    phrase: "I'm going to call you tomorrow.",
    words: ["going to", "gonna", "I'm going", "plan"],
    pairs: ["going to (careful)", "gonna (natural)"],
  },
  {
    id: "s1-u5-than",
    stage: "s1",
    unit: 5,
    sound: "/\u00f0/ in \u201cthan\u201d + adjective stress",
    titleEn: "\u201cthan\u201d and long-adjective stress",
    titleAr: "\u201cthan\u201d \u0648\u0646\u0628\u0631\u0629 \u0627\u0644\u0635\u0641\u0627\u062a \u0627\u0644\u0637\u0648\u064a\u0644\u0629",
    cueEn: "\u201cthan\u201d starts with voiced /\u00f0/, tongue between the teeth. In long adjectives, keep the stress inside the word: more ex\u2011PEN\u2011sive, not MORE expensive.",
    cueAr: "\u201cthan\u201d \u0628\u062a\u0628\u062f\u0623 \u0628\u0640 /\u00f0/ \u0645\u062c\u0647\u0648\u0631\u0629\u060c \u0627\u0644\u0644\u0633\u0627\u0646 \u0628\u064a\u0646 \u0627\u0644\u0633\u0646\u0627\u0646. \u0648\u0641\u064a \u0627\u0644\u0635\u0641\u0627\u062a \u0627\u0644\u0637\u0648\u064a\u0644\u0629 \u062e\u0644\u064a \u0627\u0644\u0646\u0628\u0631\u0629 \u062c\u0648\u0651\u0627 \u0627\u0644\u0643\u0644\u0645\u0629.",
    phrase: "This one is more expensive than the other.",
    words: ["than", "the", "expensive", "comfortable", "better"],
    pairs: ["than /\u00f0/", "then /\u00f0/", "thing /\u03b8/"],
  },
  {
    id: "s1-u6-clusters-could",
    stage: "s1",
    unit: 6,
    sound: "food clusters + silent l",
    titleEn: "Food clusters and silent \u201cl\u201d",
    titleAr: "\u062a\u062c\u0645\u0639\u0627\u062a \u0627\u0644\u0623\u0643\u0644 \u0648\u0627\u0644\u0640 l \u0627\u0644\u0635\u0627\u0645\u062a\u0629",
    cueEn: "Glide through clusters without an extra vowel (breakfast, vegetables). The \u201cl\u201d in could/would/should is silent.",
    cueAr: "\u0639\u062f\u0651\u064a \u0639\u0644\u0649 \u0627\u0644\u062a\u062c\u0645\u0639\u0627\u062a \u0645\u0646 \u063a\u064a\u0631 \u062d\u0631\u0641 \u0639\u0644\u0629 \u0632\u064a\u0627\u062f\u0629 (breakfast, vegetables). \u0648\u0627\u0644\u0640 l \u0641\u064a could/would/should \u0635\u0627\u0645\u062a\u0629.",
    phrase: "Could I have breakfast and some vegetables?",
    words: ["breakfast", "vegetables", "could", "street"],
    pairs: ["could (silent l)", "would (silent l)"],
  },
  {
    id: "s1-u7-th-health",
    stage: "s1",
    unit: 7,
    sound: "/\u03b8/ and /\u00f0/ (health words)",
    titleEn: "\u201cth\u201d in health words",
    titleAr: "\u0627\u0644\u0640 \u201cth\u201d \u0641\u064a \u0643\u0644\u0645\u0627\u062a \u0627\u0644\u0635\u062d\u0629",
    cueEn: "Tongue tip between the teeth. /\u03b8/ no voice (throat, teeth, health), /\u00f0/ with voice (breathe). Don't turn /\u03b8/ into /s/.",
    cueAr: "\u0637\u0631\u0641 \u0627\u0644\u0644\u0633\u0627\u0646 \u0628\u064a\u0646 \u0627\u0644\u0633\u0646\u0627\u0646. /\u03b8/ \u0645\u0646 \u063a\u064a\u0631 \u0635\u0648\u062a (throat, teeth, health)\u060c /\u00f0/ \u0628\u0635\u0648\u062a (breathe). \u0645\u0627\u062a\u062d\u0648\u0651\u0644\u0634 /\u03b8/ \u0644\u0640 /s/.",
    phrase: "My throat and teeth hurt, and I can't breathe well.",
    words: ["throat", "teeth", "health", "breathe", "should"],
    pairs: ["throat /\u03b8/", "breathe /\u00f0/", "think / sink"],
  },
  {
    id: "s1-u8-can-cant",
    stage: "s1",
    unit: 8,
    sound: "can /k\u0259n/ vs can't /k\u00e6nt/",
    titleEn: "\u201ccan\u201d vs \u201ccan't\u201d (meaning-changing)",
    titleAr: "\u201ccan\u201d \u0648 \u201ccan't\u201d (\u0628\u062a\u063a\u064a\u0651\u0631 \u0627\u0644\u0645\u0639\u0646\u0649)",
    cueEn: "\u201ccan\u201d is weak (/k\u0259n/). \u201ccan't\u201d has a fuller vowel AND a real final /t/. Drop that /t/ and the listener hears the opposite meaning.",
    cueAr: "\u201ccan\u201d \u062e\u0641\u064a\u0641\u0629 (/k\u0259n/). \u201ccan't\u201d \u0641\u064a\u0647\u0627 \u062d\u0631\u0643\u0629 \u0623\u0648\u0636\u062d \u0648\u062a\u0627\u0621 \u0641\u064a \u0627\u0644\u0622\u062e\u0631. \u0644\u0648 \u0648\u0642\u0639\u062a \u0627\u0644\u062a\u0627\u0621\u060c \u0627\u0644\u0644\u064a \u0642\u0635\u0627\u062f\u0643 \u064a\u0633\u0645\u0639 \u0627\u0644\u0639\u0643\u0633.",
    phrase: "I can go on Monday, but I can't go on Tuesday.",
    words: ["can", "can't", "get off at", "could you"],
    pairs: ["can /k\u0259n/", "can't /k\u00e6nt/"],
    signature: true,
  },
  {
    id: "s1-u9-ing",
    stage: "s1",
    unit: 9,
    sound: "/\u014b/ (the -ing ending)",
    titleEn: "The -ing ending",
    titleAr: "\u0646\u0647\u0627\u064a\u0629 \u0627\u0644\u0640 -ing",
    cueEn: "Back of the tongue up, nasal, and freeze \u2014 no hard /g/. Not \u201cworkingg\u201d. Let feeling ride on your pitch, not on extra words.",
    cueAr: "\u0622\u062e\u0631 \u0627\u0644\u0644\u0633\u0627\u0646 \u0644\u0641\u0648\u0642\u060c \u0635\u0648\u062a \u0645\u0646 \u0627\u0644\u0645\u0646\u0627\u062e\u064a\u0631\u060c \u0648\u062c\u0645\u0651\u062f \u2014 \u0645\u0646 \u063a\u064a\u0631 /g/ \u0642\u0648\u064a\u0629. \u0648\u062e\u0644\u064a \u0627\u0644\u0625\u062d\u0633\u0627\u0633 \u064a\u0637\u0644\u0639 \u0645\u0646 \u0646\u0628\u0631\u0629 \u0635\u0648\u062a\u0643.",
    phrase: "I'm working and studying these days.",
    words: ["working", "studying", "going", "doing"],
    pairs: ["thin / thing", "sin / sing"],
  },
  {
    id: "s1-u10-ed-clinic",
    stage: "s1",
    unit: 10,
    sound: "-ed endings (clinic recap)",
    titleEn: "The -ed clinic recap",
    titleAr: "\u0645\u0631\u0627\u062c\u0639\u0629 \u0639\u064a\u0627\u062f\u0629 \u0627\u0644\u0640 -ed",
    cueEn: "Under speed, the ending disappears first. Keep all three alive: walked /t/, arrived /d/, decided /\u026ad/ (extra syllable).",
    cueAr: "\u0648\u0642\u062a \u0627\u0644\u0633\u0631\u0639\u0629\u060c \u0623\u0648\u0644 \u062d\u0627\u062c\u0629 \u0628\u062a\u0636\u064a\u0639 \u0647\u064a \u0627\u0644\u0646\u0647\u0627\u064a\u0629. \u062e\u0644\u064a \u0627\u0644\u062a\u0644\u0627\u062a\u0629 \u0648\u0627\u0636\u062d\u064a\u0646: walked /t/\u060c arrived /d/\u060c decided /\u026ad/.",
    phrase: "We walked, arrived, and stayed until it finished.",
    words: ["walked", "arrived", "stayed", "decided", "finished"],
    pairs: ["walked /t/", "stayed /d/", "decided /\u026ad/"],
  },
];

export const ACCENT_DRILLS: AccentDrill[] = [...STAGE0_ACCENT_DRILLS, ...STAGE1_ACCENT_DRILLS];

export const ACCENT_DRILL_IDS = ACCENT_DRILLS.map((d) => d.id);

export function getStageAccentDrills(stageId: "s0" | "s1"): AccentDrill[] {
  return ACCENT_DRILLS.filter((d) => d.stage === stageId);
}

export function getAccentDrill(id: string): AccentDrill | null {
  return ACCENT_DRILLS.find((d) => d.id === id) ?? null;
}
