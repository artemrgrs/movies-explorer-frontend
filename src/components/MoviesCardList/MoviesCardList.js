import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  React.useEffect(() => {
    props.getSavedMovies();
  }, []);

  
  return (
    <div className="movies__container">
      {props.checkboxState
        ? props.movies.length !== 0 &&
          props.movies.map((movie, i) => {
            if (
              movie.image &&
              (movie.trailerLink || movie.trailer) &&
              movie.duration <= props.ShortMovieDuration
            ) {
              return (
                <MoviesCard
                  movie={movie}
                  key={movie.movieId || movie.id}
                  onSave={() => props.changeMovieState(movie)}
                  savedMovies={props.savedMovies}
                />
              );
            }
          })
        : props.movies.length !== 0 &&
          props.movies.slice(0, props.cardsQuantity).map((movie, i) => {
            if (movie.image && (movie.trailerLink || movie.trailer)) {
              return (
                <MoviesCard
                  movie={movie}
                  key={i}
                  onSave={() => props.changeMovieState(movie)}
                  savedMovies={props.savedMovies}
                />
              );
            }
          })}
    </div>
  );
}

export default MoviesCardList;
