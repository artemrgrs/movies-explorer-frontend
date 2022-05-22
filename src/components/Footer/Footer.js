import React from "react";
import "./Footer.css";
import { useRouteMatch } from "react-router-dom";

function Footer(props) {
  const year = new Date().getFullYear();
  const { path, url } = useRouteMatch();

  return (
    <div
      className={`footer ${
        props.history.location.pathname === "/" ||
        props.history.location.pathname === "/movies" ||
        props.history.location.pathname === "/saved-movies"
          ? `footer_visible`
          : ``
      }`}
    >
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__caption">
        <p className="footer__year">&copy; {year}</p>
        <div className="footer__links">
          <a
            href="https://praktikum.yandex.ru/"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://yandex.ru"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href="https://yandex.ru"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
