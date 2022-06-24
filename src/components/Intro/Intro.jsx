import React from "react";
import introIllustration from "../../images/palnet-logo.svg";
import "./Intro.css"

function Intro(props) {
    return (
        <section className="intro">
            <div className="intro__text-container">
                <h1 className="intro__title">Учебный проект студента факультета&shy; Веб-разработки.</h1>
                <h2 className="intro__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h2>
                <button className="intro__learn-more">Узнать больше</button>
            </div>
            <img className="intro__illustration" src={introIllustration} alt="Illustration" />
        </section>
    )
}
export default Intro;