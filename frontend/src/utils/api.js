class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}. ${res.statusText}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this._handleError);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
       headers: this._headers
    }).then(this._handleError);
  }

  editProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    }).then(this._handleError);
  }

  editProfileAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    }).then(this._handleError);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    }).then(this._handleError);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId} `, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleError);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId} `, {
      method: 'PUT',
      headers: this._headers
    }).then(this._handleError);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId} `, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleError);
  }

  changeLikeCardStatus(cardId, isLike) {
    return isLike ? this.likeCard(cardId) : this.unlikeCard(cardId);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: 'c12bf14b-6b87-475d-91b9-c3e4fe46ec1c',
    'Content-Type': 'application/json'
  }
});


