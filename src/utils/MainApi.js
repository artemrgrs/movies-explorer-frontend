class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      //movies
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  getUsers() {
    return fetch(`${this._url}/users`, {
      //movies
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        country: String(movie.country),
        director: String(movie.director),
        duration: Number(movie.duration),
        year: String(movie.year),
        description: String(movie.description),
        nameRU: String(movie.nameRU),
        nameEN: String(movie.nameEN || "nameEN"),
        movieId: Number(movie.id),
        image: String(`https://api.nomoreparties.co${movie.image.url}`),
        trailer: String(movie.trailerLink),
        thumbnail: String(
          `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
        ),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  setProfileInfo(userEmail, userName) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        email: userEmail,
        name: userName,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: String(name),
        email: String(email),
        password: String(password),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: String(email),
        password: String(password),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }
}

const api = new Api({
  url: "https://movies-explorer-api-zeta.vercel.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
