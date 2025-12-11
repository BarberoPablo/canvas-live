"use server";

import { createClient } from "@/utils/supabase/server";
import type { TLStoreSnapshot } from "@tldraw/tldraw";
import { revalidatePath } from "next/cache";
import { Json } from "../../database.types";
import { Canvas } from "../types/types";

export async function createCanvas() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("canvases").insert({}).select("id").single();

  if (error) {
    console.error("createCanvas error:", error);
    throw new Error("Failed to create canvas");
  }

  revalidatePath("/canvas");
  return data.id;
}

export async function saveDocument(id: string, document: TLStoreSnapshot) {
  const supabase = await createClient();

  // Sanitize to avoid non serializable objects
  const cleanDocument = JSON.parse(JSON.stringify(document));

  const { data, error } = await supabase
    .from("canvases")
    .update({
      snapshot: cleanDocument as Json,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id");

  if (error) {
    console.error("saveCanvas error:", error);
    throw new Error(error.message);
  }

  if (data.length === 0) {
    throw new Error(`Canvas with id ${id} does not exist.`);
  }
}

export async function loadDocument(id: string): Promise<TLStoreSnapshot> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("canvases").select("snapshot").eq("id", id).maybeSingle();

  if (error) {
    console.error("loadCanvas error:", error);
    throw new Error(error.message);
  }

  return (data?.snapshot as unknown as TLStoreSnapshot) ?? null;
}

export async function getCanvas(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("canvases").select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error("getCanvas error:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function getAllCanvases(): Promise<Omit<Canvas, "snapshot">[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("canvases").select("id, owner_id, created_at, updated_at");

  if (error) {
    console.error("getCanvas error:", error);
    throw new Error(error.message);
  }

  const parsedData = data.map(({ id, owner_id, created_at, updated_at }) => ({
    id,
    ownerId: owner_id,
    createdAt: created_at,
    updatedAt: updated_at ?? created_at,
  }));

  return parsedData;
}

/* 
export SUPABASE_ACCESS_TOKEN=sbp_0ffc330fd81b0882366b988831e078074d9ac3fd
npx supabase gen types typescript --project-id jgxtzfunkmwbbzewjjcl > database.types.ts
*/
/* {"store":{"page:page":{"id":"page:page","meta":{},"name":"Page 1","index":"a1","typeName":"page"},"document:document":{"id":"document:document","meta":{},"name":"","gridSize":10,"typeName":"document"},"shape:42gpgk_8VP-SscHHiF_nY":{"x":575,"y":233,"id":"shape:42gpgk_8VP-SscHHiF_nY","meta":{},"type":"draw","index":"a3glz4rG","props":{"dash":"draw","fill":"none","size":"m","color":"black","isPen":false,"scale":1,"isClosed":false,"segments":[{"type":"free","points":[{"x":0,"y":0,"z":0.5},{"x":0,"y":1,"z":0.5},{"x":1,"y":2,"z":0.5},{"x":2,"y":3,"z":0.5},{"x":2,"y":4,"z":0.5},{"x":3,"y":4,"z":0.5},{"x":3,"y":5,"z":0.5},{"x":4,"y":6,"z":0.5},{"x":4,"y":7,"z":0.5},{"x":5,"y":8,"z":0.5},{"x":6,"y":8,"z":0.5},{"x":6,"y":9,"z":0.5},{"x":6,"y":10,"z":0.5},{"x":7,"y":10,"z":0.5},{"x":7,"y":11,"z":0.5},{"x":8,"y":11,"z":0.5},{"x":9,"y":13,"z":0.5},{"x":10,"y":13,"z":0.5},{"x":10,"y":14,"z":0.5},{"x":11,"y":15,"z":0.5},{"x":12,"y":16,"z":0.5},{"x":12,"y":17,"z":0.5},{"x":13,"y":17,"z":0.5},{"x":13,"y":18,"z":0.5},{"x":14,"y":19,"z":0.5},{"x":14,"y":20,"z":0.5},{"x":15,"y":20,"z":0.5},{"x":16,"y":21,"z":0.5},{"x":17,"y":22,"z":0.5},{"x":17,"y":23,"z":0.5},{"x":18,"y":23,"z":0.5},{"x":19,"y":24,"z":0.5},{"x":19,"y":25,"z":0.5},{"x":20,"y":25,"z":0.5},{"x":20,"y":26,"z":0.5},{"x":21,"y":27,"z":0.5},{"x":22,"y":28,"z":0.5},{"x":23,"y":28,"z":0.5},{"x":23,"y":29,"z":0.5},{"x":24,"y":30,"z":0.5},{"x":25,"y":31,"z":0.5},{"x":26,"y":32,"z":0.5},{"x":27,"y":32,"z":0.5},{"x":27,"y":33,"z":0.5},{"x":28,"y":33,"z":0.5},{"x":28,"y":34,"z":0.5},{"x":29,"y":34,"z":0.5},{"x":29,"y":35,"z":0.5},{"x":30,"y":35,"z":0.5},{"x":31,"y":35,"z":0.5},{"x":31,"y":36,"z":0.5},{"x":32,"y":36,"z":0.5},{"x":32,"y":35,"z":0.5},{"x":32,"y":34,"z":0.5},{"x":33,"y":34,"z":0.5},{"x":33,"y":33,"z":0.5},{"x":33,"y":32,"z":0.5},{"x":34,"y":31,"z":0.5},{"x":35,"y":29,"z":0.5},{"x":35,"y":28,"z":0.5},{"x":36,"y":28,"z":0.5},{"x":36,"y":27,"z":0.5},{"x":36,"y":26,"z":0.5},{"x":37,"y":25,"z":0.5},{"x":37,"y":24,"z":0.5},{"x":38,"y":23,"z":0.5},{"x":39,"y":22,"z":0.5},{"x":39,"y":21,"z":0.5},{"x":39,"y":20,"z":0.5},{"x":40,"y":20,"z":0.5},{"x":40,"y":19,"z":0.5},{"x":40,"y":18,"z":0.5},{"x":41,"y":17,"z":0.5},{"x":42,"y":16,"z":0.5},{"x":42,"y":15,"z":0.5},{"x":42,"y":14,"z":0.5},{"x":42,"y":13,"z":0.5},{"x":43,"y":13,"z":0.5},{"x":43,"y":12,"z":0.5},{"x":43,"y":11,"z":0.5},{"x":43,"y":12,"z":0.5},{"x":43,"y":13,"z":0.5},{"x":42,"y":14,"z":0.5},{"x":42,"y":15,"z":0.5},{"x":41,"y":16,"z":0.5},{"x":41,"y":17,"z":0.5},{"x":41,"y":18,"z":0.5},{"x":40,"y":18,"z":0.5},{"x":40,"y":19,"z":0.5},{"x":39,"y":20,"z":0.5},{"x":39,"y":21,"z":0.5},{"x":39,"y":23,"z":0.5},{"x":38,"y":24,"z":0.5},{"x":38,"y":25,"z":0.5},{"x":38,"y":26,"z":0.5},{"x":37,"y":27,"z":0.5},{"x":36,"y":29,"z":0.5},{"x":36,"y":30,"z":0.5},{"x":35,"y":32,"z":0.5},{"x":34,"y":33,"z":0.5},{"x":34,"y":34,"z":0.5},{"x":34,"y":35,"z":0.5},{"x":33,"y":36,"z":0.5},{"x":32,"y":38,"z":0.5},{"x":32,"y":39,"z":0.5},{"x":32,"y":40,"z":0.5},{"x":31,"y":42,"z":0.5},{"x":30,"y":43,"z":0.5},{"x":30,"y":44,"z":0.5},{"x":29,"y":46,"z":0.5},{"x":29,"y":47,"z":0.5},{"x":28,"y":48,"z":0.5},{"x":28,"y":50,"z":0.5},{"x":27,"y":50,"z":0.5},{"x":26,"y":52,"z":0.5},{"x":26,"y":53,"z":0.5},{"x":26,"y":54,"z":0.5},{"x":25,"y":56,"z":0.5},{"x":24,"y":57,"z":0.5},{"x":24,"y":59,"z":0.5},{"x":23,"y":60,"z":0.5},{"x":22,"y":61,"z":0.5},{"x":22,"y":62,"z":0.5},{"x":21,"y":64,"z":0.5},{"x":20,"y":65,"z":0.5},{"x":20,"y":66,"z":0.5},{"x":20,"y":67,"z":0.5},{"x":19,"y":68,"z":0.5},{"x":19,"y":70,"z":0.5},{"x":18,"y":70,"z":0.5},{"x":18,"y":71,"z":0.5},{"x":17,"y":72,"z":0.5},{"x":17,"y":73,"z":0.5},{"x":16,"y":74,"z":0.5},{"x":16,"y":75,"z":0.5},{"x":16,"y":76,"z":0.5},{"x":15,"y":76,"z":0.5},{"x":15,"y":77,"z":0.5},{"x":15,"y":78,"z":0.5},{"x":14,"y":78,"z":0.5},{"x":13,"y":79,"z":0.5},{"x":13,"y":80,"z":0.5},{"x":12,"y":81,"z":0.5},{"x":12,"y":82,"z":0.5},{"x":11,"y":82,"z":0.5},{"x":11,"y":83,"z":0.5},{"x":10,"y":83,"z":0.5}]}],"isComplete":true},"opacity":1,"isLocked":false,"parentId":"page:page","rotation":0,"typeName":"shape"},"shape:Bzbku8Jy3mgwGFIgVcUwk":{"x":472,"y":237,"id":"shape:Bzbku8Jy3mgwGFIgVcUwk","meta":{},"type":"draw","index":"a2HWqmWV","props":{"dash":"draw","fill":"none","size":"m","color":"black","isPen":false,"scale":1,"isClosed":false,"segments":[{"type":"free","points":[{"x":0,"y":0,"z":0.5},{"x":0,"y":1,"z":0.5},{"x":0,"y":2,"z":0.5},{"x":0,"y":3,"z":0.5},{"x":0,"y":4,"z":0.5},{"x":0,"y":5,"z":0.5},{"x":0,"y":6,"z":0.5},{"x":0,"y":7,"z":0.5},{"x":0,"y":8,"z":0.5},{"x":0,"y":9,"z":0.5},{"x":-1,"y":9,"z":0.5},{"x":-1,"y":11,"z":0.5},{"x":-1,"y":12,"z":0.5},{"x":-1,"y":13,"z":0.5},{"x":-2,"y":14,"z":0.5},{"x":-2,"y":15,"z":0.5},{"x":-3,"y":16,"z":0.5},{"x":-3,"y":18,"z":0.5},{"x":-4,"y":18,"z":0.5},{"x":-4,"y":19,"z":0.5},{"x":-4,"y":20,"z":0.5},{"x":-4,"y":21,"z":0.5},{"x":-5,"y":23,"z":0.5},{"x":-6,"y":23,"z":0.5},{"x":-6,"y":24,"z":0.5},{"x":-6,"y":26,"z":0.5},{"x":-7,"y":27,"z":0.5},{"x":-8,"y":28,"z":0.5},{"x":-8,"y":30,"z":0.5},{"x":-9,"y":31,"z":0.5},{"x":-9,"y":32,"z":0.5},{"x":-10,"y":34,"z":0.5},{"x":-10,"y":35,"z":0.5},{"x":-11,"y":37,"z":0.5},{"x":-12,"y":39,"z":0.5},{"x":-12,"y":40,"z":0.5},{"x":-13,"y":41,"z":0.5},{"x":-14,"y":43,"z":0.5},{"x":-15,"y":45,"z":0.5},{"x":-15,"y":46,"z":0.5},{"x":-15,"y":48,"z":0.5},{"x":-16,"y":49,"z":0.5},{"x":-17,"y":51,"z":0.5},{"x":-17,"y":53,"z":0.5},{"x":-18,"y":54,"z":0.5},{"x":-19,"y":55,"z":0.5},{"x":-19,"y":57,"z":0.5},{"x":-20,"y":59,"z":0.5},{"x":-21,"y":60,"z":0.5},{"x":-22,"y":63,"z":0.5},{"x":-23,"y":65,"z":0.5},{"x":-24,"y":66,"z":0.5},{"x":-24,"y":67,"z":0.5},{"x":-24,"y":68,"z":0.5},{"x":-25,"y":69,"z":0.5},{"x":-26,"y":71,"z":0.5},{"x":-27,"y":73,"z":0.5}]}],"isComplete":true},"opacity":1,"isLocked":false,"parentId":"page:page","rotation":0,"typeName":"shape"},"shape:eTvau-jQfPDWlg6OF7YwL":{"x":407,"y":216,"id":"shape:eTvau-jQfPDWlg6OF7YwL","meta":{},"type":"draw","index":"a1z4vGUt","props":{"dash":"draw","fill":"none","size":"m","color":"black","isPen":false,"scale":1,"isClosed":false,"segments":[{"type":"free","points":[{"x":0,"y":0,"z":0.5},{"x":1,"y":0,"z":0.5},{"x":1,"y":-1,"z":0.5},{"x":2,"y":-1,"z":0.5},{"x":3,"y":-1,"z":0.5},{"x":4,"y":-1,"z":0.5},{"x":5,"y":-1,"z":0.5},{"x":6,"y":-1,"z":0.5},{"x":7,"y":-1,"z":0.5},{"x":8,"y":-1,"z":0.5},{"x":9,"y":-2,"z":0.5},{"x":10,"y":-2,"z":0.5},{"x":11,"y":-2,"z":0.5},{"x":12,"y":-2,"z":0.5},{"x":13,"y":-2,"z":0.5},{"x":14,"y":-2,"z":0.5},{"x":15,"y":-2,"z":0.5},{"x":16,"y":-2,"z":0.5},{"x":17,"y":-2,"z":0.5},{"x":18,"y":-2,"z":0.5},{"x":19,"y":-2,"z":0.5},{"x":20,"y":-2,"z":0.5},{"x":21,"y":-2,"z":0.5},{"x":22,"y":-2,"z":0.5},{"x":22,"y":-1,"z":0.5},{"x":23,"y":-1,"z":0.5},{"x":23,"y":0,"z":0.5},{"x":23,"y":1,"z":0.5},{"x":23,"y":2,"z":0.5},{"x":23,"y":3,"z":0.5},{"x":23,"y":4,"z":0.5},{"x":23,"y":5,"z":0.5},{"x":23,"y":6,"z":0.5},{"x":22,"y":7,"z":0.5},{"x":21,"y":7,"z":0.5},{"x":21,"y":8,"z":0.5},{"x":21,"y":9,"z":0.5},{"x":20,"y":9,"z":0.5},{"x":20,"y":10,"z":0.5},{"x":19,"y":11,"z":0.5},{"x":19,"y":12,"z":0.5},{"x":18,"y":12,"z":0.5},{"x":18,"y":13,"z":0.5},{"x":18,"y":14,"z":0.5},{"x":17,"y":14,"z":0.5},{"x":17,"y":15,"z":0.5},{"x":16,"y":16,"z":0.5},{"x":16,"y":17,"z":0.5},{"x":15,"y":17,"z":0.5},{"x":15,"y":18,"z":0.5},{"x":14,"y":19,"z":0.5},{"x":13,"y":20,"z":0.5},{"x":13,"y":21,"z":0.5},{"x":12,"y":21,"z":0.5},{"x":12,"y":22,"z":0.5},{"x":11,"y":23,"z":0.5},{"x":11,"y":24,"z":0.5},{"x":10,"y":25,"z":0.5},{"x":9,"y":25,"z":0.5},{"x":9,"y":26,"z":0.5},{"x":9,"y":27,"z":0.5},{"x":8,"y":27,"z":0.5},{"x":8,"y":28,"z":0.5},{"x":8,"y":29,"z":0.5},{"x":8,"y":30,"z":0.5},{"x":8,"y":31,"z":0.5},{"x":8,"y":32,"z":0.5},{"x":8,"y":33,"z":0.5},{"x":8,"y":34,"z":0.5},{"x":9,"y":34,"z":0.5},{"x":10,"y":34,"z":0.5},{"x":10,"y":35,"z":0.5},{"x":11,"y":35,"z":0.5},{"x":12,"y":35,"z":0.5},{"x":12,"y":36,"z":0.5},{"x":13,"y":36,"z":0.5},{"x":14,"y":36,"z":0.5},{"x":14,"y":37,"z":0.5},{"x":15,"y":37,"z":0.5},{"x":15,"y":38,"z":0.5},{"x":17,"y":38,"z":0.5},{"x":17,"y":39,"z":0.5},{"x":18,"y":39,"z":0.5},{"x":19,"y":39,"z":0.5},{"x":19,"y":40,"z":0.5},{"x":20,"y":40,"z":0.5},{"x":21,"y":40,"z":0.5},{"x":22,"y":41,"z":0.5},{"x":23,"y":41,"z":0.5},{"x":24,"y":42,"z":0.5},{"x":25,"y":42,"z":0.5},{"x":26,"y":42,"z":0.5},{"x":26,"y":43,"z":0.5},{"x":27,"y":43,"z":0.5},{"x":28,"y":43,"z":0.5},{"x":29,"y":43,"z":0.5},{"x":29,"y":44,"z":0.5},{"x":30,"y":44,"z":0.5},{"x":31,"y":45,"z":0.5},{"x":32,"y":45,"z":0.5},{"x":33,"y":45,"z":0.5},{"x":34,"y":46,"z":0.5},{"x":35,"y":46,"z":0.5},{"x":36,"y":46,"z":0.5},{"x":37,"y":46,"z":0.5},{"x":38,"y":46,"z":0.5},{"x":38,"y":47,"z":0.5},{"x":39,"y":47,"z":0.5},{"x":40,"y":48,"z":0.5},{"x":41,"y":48,"z":0.5},{"x":42,"y":48,"z":0.5},{"x":43,"y":48,"z":0.5},{"x":44,"y":48,"z":0.5},{"x":45,"y":49,"z":0.5},{"x":46,"y":49,"z":0.5},{"x":48,"y":49,"z":0.5},{"x":50,"y":49,"z":0.5},{"x":51,"y":50,"z":0.5},{"x":53,"y":50,"z":0.5},{"x":54,"y":50,"z":0.5},{"x":56,"y":50,"z":0.5},{"x":56,"y":51,"z":0.5},{"x":57,"y":51,"z":0.5},{"x":59,"y":51,"z":0.5},{"x":61,"y":51,"z":0.5},{"x":62,"y":51,"z":0.5},{"x":64,"y":51,"z":0.5},{"x":65,"y":51,"z":0.5},{"x":66,"y":51,"z":0.5},{"x":68,"y":51,"z":0.5},{"x":70,"y":51,"z":0.5},{"x":71,"y":51,"z":0.5},{"x":73,"y":51,"z":0.5},{"x":75,"y":51,"z":0.5},{"x":77,"y":51,"z":0.5},{"x":78,"y":51,"z":0.5},{"x":80,"y":51,"z":0.5},{"x":82,"y":51,"z":0.5},{"x":83,"y":51,"z":0.5},{"x":84,"y":51,"z":0.5},{"x":86,"y":51,"z":0.5},{"x":87,"y":51,"z":0.5},{"x":89,"y":51,"z":0.5},{"x":90,"y":51,"z":0.5},{"x":90,"y":50,"z":0.5},{"x":92,"y":50,"z":0.5},{"x":93,"y":50,"z":0.5},{"x":94,"y":50,"z":0.5},{"x":95,"y":50,"z":0.5},{"x":95,"y":49,"z":0.5},{"x":96,"y":49,"z":0.5},{"x":97,"y":49,"z":0.5},{"x":98,"y":48,"z":0.5},{"x":99,"y":48,"z":0.5},{"x":99,"y":47,"z":0.5},{"x":100,"y":47,"z":0.5},{"x":101,"y":47,"z":0.5},{"x":101,"y":46,"z":0.5},{"x":102,"y":46,"z":0.5},{"x":103,"y":46,"z":0.5},{"x":103,"y":45,"z":0.5},{"x":104,"y":45,"z":0.5},{"x":104,"y":44,"z":0.5},{"x":105,"y":43,"z":0.5},{"x":105,"y":42,"z":0.5},{"x":106,"y":42,"z":0.5},{"x":107,"y":42,"z":0.5},{"x":107,"y":41,"z":0.5},{"x":107,"y":40,"z":0.5},{"x":108,"y":40,"z":0.5},{"x":108,"y":39,"z":0.5}]}],"isComplete":true},"opacity":1,"isLocked":false,"parentId":"page:page","rotation":0,"typeName":"shape"}},"schema":{"sequences":{"com.tldraw.page":1,"com.tldraw.asset":1,"com.tldraw.shape":4,"com.tldraw.store":5,"com.tldraw.camera":1,"com.tldraw.pointer":1,"com.tldraw.document":2,"com.tldraw.instance":25,"com.tldraw.shape.geo":10,"com.tldraw.shape.draw":2,"com.tldraw.shape.line":5,"com.tldraw.shape.note":9,"com.tldraw.shape.text":3,"com.tldraw.asset.image":5,"com.tldraw.asset.video":5,"com.tldraw.shape.arrow":7,"com.tldraw.shape.embed":4,"com.tldraw.shape.frame":1,"com.tldraw.shape.group":0,"com.tldraw.shape.image":5,"com.tldraw.shape.video":4,"com.tldraw.binding.arrow":1,"com.tldraw.asset.bookmark":2,"com.tldraw.shape.bookmark":2,"com.tldraw.shape.highlight":1,"com.tldraw.instance_presence":6,"com.tldraw.instance_page_state":5},"schemaVersion":2}} */
