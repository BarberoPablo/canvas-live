"use client";

import { Editor, Tldraw } from "@tldraw/tldraw";
import { useRef } from "react";
import "tldraw/tldraw.css";

export default function CanvasEditor() {
  const editorRef = useRef<Editor | null>(null);

  const handleMount = (editor: Editor) => {
    centerCamera(editor);
  };

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        persistenceKey="canvas-history"
        onMount={(editor) => {
          editorRef.current = editor;
          handleMount(editor);
        }}
      />
    </div>
  );
}

const centerCamera = (editor: Editor) => {
  editor.selectAll();

  editor.zoomToSelection({
    animation: { duration: 1000 },
  });
};
