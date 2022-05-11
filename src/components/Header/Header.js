import React from "react";
import headerLogo from "../../images/header-logo.svg";
import './Header.css';
import { Route, Link } from "react-router-dom";
import accountIcon from '../../images/profile.svg';

function Header(props) {
  return(
    <section className={`header ${window.location.pathname === '/' ? `header_landing` : ``}`}>
      
      <Route exact path="/">
        <ul className="header__nav header__nav_landing" aria-labelledby="menu" aria-label="submenu">
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
      </Route>

      <Route path='/profile'>
          {/*<button type="button" className="header__nav-icon" onClick={props.changeNavState}/>*/}
          <div className="header__nav" aria-labelledby="menu" aria-label="submenu">
            {/*<img alt="Логотип сервиса" src={headerLogo} className="header__logo"/>*/}
            <div className="header__nav-element">
              <Link to="/movies" className="header__movies">
                Фильмы
              </Link>
            </div>
            <div className="header__nav-element">
              <Link to="/saved-movies" className="header__saved-movies">
                Сохранённые фильмы
              </Link>
            </div>
          </div>
          <ul className="header__nav">
            <li className="header__nav-element">
              <Link to="/profile">
                <img className="header__account-icon" src={accountIcon} alt="Иконка аккаунта"></img>
              </Link>
            </li>
          </ul>
      </Route>

      <Route path='/movies'>
          <img alt="Логотип сервиса" src={headerLogo} className="header__logo"/>
          <button type="button" className="header__nav-icon" onClick={props.changeNavState}></button>
          <ul className="header__nav" aria-labelledby="menu" aria-label="submenu">
            {/*<li className="header__nav-element">*/}
            {/*  <Link to="/profile">*/}
            {/*  <img alt="Логотип сервиса" src={headerLogo} className="header__logo"/>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            <li className="header__nav-element">
              <Link to="/movies" className="header__movies header__movies_active">
                Фильмы
              </Link>
            </li>
            <li className="header__nav-element">
              <Link to="/saved-movies" className="header__saved-movies">
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <ul className="header__nav">
            <li className="header__nav-element">
              <Link to="/profile">
                <img className="header__account-icon" src={accountIcon} alt="Иконка аккаунта"></img>
              </Link>
            </li>
          </ul>
      </Route>

      <Route path='/saved-movies'>
          <button type="button" className="header__nav-icon" onClick={props.changeNavState}></button>
          <ul className="header__nav" aria-labelledby="menu" aria-label="submenu">
            <li className="header__nav-element">
              <Link to="/profile">
                <img alt="Логотип сервиса" src={headerLogo} className="header__logo"/>
              </Link>
            </li>
            <li className="header__nav-element">
              <Link to="/movies" className="header__movies">
                Фильмы
              </Link>
            </li>
            <li className="header__nav-element">
              <Link to="/saved-movies" className="header__saved-movies header__saved-movies_active">
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <ul className="header__nav">
            <li className="header__nav-element">
              <Link to="/profile">
                <img className="header__account-icon" src={accountIcon} alt="Иконка аккаунта"></img>
              </Link>
            </li>
          </ul>
      </Route>
    </section>
  )
}

export default Header;
