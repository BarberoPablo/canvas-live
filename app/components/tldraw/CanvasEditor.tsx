"use client";

import { loadDocument, saveDocument } from "@/app/actions/canvas";
import { createTLStore, getSnapshot, loadSnapshot, Tldraw, TLStore, useEditor } from "@tldraw/tldraw";
import { useEffect, useState } from "react";
import "tldraw/tldraw.css";

interface Props {
  canvasId: string;
}

export default function CanvasEditor({ canvasId }: Props) {
  const [store, setStore] = useState<TLStore | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const document = await loadDocument(canvasId);
        const newStore = createTLStore();
        if (document) {
          loadSnapshot(newStore, { document });
        }
        if (mounted) setStore(newStore);
      } catch (err) {
        console.error("Failed to load document:", err);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [canvasId]);

  if (!store) return null; // or a loader

  return (
    <>
      <div style={{ position: "fixed", inset: 0 }}>
        {/* SaveButton must be a child of Tldraw so useEditor() works */}
        <Tldraw store={store}>
          <SaveButton canvasId={canvasId} />
        </Tldraw>
      </div>
    </>
  );
}

/* SaveButton must run inside Tldraw context */
function SaveButton({ canvasId }: { canvasId: string }) {
  const editor = useEditor();

  const handleSave = async () => {
    try {
      const { document } = getSnapshot(editor.store);
      await saveDocument(canvasId, document);
      console.log("Saved!");
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <button onClick={handleSave} className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-2 rounded">
      Save
    </button>
  );
}
