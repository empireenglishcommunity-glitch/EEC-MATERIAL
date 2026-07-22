// Accent Lab — Stage-0 record-and-compare drills.
// Source of truth: curriculum/03-accent-lab-syllabus.md (cards C1–C9, V1).
// Honesty guardrail (GC-5): target = clear, confident, neutral American accent + high
// intelligibility. Native-like is an aspirational ceiling, never a promise.

export type AccentDrill = {
  id: string;
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

export const ACCENT_DRILLS: AccentDrill[] = [
  {
    id: "c1-p-b",
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

export const ACCENT_DRILL_IDS = ACCENT_DRILLS.map((d) => d.id);

export function getAccentDrill(id: string): AccentDrill | null {
  return ACCENT_DRILLS.find((d) => d.id === id) ?? null;
}
