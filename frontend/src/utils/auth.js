class Auth {
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
  
    signup({ password, email }) {
        return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({ password, email })
        }).then(this._handleError);
    }

    signin({ password, email }) {
        return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({ password, email })
        }).then(this._handleError);
    }

    checkToken() {
        return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers,
        credentials: 'include'
        }).then(this._handleError);
    }
  }
  
  export const auth = new Auth({
    baseUrl: 'https://api.mesto.nakinos.nomoredomains.work',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  
  