import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavorite } from "../store";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#2C1810] to-black text-[#F3C892]">
        <h2 className="text-3xl font-bold mb-4">No Favorites Yet</h2>
        <p className="text-lg">Browse movies and add your favorites!</p>
        <Link to="/" className="mt-6 px-6 py-3 bg-[#E6B87E] text-[#4A2B1C] rounded-lg hover:bg-[#F5D6A1] transition">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-b from-[#2C1810] to-black min-h-screen text-[#F3C892]">
      <h1 className="text-4xl font-bold mb-6">Your Favorites</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((movie) => (
          <div
            key={movie.id}
            className="group bg-[#2A1810] rounded-lg overflow-hidden shadow-md hover:shadow-[#E6B87E]/40 hover:scale-105 transform transition duration-300 relative"
          >
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <p className="text-center text-[#F5D6A1] py-2 font-medium group-hover:text-[#E6B87E] transition">
                {movie.title}
              </p>
            </Link>
            <button
              onClick={() => dispatch(removeFavorite(movie.id))}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
            >
              Remove
            </button>
          </div>
        ))}
      </div> 
    </div>
  );
}
