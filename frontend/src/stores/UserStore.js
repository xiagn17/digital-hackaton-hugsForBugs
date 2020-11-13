import { makeObservable, observable, computed, action } from 'mobx';
import { sendHttpRequest } from '../utils/sendHttpRequest';
import { API_LOGIN, API_ME } from '../const/API_URL';

class UserStore {
    constructor() {
        this._user = null;

        makeObservable(this, {
            _user: observable,

            user: computed,

            login: action,
            logout: action,
        });
    }

    get user() {
        return this._user;
    }

    setUser(userData) {
        this._user = userData;
    }

    async login(user) {
        const userData = await sendHttpRequest({
            url: API_LOGIN,
            data: user,
            method: 'POST',
        });

        if (userData) {
            this._user = userData;
        }
    }

    logout() {
        this._user = null;
    }
}

export default new UserStore();
