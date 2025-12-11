import { getAllCanvases } from "../actions/canvas";
import CanvasMenu from "./components/CanvasMenu";

export default async function CanvasMenuWrapper() {
  const canvases = await getAllCanvases();

  return <CanvasMenu canvases={canvases} />;
}
