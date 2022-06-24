import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesButton from "../MoviesButton/MoviesButton";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import Message from "../Message/Message";


function Movies({ isLoggedIn, movies, onSubmit, onSaveMovie, isSaved, onDeleteMovie, message, preloader, setMovies, handleAddPage, showMoreButton }) {

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <SearchForm onSubmit={onSubmit} setMovies={setMovies} suffix="" />
        <MoviesCardList>
          {movies.map( movie => (<MoviesCard movie={movie} key={movie.id} statusBtn={isSaved(movie.id) ? "saved" : "save"} 
          onSaveMovie={onSaveMovie}
          onDeleteMovie = {onDeleteMovie} 
          />))}
        </MoviesCardList>
        {preloader && <Preloader /> }
        <Message message={message}/>
        {showMoreButton && <MoviesButton onClick={handleAddPage} />}
      </main>
      <Footer />
    </>
  )
}
export default Movies;