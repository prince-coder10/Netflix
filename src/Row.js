import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { Modal, Button } from "react-bootstrap";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClose = () => setShowAlert(false);

  const handleClick = async (movie) => {
    try {
      const url = await movieTrailer(null, { tmdbId: movie.id });
      if (url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
        setShowAlert(false);
      } else {
        setTrailerUrl("");
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
      setTrailerUrl("");
      setShowAlert(true);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

      <Modal show={showAlert} onHide={handleClose} className="alert__box">
        <Modal.Header closeButton>
          <Modal.Title>Sorry!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>No trailer was found for this movie.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className="alert__button__close" >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Row;
