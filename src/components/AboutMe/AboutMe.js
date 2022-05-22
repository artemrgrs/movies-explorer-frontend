import React from "react";
import "./AboutMe.css";
import photo from "../../images/photo.jpg";

function AboutMe() {
  return (
    <div className="about-me">
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__container">
        <h3 className="about-me__name">Виталий</h3>
        <p className="about-me__age">Фронтенд-разработчик, 18 лет</p>
        <p className="about-me__info">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugiat hic, nobis odio placeat quas sequi unde! Dolorum, quis, sit.
        </p>
        <img className="about-me__photo" src={photo} alt="Моё фото"/>
        <div className="about-me__media">
          <a
            className="about-me__link"
            href="https://yandex.ru"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="about-me__link"
            href="https://yandex.ru"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
