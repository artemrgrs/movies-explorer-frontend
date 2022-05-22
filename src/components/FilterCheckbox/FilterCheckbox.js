import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  return (
    <div className="checkbox">
      <label className="switch">
        <input
          type="checkbox"
          className="checkbox__container"
          onClick={props.handleCheckboxState}
        ></input>
        <span className="slider round"></span>
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
