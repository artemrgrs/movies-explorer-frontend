const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const handleError = (err) => {
  return err;
};

class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getInitialMovies() {
    return fetch(`${this._url}`, {
      //movies
      method: "GET",
      headers: {
        ...this._headers,
        //Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(handleOriginalResponse)
      .catch(handleError);
  }
}

const api = new Api({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
