export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResult = (res) => {
  if (res.ok) {
    console.log('res1',res)
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
};

export const getMovies = () => {
  return fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResult)
}
