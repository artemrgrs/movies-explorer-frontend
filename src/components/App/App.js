import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ShortMoviesContext } from "../../contexts/ShortMoviesContext";
import { ShortSavedMoviesContext } from "../../contexts/ShortSavedMoviesContext";
import ProtectedRoute from "../../utils/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";

import { getAllMovies } from "../../utils/MoviesApi";

import {
	SHORT_MOVIE_DURATION,
	COUNT_DISPLAYED_MOVIES_DESKTOP,
	COUNT_PERROW_MOVIES_DESKTOP,
	COUNT_DISPLAYED_MOVIES_LAPTOP,
	COUNT_PERROW_MOVIES_LAPTOP,
	COUNT_DISPLAYED_MOVIES_MOBILE,
	COUNT_PERROW_MOVIES_MOBILE,
	SERVER_OK_MESSAGE,
	SERVER_ERROR_MESSAGE,
} from "../../constants";

import { REGEXP_URL_CHECK, REGEXP_ESCAPE_SPECIALS } from "../../regexp";

function App() {
	const [allMovies, setAllMovies] = useState([]);
	const [allSavedMovies, setAllSavedMovies] = useState([]);
	const [allSavedMoviesIds, setAllSavedMoviesIds] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [countFilteredMovies, setCountFilteredMovies] = useState(0);
	const [displayedMovies, setDisplayedMovies] = useState([]);
	const [displayedSavedMovies, setDisplayedSavedMovies] = useState([]);
	const [countDisplayedMovies, setCountDisplayedMovies] = useState(0);
	const [moviesPerRow, setMoviesPerRow] = useState(0);
	const [moreButtonVisible, setMoreButtonVisible] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [searchSavedText, setSearchSavedText] = useState("");
	const [newSearch, setNewSearch] = useState(false);
	const [moviesMessage, setMoviesMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);
	const location = useLocation().pathname;
	const [formError, setFormError] = useState("");
	const [wrongToken, setWrongToken] = useState(false);
	const history = useHistory();

	
	useEffect(() => {
		if (wrongToken) handleLogOut();
	}, [wrongToken])
	
	function changeDisplayedMoviesNum() {
		let displayWidth = window.screen.width;
		
		if (displayWidth >= 1280) {
			if (countDisplayedMovies === 0)
				setCountDisplayedMovies(COUNT_DISPLAYED_MOVIES_DESKTOP);
			setMoviesPerRow(COUNT_PERROW_MOVIES_DESKTOP);
		} else if (displayWidth > 767 && displayWidth < 1280) {
			if (countDisplayedMovies === 0)
				setCountDisplayedMovies(COUNT_DISPLAYED_MOVIES_LAPTOP);
			setMoviesPerRow(COUNT_PERROW_MOVIES_LAPTOP);
		} else {
			if (countDisplayedMovies === 0)
				setCountDisplayedMovies(COUNT_DISPLAYED_MOVIES_MOBILE);
			setMoviesPerRow(COUNT_PERROW_MOVIES_MOBILE);
		}
	}
	
	function toggleCheckbox(e) {
		setShortMovies({ ...shortMovies, state: e.target.checked });
	}
	
	const [shortMovies, setShortMovies] = useState({
		state: true,
		toggleCheckbox,
	});
	
	function toggleSavedCheckbox(e) {
		setShortSavedMovies({ ...shortSavedMovies, savedState: e.target.checked });
	}
	
	const [shortSavedMovies, setShortSavedMovies] = useState({
		savedState: true,
		toggleSavedCheckbox: toggleSavedCheckbox,
	});
	
	useEffect(() => {
		if (localStorage.getItem("token")) {
			mainApi
				.getAllSavedMovies()
				.then((movies) => {
					if (movies.message) {
						setWrongToken(true);
					}
					setAllSavedMovies(movies);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		
		checkToken();
		changeDisplayedMoviesNum();
		if (!newSearch && localStorage.searchText) {
			setSearchText(localStorage.getItem("searchText"));
			setShortMovies({
				...shortMovies,
				state:
					localStorage.getItem("shortSearch") === "true",
			});
			setFilteredMovies(
				JSON.parse(localStorage.getItem("filteredMovies"))
			);
		}
	}, []);
	
	useEffect(() => {
		getIdsAllSavedMovies();
	}, [allSavedMovies]);
	
	function getIdsAllSavedMovies() {
		let arrIds = [];
		allSavedMovies.forEach((movie) => {
			arrIds.push(movie.movieId || movie.id);
		});
		setAllSavedMoviesIds(arrIds);
	}
	
	// Поиск фильмов
	function handleSearch(searchText) {
		setNewSearch(true);
		setSearchText(searchText);
	}
	
	function handleSavedSearch(searchText) {
		setSearchSavedText(searchText);
	}
	
	useEffect(() => {
		if (allMovies.length === 0) {
			setIsLoading(true);
			getAllMovies()
				.then((data) => {
					let allMoviesFixed = [];
					data.forEach((movie) => {
						allMoviesFixed.push(fixMovieUrl(movie));
					});
					setAllMovies(allMoviesFixed);
				})
				.catch((err) => {
					handleMoviesErrorMessage(SERVER_ERROR_MESSAGE);
					console.log(err);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
		
		if (newSearch) {
			setFilteredMovies(
				allMovies.filter((movie) => {
					if (!shortMovies.state) {
						if (movie.duration <= SHORT_MOVIE_DURATION)
							return false;
					}
					
					function regexpEsape(text) {
						return text.replace(REGEXP_ESCAPE_SPECIALS, "\\$&");
					}
					
					let re = new RegExp(regexpEsape(searchText), "i");
					return re.test(movie.nameRU);
				})
			);
		}
	}, [searchText, shortMovies]);
	
	function handleMoviesErrorMessage(message) {
		setMoviesMessage(message);
		setTimeout(() => {
			setMoviesMessage("");
		}, 2000);
	}
	
	function handleFormsErrorMessage(message) {
		setFormError(message);
		setTimeout(() => {
			setFormError("");
		}, 2000);
	}
	
	function checkToken() {
		const token = localStorage.getItem("token");
		token && handleLogin(token);
	}
	
	function handleLogin(token) {
		mainApi
			.getUserInfo(token)
			.then((res) => {
				if (res && !res.message) {
					setCurrentUser(res);
					setLoggedIn(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	
	useEffect(() => {
		setDisplayedSavedMovies(
			allSavedMovies.filter((movie) => {
				// Фильтруем на короткометражки
				if (!shortMovies.state) {
					if (movie.duration <= SHORT_MOVIE_DURATION) return false;
				}
				
				function regexpEsape(text) {
					return text.replace(REGEXP_ESCAPE_SPECIALS, "\\$&");
				}
				
				let re = new RegExp(regexpEsape(searchSavedText), "i");
				return re.test(movie.nameRU);
			})
		);
	}, [allSavedMovies, searchSavedText, shortMovies]);
	
	useEffect(() => {
		const countMovies = filteredMovies.length;
		setCountFilteredMovies(countMovies);
		if (newSearch && countMovies > 0) {
			localStorage.setItem("searchText", searchText);
			localStorage.setItem("shortSearch", shortMovies.state);
			localStorage.setItem(
				"filteredMovies",
				JSON.stringify(filteredMovies)
			);
		}
		checkMoreButton(countDisplayedMovies, countMovies);
		setDisplayedMovies(filteredMovies.slice(0, countDisplayedMovies));
	}, [filteredMovies]);
	
	function loadMoreMovies() {
		let newСountDisplayedMovies = countDisplayedMovies + moviesPerRow;
		
		if (newСountDisplayedMovies > countFilteredMovies)
			newСountDisplayedMovies = countFilteredMovies;
		
		setDisplayedMovies(
			displayedMovies.concat(
				filteredMovies.slice(
					countDisplayedMovies,
					newСountDisplayedMovies
				)
			)
		);
		setCountDisplayedMovies(newСountDisplayedMovies);
		
		checkMoreButton(newСountDisplayedMovies, countFilteredMovies);
	}
	
	function checkMoreButton(currMoviesNum, allMoviesNum) {
		if (currMoviesNum < allMoviesNum) {
			setMoreButtonVisible(true);
		} else {
			setMoreButtonVisible(false);
		}
	}
	
	function handleRegisterUser(newUser) {
		setIsLoading(true);
		mainApi
			.register(newUser.name, newUser.password, newUser.email)
			.then((res) => {
				if (res.message) {
					handleFormsErrorMessage(res.message);
				} else {
					// При успехе авторизуем пользователя
					handleLoginUser(newUser);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}
	
	function handleLoginUser(user) {
		setIsLoading(true);
		mainApi
			.authorize(user.email, user.password)
			.then((res) => {
				if (res.message) {
					handleFormsErrorMessage(res.message);
				}
				
				if (res.token) {
					localStorage.setItem("token", res.token);
					handleLogin(res.token);
					history.push("/movies");
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}
	
	function handleUpdateUser(newUser) {
		setIsLoading(true);
		mainApi
			.editUserInfo(newUser.name, newUser.email)
			.then((res) => {
				if (res.message) {
					handleFormsErrorMessage(res.message);
				} else {
					setCurrentUser(res);
					handleFormsErrorMessage(SERVER_OK_MESSAGE);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}
	
	function handleLogOut() {
		// Сбрасываем все стейты
		setAllMovies([]);
		setAllSavedMovies([]);
		setAllSavedMoviesIds([]);
		setFilteredMovies([]);
		setCountFilteredMovies(0);
		setDisplayedMovies([]);
		setDisplayedSavedMovies([]);
		setCountDisplayedMovies(0);
		setMoviesPerRow(0);
		setMoreButtonVisible(false);
		setSearchText("");
		setSearchSavedText("");
		setNewSearch(false);
		setMoviesMessage("");
		setCurrentUser({});
		setLoggedIn(false);
		setShortMovies({
			state: true,
			toggleCheckbox: toggleCheckbox,
		});
		setWrongToken(false);
		localStorage.removeItem("token");
		localStorage.removeItem("filteredMovies");
		localStorage.removeItem("searchText");
		localStorage.removeItem("shortSearch");
		history.push("/");
	}
	
	function fixMovieUrl(movie) {
		let regex = new RegExp(REGEXP_URL_CHECK);
		
		if (!movie.trailerLink || !movie.trailerLink.match(regex)) {
			let encodeName = encodeURI(movie.nameRU.replace(/ /g, "+"));
			movie.trailerLink =
				"https://www.youtube.com/results?search_query=" + encodeName;
		}
		return movie;
	}
	
	function handleMovieSave(movie) {
		mainApi
			.postMovie(movie)
			.then((savedMovie) => {
				setAllSavedMovies(prevState => [...prevState, savedMovie]);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	
	function handleMovieDelete(id) {
		let newSavedMoviesArr = [];
		allSavedMovies.forEach((movie) => {
			if (movie.movieId === id || movie.id === id && movie.owner === movie._id) {
				mainApi
					.deleteMovie(movie._id || movie.id || movie.movieId)
					.then()
					.catch((err) => {
						console.log(err);
					});
			} else {
				newSavedMoviesArr.push(movie);
			}
		});
		setAllSavedMovies(newSavedMoviesArr);
	}
	
	return (
		<>
			<CurrentUserContext.Provider value={ currentUser }>
				<ShortMoviesContext.Provider value={ shortMovies }>
					<ShortSavedMoviesContext.Provider value={ shortSavedMovies }>
						{ location === "/" ||
						location === "/movies" ||
						location === "/saved-movies" ||
						location === "/profile" ? (
							<Header loggedIn={ loggedIn }/>
						) : (
							""
						) }
						<Switch>
							<ProtectedRoute
								path="/movies"
								component={ Movies }
								onSearchForm={ handleSearch }
								movies={ displayedMovies }
								searchText={ searchText }
								loadMoreMovies={ loadMoreMovies }
								moreButtonVisible={ moreButtonVisible }
								message={ moviesMessage }
								onError={ handleMoviesErrorMessage }
								isLoading={ isLoading }
								loggedIn={ loggedIn }
								onMovieSave={ handleMovieSave }
								onMovieDelete={ handleMovieDelete }
								savedIds={ allSavedMoviesIds }
							/>
							<ProtectedRoute
								path="/saved-movies"
								component={ SavedMovies }
								onSearchForm={ handleSavedSearch }
								movies={ displayedSavedMovies }
								searchText={ searchSavedText }
								onError={ handleMoviesErrorMessage }
								isLoading={ isLoading }
								loggedIn={ loggedIn }
								onMovieDelete={ handleMovieDelete }
								savedIds={ allSavedMoviesIds }
							/>
							<ProtectedRoute
								path="/profile"
								component={ Profile }
								loggedIn={ loggedIn }
								onEditUser={ handleUpdateUser }
								formError={ formError }
								isLoading={ isLoading }
								onLogoutUser={ handleLogOut }
							/>
							{ !localStorage.getItem('token') && <Route path="/signup">
								<Register
									onRegisterUser={ handleRegisterUser }
									isLoading={ isLoading }
									formError={ formError }
								/>
							</Route> }
							{ !localStorage.getItem('token') && <Route path="/signin">
								<Login
									onLoginUser={ handleLoginUser }
									isLoading={ isLoading }
									formError={ formError }
								/>
							</Route> }
							<Route exact path="/">
								<Main/>
							</Route>
							<Route path="*">
								<PageNotFound/>
							</Route>
						</Switch>
						{ location === "/" ||
						location === "/movies" ||
						location === "/saved-movies" ? (
							<Footer/>
						) : (
							""
						) }
					</ShortSavedMoviesContext.Provider>
				</ShortMoviesContext.Provider>
			</CurrentUserContext.Provider>
		</>
	);
}

export default App;
