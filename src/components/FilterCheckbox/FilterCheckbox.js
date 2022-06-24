import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ checked, onChange }) {


  return (
    <div className="filter-checkbox">
      <input className="filter-checkbox__switch" type="checkbox" checked={checked} onChange={onChange} />
      <label className="filter-checkbox__name">Короткометражки</label>
    </div>
  )
}
export default FilterCheckbox;