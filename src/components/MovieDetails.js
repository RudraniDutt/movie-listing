import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} width="200" />
      <p>{movie.Plot}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Year:</strong> {movie.Year}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default MovieDetails;
