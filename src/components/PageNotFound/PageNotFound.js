import React from "react";
import { Link } from "react-router-dom";

import "./PageNotFound.css";

function PageNotFound() {
  return(
    <div className="not-found">
      <h2 className="not-found__code">404</h2>
      <p className="not-found__caption">Страница не найдена</p>
      <Link to="/" className="not-found__link">
        Назад
      </Link>
    </div>
  )
}

export default PageNotFound;