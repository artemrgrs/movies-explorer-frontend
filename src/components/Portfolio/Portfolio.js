import React from "react";
import "./Portfolio.css";
import linkIcon from "../../images/link-icon.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <div className="portfolio__link">
        <a
          className="portfolio__text"
          href="https://yandex.ru"
          target="_blank"
          rel="noreferrer"
        >
          Статичный сайт
        </a>
        <img
          src={linkIcon}
          alt="Переход по ссылке"
          className="portfolio__icon"
        ></img>
      </div>
      <div className="portfolio__link">
        <a
          className="portfolio__text"
          href="https://yandex.ru"
          target="_blank"
          rel="noreferrer"
        >
          Адаптивный сайт
        </a>
        <img
          src={linkIcon}
          alt="Переход по ссылке"
          className="portfolio__icon"
        ></img>
      </div>
      <div className="portfolio__link">
        <a
          className="portfolio__text"
          href="https://yandex.ru"
          target="_blank"
          rel="noreferrer"
        >
          Одностраничное приложение
        </a>
        <img
          src={linkIcon}
          alt="Переход по ссылке"
          className="portfolio__icon"
        ></img>
      </div>
    </div>
  );
}

export default Portfolio;
