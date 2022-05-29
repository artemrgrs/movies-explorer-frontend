import React from "react";
import "./AboutMe.css";
import studentPhoto from "../../../images/student-photo.jpg";

function AboutMe() {
    return (
        <section className="student project__wrapper">
            <h2 className="main__title">Студент</h2>

            <div className="student__info">
                <div className="student__left-block">
                    <h3 className="student__name">Виталий</h3>
                    <p className="student__about">
                        Фронтенд-разработчик, 18
                    </p>
                    <p className="student__description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fugiat hic, nobis odio placeat quas sequi unde! Dolorum, quis, sit.
                    </p>
                    <ul className="student__links">
                        <li className="student__link">
                            <a
                                href="https://t.me"
                                target="_blank"
                                className="project__link-border"
                                rel="noopener noreferrer"
                            >
                                Telegram
                            </a>
                        </li>
                        <li className="student__link">
                            <a
                                href="https://github.com"
                                target="_blank"
                                className="project__link-border"
                                rel="noopener noreferrer"
                            >
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="student__photo">
                    <img
                        src={studentPhoto}
                        alt="Литвиненко Александр"
                        className="student__photo-card"
                    />
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
