import React from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from '../context/CurrentUserContext';
import './App.css';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isUserChecked, setIsUserChecked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState();
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [moviesFiltered, setMoviesFiltered] = React.useState([]);
  const [moviesFilteredShow, setMoviesFilteredShow] = React.useState([]);
  const [savedMoviesFiltered, setSavedMoviesFiltered] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  const [preloader, setPreloader] = React.useState(false);
  const [moviesQty, setMoviesQty] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [showMoreButton, setShowMoreButton] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  
  const history = useHistory();
  const location = useLocation();
  
  React.useEffect(() => {
    setMessage(null);
  }, [location]);
  
  React.useEffect(() => {
    const qty = getMoviesQty(0, moviesFiltered);
    setMoviesQty(qty)
    setMoviesFilteredShow(moviesFiltered.slice(0, qty))
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesFiltered]);
  
  React.useEffect(() => {
    setMoviesFilteredShow(moviesFiltered.slice(0, moviesQty))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesQty]);
  
  function getMoviesQty(page, moviesFilter) {
    
    let defaultQty = 0;
    let addQty = 0;
    
    if (windowWidth < 685) {
      defaultQty = 5;
      addQty = 2;
    } else if (windowWidth < 1101) {
      defaultQty = 8;
      addQty = 2;
    } else {
      defaultQty = 12;
      addQty = 3;
    }
    
    let finalQty = defaultQty + addQty * page;
    finalQty = finalQty > moviesFilter.length ? moviesFilter.length : finalQty;
    if (finalQty < moviesFilter.length) {
      setShowMoreButton(true);
    } else {
      setShowMoreButton(false);
    }
    return finalQty;
  }
  
  function changeQuantity() {
    if (moviesFiltered.length && moviesQty !== getMoviesQty(0, moviesFiltered)) {
      setPage(0);
      setMoviesQty(getMoviesQty(0, moviesFiltered));
    }
  }
  
  React.useEffect(() => {
    setMessage(null);
    
    const handleResize = function () { setWindowWidth(window.innerWidth) };
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  React.useEffect(() => {
    changeQuantity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);
  
  React.useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    mainApi.getMovies()
      .then((res) => {
        const savedMovies = res;
        setSavedMovies(savedMovies);
      })
      .catch(err => console.log(err));
  }, [isLoggedIn]);
  
  React.useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  function handleRegistration(name, email, password) {
    mainApi.register(name, email, password)
      .then(res => {
        handleAuthorization(email, password);
      })
      .catch((err) => {
        setMessage(err);
      })
  }
  
  function handleTokenCheck() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      mainApi.checkToken()
        .then(() => {
          setIsLoggedIn(true);
          getUserDate();
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
          history.push('/signin');
        })
      
    } else {
      setIsUserChecked(true);
    }
    
  }
  
  function handleAuthorization(email, password) {
    mainApi.authorize(email, password)
      .then(res => {
        setIsLoggedIn(true);
        getUserDate();
      })
      .catch((err) => {
        setMessage(err);
      })
  }
  
  function getUserDate() {
    mainApi.getUserData()
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsUserChecked(true);
      })
  }
  
  function handleUpdateUser(name, email) {
    mainApi.setUserProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
        setMessage("Данные пользователя изменены")
      })
      .catch((err) => {
        console.log(err);
        setMessage(err);
      })
  }
  
  
  function handleSignout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser();
    localStorage.clear();
    setMoviesFiltered([]);
    setSavedMoviesFiltered([]);
    setMovies([]);
  }
  
  function getAllMovies() {
    
    if (!movies.length) {
      return moviesApi.getMovies().then(res => {
        setMovies(res);
        return res;
      }).catch(err => {
        console.log(err);
        setMessage(err);
      });
    } else {
      return new Promise((resolve, reject) => resolve(movies));
    }
  }
  
  function handleSearchMovies(search, checked) {
    setMoviesFiltered([]);
    if (search) {
      getAllMovies().then(moviesAll => {
        setPreloader(true);
        setMessage(null);
        const moviesFilter = moviesAll.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(search.toLowerCase()) && (!checked || (movie.duration <= 40));
        })
        setTimeout(() => {
          setMoviesFiltered(moviesFilter);
          setPreloader(false);
          if (moviesFilter.length === 0) {
            setMessage("Ничего не найдено")
          } else {
            localStorage.setItem('search', JSON.stringify(search));
            localStorage.setItem('checked', JSON.stringify(checked));
            localStorage.setItem('moviesFilter', JSON.stringify(moviesFilter));
          }
          setMoviesQty(getMoviesQty(0, moviesFilter));
        }, 1000)
      }).catch(err => {
        console.log(err);
        setMessage(err);
      })
    } else {
      setMessage("Нужно ввести ключевое слово");
    }
  }
  
  function handleSearchSavedMovies(search, checked) {
    setMessage(null);
    const moviesFilter = savedMovies.filter((movie) => {
      return (!search || movie.nameRU.toLowerCase().includes(search.toLowerCase())) && (!checked || (movie.duration <= 40));
    })
    if (moviesFilter.length === 0 && search) {
      setMessage("Ничего не найдено")
    } else {
      localStorage.setItem('searchSaved', JSON.stringify(search));
      localStorage.setItem('checkedSaved', JSON.stringify(checked));
      localStorage.setItem('moviesFilterSaved', JSON.stringify(moviesFilter));
    }
    setSavedMoviesFiltered(moviesFilter);
  }
  
  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  function isSaved(movieId) {
    for (let i = 0; i < savedMovies.length; i++) {
      if (movieId === savedMovies[i].movieId) return true;
    }
    return false;
  }
  
  function handleDeleteMovie(movieId) {
    let id = null;
    let newSavedMovies = [...savedMovies];
    for (let i = 0; i < savedMovies.length; i++) {
      if (movieId === savedMovies[i].movieId) {
        id = savedMovies[i]._id;
        newSavedMovies.splice(i, 1);
        setSavedMovies(newSavedMovies);
        break;
      }
    }
    mainApi.deleteMovie(id)
      .then((newMovie) => {
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  
  function handleAddPageMovies() {
    
    const qty = getMoviesQty(page + 1, moviesFiltered);
    setMoviesQty(qty)
    setMoviesFilteredShow(moviesFiltered.slice(0, qty))
    setPage(page + 1);
  }
  
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path='/signin'>
            {isLoggedIn ? <Redirect to="/movies" /> : <Login onLogin={handleAuthorization} message={message} setMessege={setMessage} />}
          </Route>
          <Route path="/signup">
            {isLoggedIn ? <Redirect to="/movies" /> : <Register onRegister={handleRegistration} message={message} setMessege={setMessage} />}
          </Route>
          
          <Route exact path='/'>
            <Main isLoggedIn={isLoggedIn} />
          </Route>
          
          <Route path='/movies'>
            {isUserChecked ?
              <ProtectedRoute isLoggedIn={isLoggedIn} component={Movies}
                              movies={moviesFilteredShow}
                              onSubmit={handleSearchMovies}
                              onSaveMovie={handleSaveMovie}
                              isSaved={isSaved}
                              onDeleteMovie={handleDeleteMovie}
                              message={message}
                              preloader={preloader}
                              setMovies={setMoviesFiltered}
                              page={page}
                              setPage={setPage}
                              showMoreButton={showMoreButton}
                              handleAddPage={handleAddPageMovies}
              />
              : null}
          </Route>
          <Route path='/saved-movies'>
            {isUserChecked ?
              <ProtectedRoute isLoggedIn={isLoggedIn} component={SavedMovies}
                              movies={savedMoviesFiltered}
                              onSubmit={handleSearchSavedMovies}
                              onDeleteMovie={handleDeleteMovie}
                              message={message}
                              moviesOrigin={savedMovies}
                              setMovies={setSavedMoviesFiltered}
                              moviesFiltered={moviesFiltered} />
              : null}
          </Route>
          <Route path='/profile'>
            {isUserChecked ?
              <ProtectedRoute isLoggedIn={isLoggedIn} component={Profile}
                              onSignOut={handleSignout}
                              onUpdateUser={handleUpdateUser}
                              message={message} />
              : null}
          </Route>
          
          
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
