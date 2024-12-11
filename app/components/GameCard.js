// import Image from "next/image";
// import Link from "next/link";
// import { Star, Calendar, Gamepad, Tag } from "lucide-react";

// export default function GameCard({ game, isUpcoming = false }) {
//   const currentDate = new Date();
//   const releaseDate = new Date(game.releaseDate);
//   const isReleased = releaseDate <= currentDate;

//   return (
//     <Link href={`/game/${game.id}`} className="block w-80 flex-shrink-0">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full border border-gray-200 dark:border-gray-700">
//         <div className="relative h-96">
//           {game.coverUrl ? (
//             <Image
//               src={game.coverUrl}
//               alt={`${game.name} cover`}
//               layout="fill"
//               objectFit="cover"
//               className="rounded-t-lg"
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//               <span className="text-gray-400 dark:text-gray-500">
//                 No image available
//               </span>
//             </div>
//           )}
//         </div>
//         <div className="p-4 space-y-3">
//           <h3 className="text-xl font-bold truncate text-purple-600 dark:text-purple-400">
//             {game.name}
//           </h3>
//           <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//             <Calendar className="w-4 h-4 mr-2" />
//             <span className="font-semibold mr-1">
//               {isReleased ? "Released:" : "Releases:"}
//             </span>{" "}
//             {game.releaseDate}
//           </div>
//           {game.rating && (
//             <div className="flex items-center">
//               <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
//               <span className="text-yellow-600 dark:text-yellow-400 font-bold mr-1">
//                 {game.rating.toFixed(1)}
//               </span>
//               <span className="text-xs text-gray-500 dark:text-gray-400">
//                 ({game.totalRatings.toLocaleString()} ratings)
//               </span>
//             </div>
//           )}
//           {game.genres && game.genres.length > 0 && (
//             <div className="flex items-start">
//               <Tag className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 <span className="font-semibold">Genres:</span>{" "}
//                 {game.genres.slice(0, 3).join(", ")}
//               </p>
//             </div>
//           )}
//           {game.platforms && game.platforms.length > 0 && (
//             <div className="flex items-start">
//               <Gamepad className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 <span className="font-semibold">Platforms:</span>{" "}
//                 {game.platforms.slice(0, 3).join(", ")}
//                 {game.platforms.length > 3 && " ..."}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, Gamepad, Tag } from "lucide-react";

export default function GameCard({ game, isUpcoming = false }) {
  const currentDate = new Date();
  const releaseDate = new Date(game.releaseDate);
  const isReleased = releaseDate <= currentDate;

  return (
    <Link href={`/game/${game.id}`} className="block w-80 flex-shrink-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full border border-gray-200 dark:border-gray-700">
        <div className="relative h-96">
          {game.coverUrl ? (
            <Image
              src={game.coverUrl}
              alt={`${game.name} cover`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500">
                No image available
              </span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          <h3 className="text-xl font-bold truncate text-purple-600 dark:text-purple-400">
            {game.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="font-semibold mr-1">
              {isReleased ? "Released:" : "Releases:"}
            </span>{" "}
            {game.releaseDate}
          </div>
          {game.rating && (
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
              <span className="text-yellow-600 dark:text-yellow-400 font-bold mr-1">
                {game.rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({game.totalRatings.toLocaleString()} ratings)
              </span>
            </div>
          )}
          {game.genres && game.genres.length > 0 && (
            <div className="flex items-start">
              <Tag className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Genres:</span>{" "}
                {game.genres.slice(0, 3).join(", ")}
              </p>
            </div>
          )}
          {game.platforms && game.platforms.length > 0 && (
            <div className="flex items-start">
              <Gamepad className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Platforms:</span>{" "}
                {game.platforms.slice(0, 3).join(", ")}
                {game.platforms.length > 3 && " ..."}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
