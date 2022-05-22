import React from "react";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
  React.useEffect(() => {
    props.controlCardsQuantity();
  }, [props.screenWidth, props.clickNumber]);

  React.useEffect(() => {
    props.getMovies();
  }, []);

  const actualMovies = JSON.parse(localStorage.getItem('movies'));

  const [searchedMovies, setSearchedMovies] = React.useState(actualMovies ? actualMovies : []);

  function handleSearchedMovies(movies) {
    setSearchedMovies(movies);
  }

  const [isNotFoundErrVisible, setIsNotFoundErrVisible] = React.useState(false);

  function increaseCardsQuantity() {
    props.setClickNumber(props.clickNumber + 1);
  }

  return (
    <div className="movies">
      <SearchForm
        movies={props.movies}
        getMovies={props.getMovies}
        searchedMovies={searchedMovies}
        setMovies={handleSearchedMovies}
        cardsQuantity={props.cardsQuantity}
        controlCardsQuantity={props.controlCardsQuantity}
        setClickNumber={props.setClickNumber}
        checkboxState={props.checkboxState}
        clickNumber={props.clickNumber}
        setErr={setIsNotFoundErrVisible}
        setServerErr={props.setServerErr}
        handleCheckboxState={props.handleCheckboxState}
      ></SearchForm>

      {props.isLoading ? (
        <Preloader></Preloader>
      ) : (
        <>
          <h2
            className={`movies__warning ${
              isNotFoundErrVisible ? `movies__warning_visible` : ``
            }`}
          >
            Ничего не найдено
          </h2>
          <h2
            className={`movies__warning ${
              props.serverErr ? `movies__warning_visible` : ``
            }`}
          >
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз.
          </h2>
          <MoviesCardList
            movies={searchedMovies}
            cardsQuantity={props.cardsQuantity}
            savedMovies={props.savedMovies}
            getSavedMovies={props.getSavedMovies}
            screenWidth={props.screenWidth}
            setClickNumber={props.setClickNumber}
            checkboxState={props.checkboxState}
            changeMovieState={(movie) => props.changeMovieState(movie)}
            ShortMovieDuration={props.ShortMovieDuration}
          ></MoviesCardList>
        </>
      )}
      <button
        type="button"
        className={`movies__more-btn ${
          searchedMovies.length === 0 ||
          props.isLoading ||
          searchedMovies.length <= props.cardsQuantity
            ? `movies__more-btn_hidden`
            : ``
        }`}
        onClick={increaseCardsQuantity}
      >
        Ещё
      </button>
    </div>
  );
}

export default Movies;
