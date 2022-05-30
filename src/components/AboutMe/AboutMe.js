import React from "react";
import './AboutMe.css';
import photo from "../../images/photo.jpg"

function AboutMe() {
  return(
    <div className="about-me">
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__container">
        <h3 className="about-me__name">Виталий</h3>
        <p className="about-me__age">Фронтенд-разработчик, 30 лет</p>
        <p className="about-me__info">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
          и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <img className="about-me__photo" src={photo} alt="Моё фото"></img>
        <div className="about-me__media">
          <a className="about-me__link" href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a className="about-me__link" href="https://github.com" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
      
    </div>
  )
}

export default AboutMe;
