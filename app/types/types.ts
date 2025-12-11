import { TLEditorSnapshot } from "@tldraw/tldraw";

export type Canvas = {
  id: string;
  ownerId: string | null;
  snapshot: TLEditorSnapshot | null;
  createdAt: string;
  updatedAt: string;
};
