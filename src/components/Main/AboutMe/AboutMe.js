import React from "react";
import "./AboutMe.css";
import foto from "../../../images/foto.jpg";

function AboutMe() {
	return (
		<section className="about-me" id="about-me">
			<h2 className="about-me__title">Студент</h2>
			<div className="about-me__container">
				<div className="about-me__profile">
					<h3 className="about-me__name">Student</h3>
					<p className="about-me__profession">Фронтенд-разработчик, 18 лет</p>
					<p className="about-me__description">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo incidunt laboriosam nisi quae quasi,
						quibusdam repellat voluptatibus? Amet at consequatur dolorem doloremque facilis fugiat incidunt maxime,
						molestiae nobis quam, reiciendis repudiandae, unde velit? Dolorum explicabo, impedit! A ad eveniet
						repudiandae. Ad corporis exercitationem molestiae obcaecati pariatur recusandae sint voluptatibus
						voluptatum?
					</p>
					<ul className="about-me__social">
						<li><a className="about-me__link" href="https://www.facebook.com/profile.php?id=100008955192507"
									 target="_blank" rel="noopener noreferrer">Facebook</a></li>
						<li><a className="about-me__link" href="https://github.com/APacheko" target="_blank"
									 rel="noopener noreferrer">Github</a></li>
					</ul>
				</div>
				<img className="about-me__foto" src={ foto } alt="Фотография"/>
			</div>
		</section>
	)
}

export default AboutMe;
