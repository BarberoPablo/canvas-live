"use client";

import { Editor, Tldraw, toRichText } from "@tldraw/tldraw";
import { useRef } from "react";
import "tldraw/tldraw.css";

export default function CanvasEditor() {
  const editorRef = useRef<Editor | null>(null);

  const handleMount = (editor: Editor) => {
    editor.createShape({
      type: "text",
      x: 200,
      y: 200,
      props: {
        richText: toRichText("Hello world!"),
      },
    });

    editor.selectAll();

    editor.zoomToSelection({
      animation: { duration: 5000 },
    });
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
