import React from "react";
import "./MoviesButton.css";

function MoviesButton({onClick}) {
  return (
    <button className="movies-button" type="button" onClick={onClick}>Ещё</button>
  )
}

export default MoviesButton;