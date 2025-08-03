import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store";


const API_KEY = "8467f6c1552c36ff80fbb1bbc5691046";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  



  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);

        // Fetch recommendations
        const recRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
        );
        const recData = await recRes.json();
        setRecommended(recData.results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-yellow-400 text-2xl">
        Loading movie details...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-red-500 text-2xl">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-black text-[#F3C892] p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-[#5A3825] hover:bg-[#7A4E35] text-white rounded-lg shadow-md"
      >
        ← Back to Home
      </button>

      {/* Movie Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg w-72"
        />
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-2">
            <span className="font-semibold">Release Date:</span> {movie.release_date}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Rating:</span> {movie.vote_average} / 10
          </p>
          <p className="mb-4 text-lg leading-relaxed">{movie.overview}</p>
          <div className="flex gap-4 flex-wrap mb-4">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-[#5A3825] rounded-full text-sm shadow-md"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="italic text-sm">Runtime: {movie.runtime} mins</p>

          <br />

            {/* Add to Favorites Button */}
          <button
            onClick={toggleFavorite}
            className={`px-6 py-2 rounded-lg shadow-md transition ${
              isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-[#E6B87E] text-[#4A2B1C] hover:bg-[#F5D6A1]"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>

         
        </div>
      </div>

      

      {/* Recommended Movies Carousel */}
    {recommended.length > 0 && (
  <div>
    <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
    <div className="flex gap-4 overflow-x-scroll no-scrollbar pb-4">
      {recommended.map((rec) => (
        <Link
          to={`/movie/${rec.id}`}
          key={rec.id}
          className="min-w-[160px] bg-[#2A1810] rounded-lg overflow-hidden shadow-md hover:shadow-[#E6B87E]/40 hover:scale-105 transform transition duration-300"
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
            alt={rec.title}
            className="w-full h-60 object-cover"
          />
          <p className="text-center text-[#F5D6A1] py-2 font-medium group-hover:text-[#E6B87E] transition">
            {rec.title}
          </p>
        </Link>
      ))}
    </div>
  </div>
)}  
    </div>
  );
}
