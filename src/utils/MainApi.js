export const BASE_URL = 'https://api.artemrgrs2.nomoredomains.work';

const checkResult = (res) => {

  return res.json()
    .then((res2) => {
      if (res.ok) {
        return new Promise((resolve, reject) => { resolve(res2)})
      }
      return Promise.reject(res2.message)
    })
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "name": name, "email": email, "password": password })
  })
    .then(checkResult)
    .then((data) => {
      localStorage.setItem('token', data.token);
      return data;
    })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ "email": email, "password": password })
  })
    .then(checkResult)
    .then((data) => {
      localStorage.setItem('token', data.token);
      return data;
    })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(checkResult);
};

export const getUserData = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(checkResult)
}

export const setUserProfile = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name: name,
      email: email,
    })
  })
    .then(checkResult)
}

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(checkResult)
}

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      country: movie.country || ' ',
      director: movie.director || ' ',
      duration: movie.duration || ' ',
      year: movie.year || ' ',
      description: movie.description || ' ',
      image: movie.image || ' ',
      trailer: movie.trailer || ' ',
      thumbnail: movie.thumbnail || ' ',
      nameRU: movie.nameRU || ' ',
      nameEN: movie.nameEN || ' ',
      movieId: movie.movieId || ' ',
    })
  })
    .then(checkResult)
};

export const deleteMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(checkResult)
}
