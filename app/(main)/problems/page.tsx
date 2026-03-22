import Link from "next/link";

export default function ProblemsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] p-6 text-[#F1F1F1]">
      <section className="mx-auto max-w-3xl rounded-md border border-zinc-800 bg-[#141414] p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Problems</p>
        <h1 className="mt-2 text-2xl font-black">Pick a challenge</h1>
        <div className="mt-5 space-y-3">
          {["two-sum", "binary-search", "merge-intervals"].map((slug) => (
            <Link
              key={slug}
              href={`/problems/${slug}`}
              className="block rounded-md border border-zinc-700 px-4 py-3 text-sm hover:border-[#FF4D00] hover:text-[#FF4D00]"
            >
              {slug
                .split("-")
                .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : ""))
                .join(" ")}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
