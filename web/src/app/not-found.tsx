import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-mecu-700">404</p>
      <h1 className="mt-4 text-2xl font-bold text-mecu-950">This page isn&apos;t here yet</h1>
      <p className="mt-2 text-zinc-600">It may not have been published in the Studio.</p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-mecu-700 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-mecu-800"
      >
        Back home
      </Link>
    </main>
  );
}
