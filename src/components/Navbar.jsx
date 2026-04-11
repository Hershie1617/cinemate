import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logotitle.png";


function Navbar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
   <nav className="flex justify-between items-center px-8 py-4 bg-[#4A2B1C] text-[#F5D6A1] shadow-lg">
  <Link to="../assets/logotitle.png" className="text-2xl font-bold flex items-center gap-2">
    <img src={logo} alt="CineMate Logo" className="w-12 h-12 rounded-full" />
    CineMate
  </Link>

  <div className="flex items-center gap-8">
    <Link to="/" className="hover:text-[#E6B87E] transition">Home</Link>
    <Link to="/favorites" className="hover:text-[#E6B87E] transition">Favorites</Link>
   

   
  </div>
</nav>

  );
}

export default Navbar;
