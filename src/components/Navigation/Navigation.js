import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import accountIcon from "../../images/profile.svg";

function Navigation(props) {
  return (
    <div className={`nav ${props.isOpen ? `nav_opened` : ``}`}>
      <div className="nav__overlay"></div>
      <div className="nav__container">
        <button
          className="nav__close-btn"
          type="reset"
          onClick={props.changeState}
        ></button>
        <ul className="nav__list">
          <li className="nav__element">
            <Link
              to="/"
              className={`nav__link ${
                window.location.pathname === "/" ? `nav__link_active` : ``
              }`}
              onClick={props.changeState}
            >
              Главная
            </Link>
          </li>
          <li className="nav__element">
            <Link
              to="/movies"
              className={`nav__link ${
                window.location.pathname === "/movies" ? `nav__link_active` : ``
              }`}
              onClick={props.changeState}
            >
              Фильмы
            </Link>
          </li>
          <li className="nav__element">
            <Link
              to="/saved-movies"
              className={`nav__link ${
                window.location.pathname === "/saved-movies"
                  ? `nav__link_active`
                  : ``
              }`}
              onClick={props.changeState}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link to="/profile">
          <img
            className="nav__account-icon"
            src={accountIcon}
            alt="Иконка аккаунта"
            onClick={props.changeState}
          ></img>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
