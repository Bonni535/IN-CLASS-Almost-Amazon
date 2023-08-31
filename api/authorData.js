import client from "../utils/client";

const endpoint = client.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });
const getAuthorsByUid = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });
const getFavoriteAuthors = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseObj) => Object.values(responseObj))
      .then((dataArr) => dataArr.filter((author) => author.favorite === true))
      .then((favoriteAuthors) => resolve(favoriteAuthors))
      .catch(reject);
  });

// FIXME: UPDATE AUTHOR
const updateAuthor = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${payload.firebaseKey}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: CREATE AUTHOR
const createAuthor = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${firebaseKey}.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${firebaseKey}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const favouriteAuthor = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/author.json?orderBy="sale"&equalTo=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="favourite"&equalTo=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  favouriteAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
  getAuthorsByUid,
  getFavoriteAuthors,
};
