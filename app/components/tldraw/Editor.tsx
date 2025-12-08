"use client";

import { Editor as EditorT, Tldraw } from "@tldraw/tldraw";
import { useRef } from "react";
import "tldraw/tldraw.css";

export default function Editor() {
  const editorRef = useRef<EditorT | null>(null);

  const snapshot = editorRef.current?.store.serialize();
  console.log(snapshot);

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        persistenceKey="canvas-history"
        onMount={(editor) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
}
