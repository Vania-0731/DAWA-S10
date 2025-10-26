import { ReactNode } from "react";
import { Metadata } from "next";
import { IoRocket } from "react-icons/io5";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rick and Morty - Next.js",
  description: "Explora el universo de Rick and Morty",
};

interface RickAndMortyLayoutProps {
  children: ReactNode;
}

export default function RickAndMortyLayout({ children }: RickAndMortyLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900">
      <nav className="bg-black bg-opacity-30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/rickandmorty"
            className="text-white text-2xl font-bold hover:text-green-400 transition"
          >
            <IoRocket size={30} className="inline-block mr-2" />
            Rick and Morty Universe
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
