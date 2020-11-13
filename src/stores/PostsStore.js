import { makeObservable, observable, computed, action } from "mobx"

class PostsStore {
    constructor() {
        this._posts = [];

        makeObservable(this, {
            _posts: observable,

            posts: computed,

            createPost: action,
        })
    }

    get posts() {
        return this._posts;
    }

    createPost(data) {
        const post = {
            ...data,
            id: this._posts.length
        };
        this._posts.push(post)
    }
}

export default new PostsStore();
