import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favourites";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ScrollToTop from "./components/ScrollToTop";




function App() {
  const [searchQuery, setSearchQuery] = useState("");
   


  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar onSearch={(query) => setSearchQuery(query)} />
          <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
         <Route path="/favorites" element={<Favorites />} />
        

         
      </Routes> 
      

      
      

    </div>
  );
}

export default App;
