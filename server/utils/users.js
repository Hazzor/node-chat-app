[{
    id:'erfgdfgfdgh',
    name:'Hester',
    room:'roomOne'
}]

// addUser
// removeUser(id)
// getUser(id)
//  getUserList(room)

// use class to instantiate Users for all room.. and can carry out operation on users
class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if(user) {
            this.users = this.users.filter((user)=>{
                return user.id !== id

            });
        }

        return user;

    }

    getUser(id) {
        return this.users.find((user)=>{
            return user.id === id
        });
    }

    getUserlist (room) {
        var users = this.users.filter((user)=>{
            return user.room === room;
        });

        var nameArray = users.map((user)=>{
            return user.name;
        });

        return nameArray;
    }
}

module.exports = {Users};





// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} years old}`;
//     }
// }

// var me = new Person('Hester', 25);