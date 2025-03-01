import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles.css";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("marvel");

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
      .then((res) => setMovies(res.data.Search || []))
      .catch((err) => console.error(err));
  }, [search]);

  return (
    <div>
      <h1>Movie Listings</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {movies.map((movie) => (
          <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
            <div>
              <img src={movie.Poster} alt={movie.Title} width="100" />
              <h3>{movie.Title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
