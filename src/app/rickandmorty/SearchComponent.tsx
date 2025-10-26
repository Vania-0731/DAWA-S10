'use client';

import { useState, useEffect } from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';
import { CharactersResponse, Character } from '@/types/rickandmorty';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Character[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchCharacters = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data: CharactersResponse = await res.json();
          setResults(data.results.slice(0, 5));
        } else {
          setResults([]);
        }
      } catch (error) {
        setResults([]);
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(searchCharacters, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar personajes..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-64 px-4 py-2 pr-10 pl-10 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <IoClose size={20} />
          </button>
        )}
      </div>

      {isOpen && (query.length >= 2 || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Buscando...</div>
          ) : results.length > 0 ? (
            results.map((character) => (
              <Link
                key={character.id}
                href={`/rickandmorty/${character.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <Image
                  width={40}
                  height={40}
                  src={character.image}
                  alt={character.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{character.name}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {character.species} • {character.status}
                  </p>
                </div>
              </Link>
            ))
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">No se encontraron personajes</div>
          ) : null}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
