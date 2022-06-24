import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ statusBtn, movie, onSaveMovie, onDeleteMovie }) {
	
	const serverUrl = 'https://api.nomoreparties.co';
	let location = useLocation();
	
	function handleSubmit() {
		const movieData = {
			country: movie.country,
			director: movie.director,
			duration: movie.duration,
			year: movie.year,
			description: movie.description,
			image: serverUrl + movie.image.url,
			trailer: movie.trailerLink,
			thumbnail: serverUrl + movie.image.formats.thumbnail.url,
			nameRU: movie.nameRU,
			nameEN: movie.nameEN,
			movieId: movie.id,
		}
		onSaveMovie(movieData);
	}
	
	function handleDelete() {
		onDeleteMovie(movie.id === undefined ? movie.movieId : movie.id)
	}
	
	function duration() {
		if (movie.duration > 60) {
			return `${ movie.duration / 60 | 0 }ч ${ movie.duration % 60 }м`
		}
		if (movie.duration === 60) {
			return `${ movie.duration / 60 }ч`
		} else {
			return `${ movie.duration } минут`
		}
	}
	
	const Button = (statusBtn) => {
		switch (statusBtn) {
			case 'saved' :
				return <button className="movie__btn movie__btn_type_active" type="button" onClick={ handleDelete }/>
			case 'delete' :
				return <button className="movie__btn movie__btn_type_delete" type="button" onClick={ handleDelete }/>
			case 'save' :
				return <button className="movie__btn" type="button" onClick={ handleSubmit }/>
			default :
				return null
		}
	}
	
	
	
	return (
		<li className="movie">
			<div className="movie__container">
					<h1 className="movie__title">{ movie.nameRU }</h1>
				{ Button(statusBtn) }
				<p className="movie__time">{ duration() }</p>
			</div>
			<a className="movie__trailerlink" target="blank" href={ movie.trailerLink }>
				<img className="movie__poster"
						 src={ location.pathname === '/movies' ? serverUrl + movie.image.url : movie.image } alt={ movie.nameRU }/>
			</a>
		
		</li>
	)
}

export default MoviesCard;
