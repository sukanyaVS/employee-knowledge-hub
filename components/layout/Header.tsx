import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold hover:text-gray-300"
        >
          Knowledge Hub
        </Link>

        <nav className="flex gap-6 text-sm text-gray-300">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/articles" className="hover:text-white">Articles</Link>
          <Link href="/announcements" className="hover:text-white">Announcements</Link>
          <Link href="/admin" className="hover:text-white">Admin</Link>
        </nav>
      </div>
    </header>
  );
}