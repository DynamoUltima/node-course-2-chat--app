class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user)
        return user

    }

    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        // this.users.pop(user)
        return user


    }

    getUser(id) {
        return this.users.filter((user) => user.id == id)[0]

    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room); //this checks if the user.room  is equal to the room argumet
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}


module.exports = { Users }