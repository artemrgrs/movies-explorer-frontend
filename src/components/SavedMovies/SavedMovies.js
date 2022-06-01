import React, { useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";



function SavedMovies({
    onSearchForm,
    searchText,
    onError,
    movies,
    isLoading,
    onMovieDelete,
    savedIds,
}) {
    
    useEffect(() => {
        if (searchText && !movies.length) {
            onError("Ничего не найдено");
        } else {
            onError("");
        }
    }, [movies]);
    
    return (
        <main className="main">
            <SearchForm
                onSearchForm={onSearchForm}
                searchText={searchText}
                onError={onError}
            />
            {isLoading ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    movies={movies}
                    onMovieDelete={onMovieDelete}
                    savedIds={savedIds}
                />
            )}
        </main>
    );
}

export default SavedMovies;
