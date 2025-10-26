'use client';

import Link from 'next/link';
import { IoSearch, IoHome, IoArrowBack } from 'react-icons/io5';

export default function RickAndMortyNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="bg-yellow-500 bg-opacity-20 rounded-full p-8 mx-auto w-32 h-32 flex items-center justify-center">
            <IoSearch size={64} className="text-yellow-400" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
          404
        </h1>
        
        <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
          ¡Personaje no encontrado!
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          El personaje que buscas no existe en nuestro universo. 
          Puede que haya escapado a otra dimensión o que el ID esté mal.
        </p>
        <div className="bg-black bg-opacity-30 rounded-lg p-6 mb-8 text-left">
          <h3 className="text-yellow-400 font-semibold mb-3 text-center">¿Qué puedes hacer?</h3>
          <ul className="text-gray-300 space-y-2">
            <li>• Verificar que el ID del personaje sea correcto</li>
            <li>• Buscar en la lista completa de personajes</li>
            <li>• Usar la búsqueda para encontrar el personaje</li>
            <li>• El personaje debe existir en la API oficial</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <IoArrowBack size={20} />
            Volver atrás
          </button>
          <Link
            href="/rickandmorty"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <IoHome size={20} />
            Ver Personajes
          </Link>
        </div>
        <p className="text-gray-400 text-sm mt-8">
          ¿Sabías que hay cientos de personajes en el universo de Rick and Morty? ¡Explora todos!
        </p>
      </div>
    </div>
  );
}
