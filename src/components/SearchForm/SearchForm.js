import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import SubmitForm from '../../images/submit-btn.svg';
import "./SearchForm.css";

function SearchForm(props) {
  const movieRef = React.useRef('');

  const [isValid, setIsValid] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    if (!movieRef.current.value || movieRef.current.value === " ") {
      setIsValid(false);
    } else {
      props.setClickNumber(0);
      props.controlCardsQuantity();
      setIsValid(true);
      props.setErr(false);
      props.setServerErr(false);

      let movies;

      if (props.checkboxState) {
        movies = props.movies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().indexOf(movieRef.current.value.toLowerCase()) !== -1 &&
            movie.duration <= 40
        );
      } else {
        movies = props.movies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().indexOf(movieRef.current.value.toLowerCase()) !== -1
        );
      }

      localStorage.setItem('movies', JSON.stringify(movies));

      props.setMovies(movies);
      if (movies.length === 0) {
        props.setErr(true);
      }
    }
  }

  return (
    <div className="search-form">
      <form
        method="get"
        action="index.html"
        name="search"
        className="search-form__container"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="search-form__field" htmlFor="movie">
          <input
            name="movie"
            type="text"
            placeholder="Фильм"
            ref={movieRef}
            id="movie"
            className="search-form__input search-form__input-movie"
            required
          ></input>
          <span
            className={`form__input-error ${
              !isValid ? `form__input-error_active` : ``
            }`}
          >
            Нужно ввести ключевое слово
          </span>
        </label>
        <button type="submit" className="search-form__submit">
          <img src={ SubmitForm } alt="иконка поиска"/>
        </button>
      </form>
      <FilterCheckbox
        handleCheckboxState={props.handleCheckboxState}
      ></FilterCheckbox>
    </div>
  );
}

export default SearchForm;
