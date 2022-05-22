import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <div className="techs">
      <h2 className="techs__header">Технологии</h2>
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="techs__elements">
        <div className="techs__element">HTML</div>
        <div className="techs__element">CSS</div>
        <div className="techs__element">JS</div>
        <div className="techs__element">React</div>
        <div className="techs__element">Git</div>
        <div className="techs__element">Express.js</div>
        <div className="techs__element">mongoDB</div>
      </div>
    </div>
  );
}

export default Techs;
