"use client";

import { useEffect, useRef, useState } from "react";

type Labels = {
  playModel: string;
  record: string;
  stop: string;
  playYours: string;
  recording: string;
  compareHint: string;
  markPracticed: string;
  practiced: string;
  noSupport: string;
  micDenied: string;
  modelNote: string;
};

export default function AccentRecorder({
  drillId,
  phrase,
  initialPracticed,
  labels,
}: {
  drillId: string;
  phrase: string;
  initialPracticed: boolean;
  labels: Labels;
}) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [practiced, setPracticed] = useState(initialPracticed);
  const [error, setError] = useState<string | null>(null);
  const [canRecord, setCanRecord] = useState(true);
  const [canSpeak, setCanSpeak] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanRecord(!!navigator.mediaDevices && typeof window.MediaRecorder !== "undefined");
      setCanSpeak("speechSynthesis" in window);
    }
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function playModel() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(phrase);
    u.lang = "en-US";
    u.rate = 0.9;
    const enVoice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("en-US"));
    if (enVoice) u.voice = enVoice;
    window.speechSynthesis.speak(u);
  }

  async function startRecording() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || "audio/webm" });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setRecording(true);
    } catch {
      setError(labels.micDenied);
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  async function togglePracticed() {
    const next = !practiced;
    setPracticed(next);
    try {
      const res = await fetch("/api/accent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drillId, practiced: next }),
      });
      if (!res.ok) setPracticed(!next);
    } catch {
      setPracticed(!next);
    }
  }

  return (
    <div className="mt-4 rounded-xl bg-royal-50 p-4">
      <div className="flex flex-wrap items-center gap-3">
        {canSpeak ? (
          <button
            type="button"
            onClick={playModel}
            className="inline-flex items-center gap-2 rounded-lg bg-royal-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-royal-800"
          >
            ▶ {labels.playModel}
          </button>
        ) : (
          <span className="text-xs text-ink/50">{labels.noSupport}</span>
        )}

        {canRecord &&
          (!recording ? (
            <button
              type="button"
              onClick={startRecording}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              ● {labels.record}
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="inline-flex animate-pulse items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white"
            >
              ■ {labels.stop} ({labels.recording})
            </button>
          ))}

        {audioUrl && (
          <audio controls src={audioUrl} className="h-9">
            {labels.playYours}
          </audio>
        )}

        <button
          type="button"
          onClick={togglePracticed}
          className={
            practiced
              ? "ms-auto inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
              : "ms-auto inline-flex items-center gap-2 rounded-lg border border-royal-300 px-4 py-2 text-sm font-semibold text-royal-700 hover:bg-royal-100"
          }
        >
          {practiced ? `✓ ${labels.practiced}` : labels.markPracticed}
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      <p className="mt-2 text-xs text-ink/50">
        {audioUrl ? labels.compareHint : labels.modelNote}
      </p>
    </div>
  );
}
