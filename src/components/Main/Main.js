import React from "react";
import Header from "../Header/Header";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import Intro from "../Intro/Intro"

function Main({ isLoggedIn }) {
  return (
    <>
      <main className="content">
      <Header isLoggedIn={isLoggedIn} />
        <Intro />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}

export default Main;
