import CanvasEditor from "../../components/tldraw/CanvasEditor";

interface CanvasPageProps {
  params: Promise<{ id: string }>;
}

export default async function CanvasPage({ params }: CanvasPageProps) {
  const { id } = await params;

  return (
    <div>
      <CanvasEditor canvasId={id} />
    </div>
  );
}
