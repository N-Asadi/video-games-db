"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import AlphabetFilter from "../components/AlphabetFilter";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("total_rating_count");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterLetter, setFilterLetter] = useState("");
  const observer = useRef();
  const gamesPerPage = 20;

  const lastGameElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchGames();
  }, [searchQuery, page, sortBy, sortOrder, filterLetter]);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/games?search=${searchQuery}&page=${page}&limit=${gamesPerPage}&sort=${sortBy}&order=${sortOrder}&filter=${filterLetter}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch games");
      }
      const data = await response.json();
      setGames((prevGames) => {
        if (page === 1) {
          return data.games;
        } else {
          return [...prevGames, ...data.games];
        }
      });
      setHasMore(data.games.length === gamesPerPage);
    } catch (error) {
      console.error("Error fetching games:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setGames([]);
    setFilterLetter("");
  };

  const handleSort = (event) => {
    const [newSortBy, newSortOrder] = event.target.value.split("-");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPage(1);
    setGames([]);
  };

  const handleFilterChange = (letter) => {
    setFilterLetter(letter === filterLetter ? "" : letter);
    setPage(1);
    setGames([]);
    setSearchQuery("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Games Collection</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <SearchBar onSearch={handleSearch} />
        <div className="flex items-center gap-4">
          <label htmlFor="sort" className="font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={`${sortBy}-${sortOrder}`}
            onChange={handleSort}
            className="p-2 border rounded bg-white dark:bg-gray-800"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="rating-desc">Rating (High to Low)</option>
            <option value="rating-asc">Rating (Low to High)</option>
            <option value="total_rating_count-desc">
              Popularity (High to Low)
            </option>
            <option value="total_rating_count-asc">
              Popularity (Low to High)
            </option>
            <option value="first_release_date-desc">
              Release Date (Newest)
            </option>
            <option value="first_release_date-asc">
              Release Date (Oldest)
            </option>
          </select>
        </div>
      </div>
      <AlphabetFilter
        onFilterChange={handleFilterChange}
        activeLetter={filterLetter}
      />
      {error ? (
        <p className="text-center text-xl text-red-500 mt-8">Error: {error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {games.map((game, index) => {
              if (games.length === index + 1) {
                return (
                  <div ref={lastGameElementRef} key={game.id}>
                    <GameCard game={game} />
                  </div>
                );
              } else {
                return <GameCard key={game.id} game={game} />;
              }
            })}
          </div>
          {loading && (
            <div className="flex justify-center items-center mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              <p className="ml-4 text-xl font-semibold text-purple-500">
                Loading more games...
              </p>
            </div>
          )}
          {!hasMore && (
            <p className="text-center text-xl mt-8">No more games to load</p>
          )}
        </>
      )}
    </div>
  );
}
