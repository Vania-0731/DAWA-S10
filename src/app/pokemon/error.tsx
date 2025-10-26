'use client';

import { useEffect } from 'react';
import { IoWarning, IoRefresh, IoHome } from 'react-icons/io5';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PokemonError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error en Pokédex:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="bg-red-500 bg-opacity-20 rounded-full p-8 mx-auto w-32 h-32 flex items-center justify-center">
            <IoWarning size={64} className="text-red-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">¡Oops! Algo salió mal</h1>
        <p className="text-xl text-gray-300 mb-6">Parece que hay un problema con la Pokédex. Los Pokémon están siendo difíciles de atrapar. </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-black bg-opacity-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-red-400 font-semibold mb-2">Detalles del error:</h3>
            <p className="text-gray-300 text-sm font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-gray-400 text-xs mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <IoRefresh size={20} />
            Intentar de nuevo
          </button>
          <Link
            href="/pokemon"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <IoHome size={20} />
            Volver al Pokédex
          </Link>
        </div>
        <p className="text-gray-400 text-sm mt-8">
          Si el problema persiste, puede ser que la API de Pokémon esté temporalmente fuera de servicio.
        </p>
      </div>
    </div>
  );
}
