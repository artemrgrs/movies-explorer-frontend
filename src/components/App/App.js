import React from "react";
import { Route, Switch } from "react-router-dom";
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


function App() {
  const [isNavOpen, setNavState] = React.useState(false);
  const changeNavState = () => {
    setNavState(!isNavOpen)
  }

  const [isProfileFormAble, setProfileFormState] = React.useState(false);
  const changeProfileFormState = () => {
    setProfileFormState(!isProfileFormAble)
  }

  return (
      <div className="page">

        <Switch>
          <Route exact path="/">
            <Header/>
            <Main></Main>
            <Footer/>
          </Route>

          <Route path="/profile">
            <Header changeNavState={changeNavState} />
            <Profile changeFormState={changeProfileFormState} formState={isProfileFormAble}></Profile>

          </Route>

          <Route path="/movies">
            <Header changeNavState={changeNavState} />
            <Movies></Movies>
            <Footer/>
          </Route>

          <Route path="/saved-movies">
            <Header changeNavState={changeNavState} />
            <SavedMovies></SavedMovies>
            <Footer/>
          </Route>

          <Route path="/signin">
            <Login></Login>
          </Route>

          <Route path="/signup">
            <Register></Register>
          </Route>

          <Route path="*">
            <PageNotFound></PageNotFound>
          </Route>
        </Switch>

        <Navigation isOpen={isNavOpen} changeState={changeNavState}></Navigation>
      </div>
  );
}

export default App;