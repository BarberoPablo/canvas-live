"use client";

import { loadSnapshot, saveSnapshot } from "@/app/actions/canvas";
import { Json } from "@/database.types";
import { Editor, Tldraw, TLEditorSnapshot } from "@tldraw/tldraw";
import { useEffect, useRef, useState } from "react";

import "tldraw/tldraw.css";

interface Props {
  canvasId: string;
}

export default function CanvasEditor({ canvasId }: Props) {
  const editorRef = useRef<Editor | null>(null);
  const [initialSnapshot, setInitialSnapshot] = useState<TLEditorSnapshot | Json | null>(null);

  // 1) Fetch snapshot BEFORE mounting tldraw
  useEffect(() => {
    const fetchData = async () => {
      const snap = await loadSnapshot(canvasId);
      setInitialSnapshot(snap ?? null);
    };
    fetchData();
  }, [canvasId]);

  // 2) When tldraw mounts, load the snapshot if present
  const handleMount = (editor: Editor) => {
    editorRef.current = editor;

    if (initialSnapshot) {
      editor.loadSnapshot(initialSnapshot as TLEditorSnapshot);
    }

    // center camera
    try {
      editor.zoomToFit();
    } catch {}
  };

  // 3) Manual save only
  const handleManualSave = async () => {
    const snap = editorRef.current?.getSnapshot();
    if (!snap) return;

    try {
      await saveSnapshot(canvasId, snap);
      console.log("Saved!");
    } catch (err) {
      console.error("Manual save failed:", err);
    }
  };

  return (
    <>
      <div style={{ position: "fixed", inset: 0 }}>
        {/* DO NOT render until snapshot is loaded */}
        {initialSnapshot !== undefined && <Tldraw onMount={handleMount} />}
      </div>

      <button onClick={handleManualSave} className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-2 rounded">
        Save
      </button>
    </>
  );
}
