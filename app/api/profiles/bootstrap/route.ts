import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ProfileUpsertPayload = {
  id: string;
  full_name: string | null;
  xp: number;
  coins: number;
  rank: string;
  streak: number;
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.toLowerCase().startsWith("bearer ") ? authHeader.slice(7) : undefined;
  const getUserResult = bearerToken ? await supabase.auth.getUser(bearerToken) : await supabase.auth.getUser();

  const {
    data: { user },
    error: userError,
  } = getUserResult;

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profilePayload: ProfileUpsertPayload = {
    id: user.id,
    full_name: user.user_metadata?.full_name ?? null,
    xp: 0,
    coins: 100,
    rank: "Iron I",
    streak: 0,
  };

  const { error } = await supabase.from("profiles").upsert(profilePayload, { onConflict: "id", ignoreDuplicates: true });

  if (error) {
    console.error("Supabase Error Details (profiles upsert):", error.message, error.details, error.hint);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
