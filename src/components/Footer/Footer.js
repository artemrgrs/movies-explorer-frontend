import React from "react";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return(
    <div className="footer" style={{display: `${(window.location.pathname === '/')
    ||(window.location.pathname === '/movies')
    ||(window.location.pathname === '/saved-movies') ? `block` : ``}`}}>
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__caption">
        <p className="footer__year">&copy; {year}</p>
        <div className="footer__links">
          <a href="https://praktikum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a href="https://github.com" className="footer__link" target="_blank" rel="noreferrer">Github</a>
          <a href="https://www.instagram.com" className="footer__link" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </div>
  )
}

export default Footer;
