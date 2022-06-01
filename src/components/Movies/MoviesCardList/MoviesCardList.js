import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
    movies,
    loadMoreMovies,
    moreButtonVisible,
    message,
    onMovieSave,
    onMovieDelete,
    savedIds,
}) {
    
    return (
        <section className="films project__wrapper">
            {movies.length
              ? (
                <ul className="films__list">
                    {movies.map((movie, i) => (
                        <MoviesCard
                            movie={movie}
                            key={movie.id || movie.movieId}
                            onMovieSave={onMovieSave}
                            onMovieDelete={onMovieDelete}
                            saved={savedIds.includes(movie.id)}
                        />
                    ))}
                </ul>
            )
              : (
                <div className={'films-none'}>Ничего не найдено</div>
              )
            }

            <div className="films__more-block">
                {moreButtonVisible ? (
                    <button
                        className="films__more-button"
                        onClick={loadMoreMovies}
                    >
                        Ещё
                    </button>
                ) : (
                    ""
                )}
            </div>
        </section>
    );
}

export default MoviesCardList;
