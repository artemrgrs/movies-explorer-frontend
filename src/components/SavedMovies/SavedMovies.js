import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Message from "../Message/Message";

function SavedMovies({ isLoggedIn, movies, onSubmit, onDeleteMovie, message, moviesOrigin, setMovies, moviesFiltered }) {

  React.useEffect(() => {
    const search = JSON.parse(localStorage.getItem("searchSaved"));
    if (!search) {
      onSubmit("", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesOrigin]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm onSubmit={onSubmit} setMovies={setMovies} suffix="Saved" moviesFiltered={moviesFiltered}/>
        <MoviesCardList>
        {movies.map( movie => (<MoviesCard movie={movie} key={movie._id} statusBtn="delete" onDeleteMovie = {onDeleteMovie} />))}
        </MoviesCardList>
        <Message message={message}/>
      </main>
      <Footer />
    </>
  )
}
export default SavedMovies;