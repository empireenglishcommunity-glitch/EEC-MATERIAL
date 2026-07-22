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

export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  level: string;
  createdAt: string;
};

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
// userId -> unitKey ("u0".."u10") -> result
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
