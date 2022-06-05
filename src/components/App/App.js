import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Page404 from '../Page404/Page404';
import ModalMenu from '../ModalMenu/ModalMenu';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { formSubmitErrorText, PAGES_WITHOUT_AUT } from '../../utils/constants';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function App(props) {
	const history = useHistory();
	const location = useLocation();

	const [modalMenuState, setModalMenuState] = React.useState(false);
	const changeModalMenuState = () => {
		setModalMenuState((modalMenuState) => !modalMenuState);
	};
	const [currentUser, setCurrentUser] = React.useState({});
	const [isLoggedIn, setIsLoggedIn] = React.useState(
		localStorage.getItem('token') ? true : false
	);
	const [formSubmitError, setFormSubmitError] = React.useState(null);
	function registerUser({ name, email, password }) {
		mainApi
			.register(name, email, password)
			.then((userData) => {
				loginUser({ email, password });
			})
			.catch((err) => {
				console.log(err);
				setFormSubmitError(formSubmitErrorText);
			});
	}
	function loginUser({ email, password }) {
		mainApi
			.login(email, password)
			.then(({ token }) => {
				if (token) {
					localStorage.setItem('token', token);
					mainApi.setTokenHeaders(token);
					checkTokenAndLoadContent();
				} else {
					return;
				}
			})
			.catch((err) => {
				console.log(err);
				setFormSubmitError(formSubmitErrorText);
			});
	}
	const checkTokenAndLoadContent = React.useCallback(() => {
		const token = localStorage.getItem('token');
		if (token) {
			mainApi
				.checkToken(token)
				.then((userData) => {
					// сохраняем юзера в стейт
					setCurrentUser({
						name: userData.name,
						_id: userData._id,
						email: userData.email,
					});
					setIsLoggedIn(true);
					mainApi.setTokenHeaders(token);
				})
				.then(() => {
					mainApi
						.getCards()
						.then((data) => {
							// добавляем их в стейт
							setSavedMovies(data);
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	React.useEffect(() => {
		checkTokenAndLoadContent();
	}, [checkTokenAndLoadContent]);

	React.useEffect(() => {
		if (isLoggedIn && PAGES_WITHOUT_AUT.includes(location.pathname)) {
			history.push('/movies');
		}
	}, [isLoggedIn, history, location.pathname]);
	const [initialMovies, setInitialMovies] = React.useState([]);
	const [movies, setMovies] = React.useState([]);
	const [renderedMovies, setRenderedMovies] = React.useState([]);
	const [savedMovies, setSavedMovies] = React.useState([]);
	const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
	const [moviesInputValue, setMoviesInputValue] = React.useState('');
	const [savedMoviesInputValue, setSavedMoviesInputValue] = React.useState('');
	const [shortFilmsCheckboxValue, setShortFilmsCheckboxValue] =
		React.useState(false);
	const [shortSavedFilmsCheckboxValue, setShortSavedFilmsCheckboxValue] =
		React.useState(false);
	const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
	const [badSearchResult, setBadSearchResult] = React.useState(null);
	const [isFirstSearchHappened, setIsFirstSearchHappened] =
		React.useState(false);

	return (
		<CurrentUserContext.Provider
			value={{
				modalMenuState,
				setModalMenuState,
				currentUser,
				setCurrentUser,
				isLoggedIn,
				setIsLoggedIn,
				formSubmitError,
				setFormSubmitError,
				initialMovies,
				setInitialMovies,
				movies,
				setMovies,
				savedMovies,
				setSavedMovies,
				filteredSavedMovies,
				setFilteredSavedMovies,
				renderedMovies,
				setRenderedMovies,
				moviesInputValue,
				setMoviesInputValue,
				savedMoviesInputValue,
				setSavedMoviesInputValue,
				shortFilmsCheckboxValue,
				setShortFilmsCheckboxValue,
				shortSavedFilmsCheckboxValue,
				setShortSavedFilmsCheckboxValue,
				isPreloaderVisible,
				setIsPreloaderVisible,
				badSearchResult,
				setBadSearchResult,
				isFirstSearchHappened,
				setIsFirstSearchHappened,
			}}>
			<div className='app'>
				<Switch>
					<Route exact path='/signin'>
						{/* защита от возврата на экран авторизации */}
						{() =>
							isLoggedIn ? (
								<Redirect to='/movies' />
							) : (
								<Login
									loginUser={loginUser}
									formSubmitError={formSubmitError}
									setFormSubmitError={setFormSubmitError}
								/>
							)
						}
					</Route>

					<Route exact path='/signup'>
						{/* защита от возврата на экран регистрации */}
						{() =>
							isLoggedIn ? (
								<Redirect to='/movies' />
							) : (
								<Register
									registerUser={registerUser}
									formSubmitError={formSubmitError}
									setFormSubmitError={setFormSubmitError}
								/>
							)
						}
					</Route>

					<Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
						<Header
							isLoggedIn={isLoggedIn}
							openModalMenu={changeModalMenuState}
						/>

						<Switch>
							<Route exact path='/'>
								<Main />
							</Route>

							<Route path='/movies'>
								{/* защита маршрута */}
								{() => (!isLoggedIn ? <Redirect to='/' /> : <Movies />)}
							</Route>
							<Route path='/saved-movies'>
								{/* защита маршрута */}
								{() =>
									!isLoggedIn ? (
										<Redirect to='/' />
									) : (
										<SavedMovies savedMovies={savedMovies} />
									)
								}
							</Route>
							<Route path='/profile'>
								{/* защита маршрута */}
								{() => (!isLoggedIn ? <Redirect to='/' /> : <Profile />)}
							</Route>
						</Switch>

						<Route exact path={['/', '/movies', '/saved-movies']}>
							<Footer />
						</Route>
					</Route>

					<Route path='*'>
						<Page404 />
					</Route>
				</Switch>
				<ModalMenu
					modalMenuState={modalMenuState}
					closeModalMenu={changeModalMenuState}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
