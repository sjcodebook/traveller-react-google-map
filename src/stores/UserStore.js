import { makeAutoObservable } from "mobx";

class UserStore {
    constructor() {
        makeAutoObservable(this);
    }
    currentUser = {
        id: null,
        email: null,
        name: null,
        photoUrl: null,
    };

    get isLoggedIn() {
        if (this.currentUser && this.currentUser.id) {
            return true;
        }
        return false;
    }

    setCurrentUser(id, email, name, photoUrl) {
        this.currentUser.id = id;
        this.currentUser.email = email;
        this.currentUser.name = name;
        this.currentUser.photoUrl = photoUrl;
    }

    resetStore() {
        this.currentUser = {
            id: null,
            email: null,
            name: null,
            photoUrl: null,
        };
    }
}

const userStore = new UserStore();

export default userStore;
