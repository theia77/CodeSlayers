import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardContent from "./dashboard-content";

type ProfileRow = {
  full_name: string | null;
  xp: number | null;
  coins: number | null;
  rank: string | null;
  streak: number | null;
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name,xp,coins,rank,streak")
    .eq("id", session.user.id)
    .maybeSingle<ProfileRow>();

  if (error) {
    console.error("Supabase Error Details (profiles select):", error.message, error.details, error.hint);
  }

  return (
    <DashboardContent
      fullName={profile?.full_name ?? session.user.user_metadata?.full_name ?? "Slayer"}
      xp={profile?.xp ?? 0}
      coins={profile?.coins ?? 100}
      rank={profile?.rank ?? "Iron I"}
      streak={profile?.streak ?? 0}
    />
  );
}
