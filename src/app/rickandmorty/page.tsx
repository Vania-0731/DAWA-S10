import Link from "next/link";
import { CharactersResponse, SimpleCharacter } from "@/types/rickandmorty";
import { IoPeople, IoSearch } from "react-icons/io5";
import Image from "next/image";
import SearchComponent from "./SearchComponent";

async function getCharacters(): Promise<SimpleCharacter[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    next: { revalidate: 864000 }, // 10 días
    cache: 'force-cache'
  });

  if (!res.ok) throw new Error("Error al cargar personajes");

  const data: CharactersResponse = await res.json();

  return data.results.map((character) => ({
    id: character.id,
    name: character.name,
    image: character.image,
    status: character.status,
    species: character.species,
  }));
}

export default async function CharactersList() {
  const characters = await getCharacters();

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            <IoPeople size={40} className="inline-block mr-3" />
            Personajes de Rick and Morty
          </h1>
          <SearchComponent />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rickandmorty/${character.id}`}
              className="transform transition hover:scale-105"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl cursor-pointer">
                <div className="relative">
                  <Image
                    width={300}
                    height={300}
                    src={character.image}
                    alt={character.name}
                    className="w-full h-64 object-cover"
                    priority={false}
                  />
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    character.status === 'Alive' ? 'bg-green-500 text-white' :
                    character.status === 'Dead' ? 'bg-red-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {character.status}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {character.name}
                  </h2>
                  <p className="text-gray-600 capitalize">
                    {character.species}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
