import Link from "next/link";
import { STAGES, getStageLessonIds, type StageId } from "@/lib/lessons";
import { prerequisiteStage } from "@/lib/access";
import { stageNav } from "@/lib/portal-nav";
import { Section } from "@/components/ui";

/**
 * Shown instead of a stage's content when the learner has not unlocked it.
 * Explains the entry requirement and points back to the prerequisite stage.
 */
export default function StageLocked({
  locale,
  stageId,
  doneLessonIds,
}: {
  locale: string;
  stageId: StageId;
  doneLessonIds: string[];
}) {
  const ar = locale === "ar";
  const stage = STAGES[stageId];
  const prereqId = prerequisiteStage(stageId);
  const prereq = prereqId ? STAGES[prereqId] : null;

  const prereqIds = prereqId ? getStageLessonIds(prereqId) : [];
  const done = new Set(doneLessonIds);
  const prereqDone = prereqIds.filter((id) => done.has(id)).length;

  return (
    <Section className="py-10 sm:py-14">
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(STAGES) as StageId[]).map((sid) => (
          <Link
            key={sid}
            href={stageNav(locale, sid).dashboard}
            className={
              sid === stageId
                ? "rounded-full bg-royal-900 px-4 py-1.5 text-sm font-semibold text-white"
                : "rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-royal-700 ring-1 ring-royal-200 hover:bg-royal-50"
            }
          >
            Stage {STAGES[sid].num} · {STAGES[sid].rank}
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-8 text-center ring-1 ring-royal-100">
        <div className="text-4xl">🔒</div>
        <h1 className="mt-3 text-2xl font-extrabold text-royal-900">
          {ar ? `المرحلة ${stage.num} مقفولة` : `Stage ${stage.num} is locked`}
        </h1>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-royal-500">
          Stage {stage.num} — {stage.title} · CEFR {stage.cefr}
        </p>

        {prereq ? (
          <>
            <p className="mx-auto mt-4 max-w-xl text-ink/70">
              {ar
                ? `عشان تفتح المرحلة دي، لازم تخلّص Stage ${prereq.num} (${prereq.title}) الأول، أو يكون معاك تصريح دخول من المدرّس.`
                : `To unlock this stage, finish Stage ${prereq.num} (${prereq.title}) first — or ask your teacher to grant access (placement).`}
            </p>
            <p className="mt-3 text-sm text-ink/60">
              {ar ? "تقدّمك في" : "Your progress in"} Stage {prereq.num}: {prereqDone}/{prereqIds.length}
            </p>
            <Link
              href={stageNav(locale, prereq.id).dashboard}
              className="mt-6 inline-block rounded-lg bg-royal-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-royal-800"
            >
              {ar ? `اذهب إلى Stage ${prereq.num}` : `Go to Stage ${prereq.num}`}
            </Link>
          </>
        ) : (
          <p className="mx-auto mt-4 max-w-xl text-ink/70">
            {ar ? "المرحلة دي مش متاحة لحسابك دلوقتي." : "This stage is not available on your account yet."}
          </p>
        )}
      </div>
    </Section>
  );
}
