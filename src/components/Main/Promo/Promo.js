import React from "react";
import "./Promo.css";
import promoLogo from '../../../images/promo-logo.svg'

function Promo() {
    return (
        <section className="promo project__wrapper background">
          <div className="promo__block">
            <h1 className="promo__title">
              Учебный проект студента факультета Веб-разработки.
            </h1>
            <p className="promo__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его создателя.
            </p>
            <img
              alt="Картинка для привлечения внимания"
              className="promo__img"
              src={promoLogo}
            />
          </div>
          <a className="promo__btn" href="#about-project">
            Узнать больше
          </a>
        </section>
    );
}

export default Promo;
