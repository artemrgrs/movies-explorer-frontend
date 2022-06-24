import React from "react";
import { NavLink } from 'react-router-dom';

function MainMenu() {
  return (
    <div className="navigation__container-main">
      <NavLink to='/signup' className="navigation__link navigation__link_type_reg">Регистрация</NavLink>
      <NavLink to='/signin' className="navigation__link navigation__link_type_enter">Войти</NavLink>
    </div>
  )
}

export default MainMenu;