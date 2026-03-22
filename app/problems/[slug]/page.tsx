import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProblemEditor from "./editor";

type ProblemPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProblemPage({ params }: ProblemPageProps) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  const { slug } = await params;
  const title = slug
    .split("-")
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ");

  return <ProblemEditor title={title || "Untitled Problem"} slug={slug} />;
}
