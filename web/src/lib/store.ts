import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

// Lean JSON file store on the mounted volume (no DB engine — right-sized for a 15–30 cohort).
const DATA_DIR = process.env.DATA_DIR || "/data";

async function readJson<T>(name: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(join(DATA_DIR, name), "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(name: string, data: unknown): Promise<void> {
  const file = join(DATA_DIR, name);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2));
}

export type UserRole = "student" | "teacher";

export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  level: string;
  createdAt: string;
  /**
   * Absent on every account created before roles existed, which is why it is
   * optional and why `isTeacher` treats absence as "student". Grant it
   * deliberately — it unlocks the Teacher's Edition, answer keys and all.
   */
  role?: UserRole;
  /**
   * Explicit stage entitlement (e.g. ["s1"]). Optional and additive: a stage a
   * student has been granted is open regardless of prior-stage completion — the
   * placement path from the curriculum ("A1 achieved OR placement"). Absent on
   * legacy accounts; access then falls back to prior-stage completion. Stage 0
   * is always open and never needs listing here.
   */
  availableStages?: string[];
};

/** Fails closed: anything that is not explicitly a teacher is treated as a student. */
export function isTeacher(user: Pick<User, "role"> | null | undefined): boolean {
  return user?.role === "teacher";
}

// userId -> list of completed lesson ids
export type Progress = Record<string, string[]>;

export async function getUsers(): Promise<User[]> {
  return readJson<User[]>("users.json", []);
}
export async function saveUsers(users: User[]): Promise<void> {
  return writeJson("users.json", users);
}
export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}
export async function findUserById(id: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function getProgress(): Promise<Progress> {
  return readJson<Progress>("progress.json", {});
}
export async function saveProgress(p: Progress): Promise<void> {
  return writeJson("progress.json", p);
}
export async function getUserProgress(userId: string): Promise<string[]> {
  return (await getProgress())[userId] ?? [];
}

// Per-unit formative quiz results.
export type QuizResult = { best: number; total: number; lastScore: number; attempts: number; at: string };
// userId -> quizKey -> result. Stage 0 uses "u0".."u10"; other stages are
// stage-qualified ("s1-u1"..) so results never collide across stages.
export type QuizResults = Record<string, Record<string, QuizResult>>;

export async function getQuizResults(): Promise<QuizResults> {
  return readJson<QuizResults>("quiz-results.json", {});
}
export async function saveQuizResults(q: QuizResults): Promise<void> {
  return writeJson("quiz-results.json", q);
}
export async function getUserQuizResults(userId: string): Promise<Record<string, QuizResult>> {
  return (await getQuizResults())[userId] ?? {};
}

// Accent Lab: which record-and-compare drills a learner has marked as practiced.
// userId -> list of drill ids
export type AccentPractice = Record<string, string[]>;

export async function getAccentPractice(): Promise<AccentPractice> {
  return readJson<AccentPractice>("accent-practice.json", {});
}
export async function saveAccentPractice(a: AccentPractice): Promise<void> {
  return writeJson("accent-practice.json", a);
}
export async function getUserAccentPractice(userId: string): Promise<string[]> {
  return (await getAccentPractice())[userId] ?? [];
}
