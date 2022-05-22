import React from "react";
import "./MoviesCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isSaved = props.savedMovies.some(
    (m) =>
      (m.movieId === props.movie.id || m.movieId === props.movie.movieId) &&
      m.owner === currentUser._id
  );

  return (
    <div className="movie">
      <p className="movie__title">{props.movie.nameRU}</p>
      <p className="movie__duration">{`${
        Math.trunc(props.movie.duration / 60) === 0
          ? ``
          : `${Math.trunc(props.movie.duration / 60)}ч `
      }${props.movie.duration % 60}м`}</p>
      <button
        type="button"
        className={
          window.location.pathname === "/movies"
            ? `movie__save-btn ${isSaved ? "movie__save-btn_active" : ""}`
            : `movie__delete-btn`
        }
        onClick={props.onSave}
      ></button>
      <a
        href={
          window.location.pathname === "/movies"
            ? props.movie.trailerLink
            : props.movie.trailer
        }
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={
            window.location.pathname === "/movies"
              ? `https://api.nomoreparties.co${props.movie.image.url}`
              : props.movie.image
          }
          alt={`Кадр из фильма "${props.movie.nameRU}"`}
          className="movie__img"
        ></img>
      </a>
    </div>
  );
}

export default MoviesCard;
