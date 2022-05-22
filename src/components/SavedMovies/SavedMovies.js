import React from "react";
import "./SavedMovies.css";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies(props) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setUsersMovies(props.movies.filter((m) => m.owner === currentUser._id));
  }, [props.movies, currentUser._id]);

  const [usersMovies, setUsersMovies] = React.useState(
    props.movies.filter(
      (movie) => movie.owner.valueOf() === currentUser._id.valueOf()
    )
  );

  function handleSearchedMovies(movies) {
    setUsersMovies(
      movies.filter(
        (movie) => movie.owner.valueOf() === currentUser._id.valueOf()
      )
    );
  }

  const [isNotFoundErrVisible, setIsNotFoundErrVisible] = React.useState(false);

  return (
    <div className="movies">
      <SearchForm
        movies={props.movies}
        getMovies={props.getMovies}
        setMovies={handleSearchedMovies}
        controlCardsQuantity={props.controlCardsQuantity}
        setClickNumber={props.setClickNumber}
        setErr={setIsNotFoundErrVisible}
        setServerErr={props.setServerErr}
        checkboxState={props.checkboxState}
        handleCheckboxState={props.handleCheckboxState}
      ></SearchForm>
      <h2
        className={`movies__warning ${
          isNotFoundErrVisible && !props.isLoading
            ? `movies__warning_visible`
            : ``
        }`}
      >
        Ничего не найдено
      </h2>
      <h2
        className={`movies__warning ${
          props.serverErr ? `movies__warning_visible` : ``
        }`}
      >
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз.
      </h2>
      {props.isLoading ? (
        <Preloader></Preloader>
      ) : (
        <MoviesCardList
          movies={usersMovies}
          //getMovies={props.getMovies}
          //savedUsersMovies={props.savedMovies}
          savedMovies={usersMovies}
          cardsQuantity={props.cardsQuantity}
          getSavedMovies={props.getSavedMovies}
          setClickNumber={props.setClickNumber}
          checkboxState={props.checkboxState}
          screenWidth={props.screenWidth}
          changeMovieState={(movie) => props.changeMovieState(movie)}
          ShortMovieDuration={props.ShortMovieDuration}
        ></MoviesCardList>
      )}
    </div>
  );
}

export default SavedMovies;
