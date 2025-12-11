"use client";

import { createCanvas } from "@/app/actions/canvas";
import { Canvas } from "@/app/types/types";
import { useRouter } from "next/navigation";

interface CanvaseMenuProps {
  canvases: Omit<Canvas, "snapshot">[];
}

export default function CanvasMenu({ canvases }: CanvaseMenuProps) {
  const router = useRouter();

  const handleCreateCanvas = async () => {
    try {
      const id = await createCanvas();
      router.push(`/canvas/${id}`);
    } catch (error) {
      console.error("Failed to create canvas:", error);
    }
  };

  const handleLoadCanvas = (id: string) => {
    router.push(`/canvas/${id}`);
  };

  return (
    <div>
      <ul>
        <h2>All Canvases</h2>
        {canvases.map((canvas) => (
          <li key={canvas.id}>
            <button className="cursor-pointer" onClick={() => handleLoadCanvas(canvas.id)}>
              Load Canvas {canvas.id}
            </button>
          </li>
        ))}
      </ul>

      <button className="cursor-pointer" onClick={handleCreateCanvas}>
        New Canvas
      </button>
    </div>
  );
}
