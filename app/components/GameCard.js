import Image from "next/image";

export default function GameCard({ game }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-64">
        {game.coverUrl ? (
          <Image
            src={game.coverUrl}
            alt={`${game.name} cover`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
        <p className="text-gray-600">Released: {game.releaseDate}</p>
        {game.rating && (
          <p className="text-yellow-500 font-bold mt-2">
            Rating: {game.rating.toFixed(1)}/100
            <span className="text-gray-500 font-normal ml-2">
              ({game.totalRatings} ratings)
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
