import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList(props) {
  return(
    <div className="movies__container">
      <MoviesCard
      children={props.children}>
      </MoviesCard>
      <MoviesCard
        children={props.children}>
      </MoviesCard>
      <MoviesCard
        children={props.children}>
      </MoviesCard>
      <MoviesCard
        children={props.children}>
      </MoviesCard>
      <MoviesCard
        children={props.children}>
      </MoviesCard>
      <MoviesCard
        children={props.children}>
      </MoviesCard>
      <MoviesCard
        children={props.children}>
      </MoviesCard>
    </div>
  )
}

export default MoviesCardList;
