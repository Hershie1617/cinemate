import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "8467f6c1552c36ff80fbb1bbc5691046";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (query) => {
    setLoading(true);
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      : `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

    const res = await axios.get(url);
    setMovies(res.data.results);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(search);
  };

  return (
    <div className="px-10 py-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-[#F5D6A1] mb-6">
        Trending Movies
      </h1>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8 gap-2"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-[#3A2418] text-[#F5D6A1] placeholder-[#C5A87D] rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#E6B87E] transition w-1/3"
        />
        <button
          type="submit"
          className="bg-[#E6B87E] text-[#4A2B1C] px-6 py-2 rounded-r-md hover:bg-[#F5D6A1] transition"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center text-[#F5D6A1]">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="group bg-[#2A1810] rounded-lg overflow-hidden shadow-md hover:shadow-[#E6B87E]/40 hover:scale-105 transform transition duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <p className="text-center text-[#F5D6A1] py-2 font-medium group-hover:text-[#E6B87E] transition">
                {movie.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
