// "use client";
// import { useEffect, useState } from "react";

// export default function Games() {
//   const [games, setGames] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchGames = async () => {
//       try {
//         const response = await fetch("/api/games", {
//           method: "POST",
//         });

//         if (!response.ok) throw new Error("Failed to fetch games data");

//         const data = await response.json();
//         setGames(data);
//       } catch (error) {
//         console.error("Error fetching data from proxy route:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGames();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-4xl font-bold mb-6 text-center">Games Collection</h1>
//       {loading ? (
//         <p className="text-center">Loading games...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {games.map((game) => (
//             <div
//               key={game.id}
//               className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition"
//             >
//               <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
//               <p className="text-gray-700">
//                 Genre: {game.genres?.[0]?.name || "N/A"}
//               </p>
//               <p className="text-gray-700">
//                 Platform: {game.platforms?.[0]?.name || "N/A"}
//               </p>
//               {game.cover && (
//                 <img
//                   src={game.cover.url.replace("thumb", "cover_big")}
//                   alt={`${game.name} cover`}
//                   className="mt-4 w-full rounded-lg"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
