import { makeObservable, observable, computed, action } from "mobx"

class UserStore {
    constructor() {
        this.user = null;

        makeObservable(this, {
            _user: observable,

            user: computed,

            login: action,
            logout: action,
        })
    }

    get user() {
        return this.user;
    }

    login(user) {
        this._user = user;
    }

    logout() {
        this._user = null
    }
}


export default UserStore;
