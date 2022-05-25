import React from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./App.css";
import Navigation from "../Navigation/Navigation";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {
  ShortMovieDuration,
  DesktopMoviesNumber,
  MobileMoviesNumber
} from '../../utils/constants';
import Preloader from "../Preloader/Preloader";

function App() {
  const history = useHistory();
  const location = useLocation()
  const [checking,setChecking] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
  });
  

  const [error, setError] = React.useState("");
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
  
  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setIsLoading(true);
          setCurrentUser(res);
          setLoggedIn(true);
          if (location.pathname === "/signup" || location.pathname === "/signin") {
            history.push("/movies");
          } else {
            history.push(location.pathname);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          return err;
        })
    }
  }

  const [isFormDisabled, setIsFormDisabled] = React.useState(false);

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  function handleLogin(email, password) {
    setError("");
    setIsErrorVisible(false);
    setIsFormDisabled(true);

    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          history.push("/movies");
          setError("");
          setIsErrorVisible(false);
        }
        return res;
      })
      .catch((err) => {
        setError("Вы ввели неправильный логин или пароль.");
        setIsErrorVisible(true);
        return err;
      })
      .finally(() => {
        setIsFormDisabled(false);
      })
  }

  function handleSignUp(name, email, password) {
    setError("");
    setIsErrorVisible(false);
    setIsFormDisabled(true);

    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res.message) {
          setError("При регистрации пользователя произошла ошибка.");
          setIsErrorVisible(true);
        }
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setIsFormDisabled(false);

        mainApi
          .authorize(email, password)
          .then((res) => {
            if (res.token) {
              setLoggedIn(true);
              history.push("/movies");
              setError("");
              setIsErrorVisible(false);
            }
            return res;
          })
          .catch((err) => {
            setError("При регистрации пользователя произошла ошибка.");
            setIsErrorVisible(true);
            return err;
          });
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('movies');
    localStorage.removeItem('saved-movies');
    localStorage.removeItem('search-query');
    history.push("/");
  }

  const [isNavOpen, setNavState] = React.useState(false);
  const changeNavState = () => {
    setNavState(!isNavOpen);
  };

  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [serverErr, setServerErr] = React.useState(false);

  function getMovies() {
    setIsLoading(true);

    moviesApi
      .getInitialMovies()
      .then((initialMovies) => {
        setMovies(initialMovies);
      })
      .catch((err) => {
        setServerErr(true);
        return err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const [savedMovies, setSavedMovies] = React.useState([]);

  function getSavedMovies() {
    mainApi
      .getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies.reverse());
      })
      .catch((err) => {
        return err;
      });
  }

  function handleMovieState(movie) {
    const isSaved = savedMovies.some(
      (m) =>
        (m.movieId === movie.id || m.movieId === movie.movieId) &&
        m.owner === currentUser._id
    );

    if (isSaved) {
      mainApi
        .deleteMovie(
          movie._id || savedMovies.find((m) => m.movieId === movie.id)._id
        )
        .then((newMovie) => {
          setSavedMovies(
            savedMovies.filter(
              (m) =>
                m.movieId !== newMovie.movieId && m.owner === currentUser._id
            )
          );
        });
    } else {
      mainApi.saveMovie(movie).then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      });
    }
  }

  const [message, setMessage] = React.useState('');
  const [isMessageVisible, setIsMessageVisible] = React.useState(false);

  function handleUpdateUserInfo(data) {
    setIsFormDisabled(true);

    mainApi
      .setProfileInfo(data.email, data.name)
      .then((res) => {
        if (res.message) {
          setError("При обновлении профиля произошла ошибка.");
          setIsErrorVisible(true);
        } else {
          setCurrentUser(res);
          setError("");
          setIsErrorVisible(false);
          setMessage('Данные профиля успешно обновлены.');
          setIsMessageVisible(true);
        }
        return res;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setIsFormDisabled(false);
      })
  }

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  function getScreenWidth() {
    setScreenWidth(window.innerWidth);
  }

  function handleScreenWidth() {
    window.addEventListener("resize", getScreenWidth);
  }

  React.useEffect(() => {
    setTimeout(handleScreenWidth, 10000);
  }, [screenWidth]);

  const [cardsQuantity, setCardsQuantity] = React.useState(0);
  const [clickNumber, setClickNumber] = React.useState(0);

  React.useEffect(() => {
    setClickNumber(clickNumber);
  }, [clickNumber]);

  function controlCardsQuantity() {
    let n;

    if (screenWidth >= 1280) {
      n = 12 + clickNumber * DesktopMoviesNumber;
    } else if (screenWidth < 1280 && screenWidth >= 768) {
      n = 8 + clickNumber * MobileMoviesNumber;
    } else if (screenWidth < 768) {
      n = 5 + clickNumber * MobileMoviesNumber;
    }

    return setCardsQuantity(n);
  }

  const [checkboxState, setCheckboxState] = React.useState(false);

  function handleCheckboxState() {
    setCheckboxState(!checkboxState);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          changeNavState={changeNavState}
          loggedIn={loggedIn}
          history={history}
        />
        <Switch><Route exact path="/">
            { loggedIn ? <Redirect to="/movies"/> : <Main/> }
          </Route>
  

          <ProtectedRoute
            path="/profile"
            component={loggedIn ? Profile : Main}
            loggedIn={loggedIn}
            onLogOut={handleLogOut}
            history={history}
            onUpdateUserInfo={handleUpdateUserInfo}
            error={error}
            setError={setError}
            setIsErrorVisible={setIsErrorVisible}
            isErrorVisible={isErrorVisible}
            message={message}
            setMessage={setMessage}
            isMessageVisible={isMessageVisible}
            setIsMessageVisible={setIsMessageVisible}
            isFormDisabled={isFormDisabled}
          />

          <ProtectedRoute
            path="/movies"
            component={loggedIn ? Movies : Main}
            loggedIn={loggedIn}
            isLoading={isLoading}
            setClickNumber={setClickNumber}
            clickNumber={clickNumber}
            savedMovies={savedMovies}
            controlCardsQuantity={controlCardsQuantity}
            cardsQuantity={cardsQuantity}
            movies={movies}
            serverErr={serverErr}
            setServerErr={setServerErr}
            checkboxState={checkboxState}
            handleCheckboxState={handleCheckboxState}
            changeMovieState={(movie) => handleMovieState(movie)}
            getMovies={getMovies}
            getSavedMovies={getSavedMovies}
            screenWidth={screenWidth}
            ShortMovieDuration={ShortMovieDuration}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={loggedIn ? SavedMovies : Main}
            movies={savedMovies}
            isLoading={isLoading}
            setClickNumber={setClickNumber}
            clickNumber={clickNumber}
            serverErr={serverErr}
            setServerErr={setServerErr}
            checkboxState={checkboxState}
            handleCheckboxState={handleCheckboxState}
            loggedIn={loggedIn}
            changeMovieState={(movie) => handleMovieState(movie)}
            getSavedMovies={getSavedMovies}
            getMovies={getMovies}
            screenWidth={screenWidth}
            controlCardsQuantity={controlCardsQuantity}
            cardsQuantity={cardsQuantity}
            ShortMovieDuration={ShortMovieDuration}
          />

          <Route path="/signin">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login
                history={history}
                loggedIn={loggedIn}
                error={error}
                isErrorVisible={isErrorVisible}
                onLogin={handleLogin}
                //tokenCheck={tokenCheck}
                isFormDisabled={isFormDisabled}
              />
            )}
          </Route>

          <Route path="/signup">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register
                history={history}
                error={error}
                isErrorVisible={isErrorVisible}
                onRegister={handleSignUp}
                isFormDisabled={isFormDisabled}
              />
            )}
          </Route>

          <Route path="*">
            <PageNotFound history={history}/>
          </Route>
        </Switch>

        <Navigation
          isOpen={isNavOpen}
          changeState={changeNavState}
        />
        <Footer
          history={history}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

