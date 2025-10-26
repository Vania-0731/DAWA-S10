import Link from 'next/link';
import { Metadata } from 'next';
import { Character, CharactersResponse } from '@/types/rickandmorty';
import Image from 'next/image';
import { IoArrowBack, IoLocation, IoPlanet } from 'react-icons/io5';

interface CharacterPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 } // 10 días
  });
  
  if (!res.ok) throw new Error('Personaje no encontrado');
  return res.json();
}

export async function generateStaticParams() {
  const allCharacters: Character[] = [];
  let nextUrl = 'https://rickandmortyapi.com/api/character';
  
  while (nextUrl) {
    const res = await fetch(nextUrl);
    const data: CharactersResponse = await res.json();
    allCharacters.push(...data.results);
    nextUrl = data.info.next || '';
  }
  
  return allCharacters.map((character) => ({
    id: character.id.toString(),
  }));
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);
  
  return {
    title: `${character.name} - Rick and Morty`,
    description: `Información sobre ${character.name} de Rick and Morty`,
  };
}

const statusColors: Record<string, string> = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-500',
};

const genderColors: Record<string, string> = {
  Male: 'bg-blue-500',
  Female: 'bg-pink-500',
  Genderless: 'bg-purple-500',
  unknown: 'bg-gray-500',
};

export default async function CharacterDetail({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className={`${statusColors[character.status]} p-8`}>
          <h1 className="text-5xl font-bold text-white text-center">
            {character.name}
          </h1>
          <p className="text-white text-center text-xl mt-2">
            ID: #{character.id}
          </p>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex justify-center items-center">
              <Image
                width={300}
                height={300}
                src={character.image}
                alt={character.name}
                className="w-64 h-64 rounded-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-2xl text-gray-700 font-bold mb-3">Información Básica</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`${statusColors[character.status]} text-white px-3 py-1 rounded-full font-semibold`}>
                      {character.status}
                    </span>
                    <span className="text-gray-700 font-semibold">Estado</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`${genderColors[character.gender]} text-white px-3 py-1 rounded-full font-semibold`}>
                      {character.gender}
                    </span>
                    <span className="text-gray-700 font-semibold">Género</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full font-semibold">
                      {character.species}
                    </span>
                    <span className="text-gray-700 font-semibold">Especie</span>
                  </div>
                  
                  {character.type && (
                    <div className="flex items-center gap-3">
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full font-semibold">
                        {character.type}
                      </span>
                      <span className="text-gray-700 font-semibold">Tipo</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-2xl text-gray-700 font-bold mb-3">Ubicación</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <IoPlanet className="text-blue-500" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">Origen</p>
                      <p className="text-gray-600">{character.origin.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <IoLocation className="text-green-500" size={20} />
                    <div>
                      <p className="font-semibold text-gray-800">Ubicación Actual</p>
                      <p className="text-gray-600">{character.location.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl text-gray-700 font-bold mb-3">Episodios</h3>
                <p className="text-gray-600">
                  Aparece en <span className="font-bold text-blue-600">{character.episode.length}</span> episodios
                </p>
              </div>

              <div>
                <h3 className="text-2xl text-gray-700 font-bold mb-3">Información Adicional</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Creado:</strong> {new Date(character.created).toLocaleDateString()}</p>
                  <p><strong>URL:</strong> <a href={character.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ver en API</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50">
          <Link
            href="/rickandmorty"
            className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition flex items-center gap-2"
          >
            <IoArrowBack size={20} />
            Volver a Personajes
          </Link>
        </div>
      </div>
    </div>
  );
}
