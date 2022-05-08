import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox() {
  return(
    <div className="checkbox">
      <p className="checkbox__text">Короткометражки</p>
      <label className="switch">
        <input type="checkbox" className="checkbox__container"></input>
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default FilterCheckbox;
