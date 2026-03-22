import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      full_name: user.user_metadata?.full_name ?? null,
      xp: 0,
      coins: 100,
      rank: "Iron I",
      streak: 0,
    },
    { onConflict: "id", ignoreDuplicates: true },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
