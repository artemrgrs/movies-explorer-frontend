import React from "react";
import headerLogo from "../../images/header-logo.svg";
import "./Header.css";
import { Link, useRouteMatch } from "react-router-dom";
import accountIcon from "../../images/profile.svg";

function Header(props) {
  const { path, url } = useRouteMatch();

  const headerClassName = `header ${
    props.history.location.pathname === "/"
      ? `header_landing header_visible`
      : ``
  }
  ${
    props.history.location.pathname === "/profile" ||
    props.history.location.pathname === "/saved-movies" ||
    props.history.location.pathname === "/movies"
      ? `header_visible`
      : ``
  }`;

  return (
    <div className={headerClassName}>
      <img
        alt="Логотип сервиса"
        src={headerLogo}
        className="header__logo"
      />
      {props.loggedIn ? (
        <>
          <button
            type="button"
            className="header__nav-icon"
            onClick={props.changeNavState}
          />
          <ul
            className="header__nav"
            aria-labelledby="menu"
            aria-label="submenu"
          >
            <li className="header__nav-element">
              <Link
                to="/movies"
                className={`header__movies ${
                  props.history.location.pathname === "/movies"
                    ? `header__movies_active`
                    : ``
                }`}
              >
                Фильмы
              </Link>
            </li>
            <li className="header__nav-element">
              <Link
                to="/saved-movies"
                className={`header__saved-movies ${
                  props.history.location.pathname === "/saved-movies"
                    ? `header__saved-movies_active`
                    : ``
                }`}
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <ul className="header__nav">
            <li className="header__nav-element">
              <Link to="/profile">
                <img
                  className="header__account-icon"
                  src={accountIcon}
                  alt="Иконка аккаунта"
                />
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul
            className="header__nav header__nav_landing"
            aria-labelledby="menu"
            aria-label="submenu"
          >
            <li className="header__nav-element">
              <Link to="/signup" className="header__register">
                Регистрация
              </Link>
            </li>
            <li className="header__nav-element">
              <Link to="/signin" className="header__login">
                Войти
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Header;
