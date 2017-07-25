const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{

var users;

beforeEach(()=>{
    users = new Users();
    users.users = [{
        id : '1',
        name : 'Hester',
        room : 'Node'
    },
    {
        id : '2',
        name : 'James',
        room : 'React'
    },
    {
        id : '3',
        name : 'Michael',
        room : 'Node'
    }];
});

    it('should add new user', ()=>{
        var users = new Users();
        var user = {
            id : '123',
            name : 'Hester',
            room : 'Rocker'
        };
        var user2 = {
            id : '134',
            name : 'haha',
            room : 'Rocker'
        };

        var resUser = users.addUser(user.id, user.name, user.room);
        var resUser = users.addUser(user2.id, user2.name, user2.room);

        expect(users.users).toEqual([user,user2]);
    });

    it('should remove user', ()=>{
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    
    it('should not remove user', ()=>{
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', ()=>{
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
 

    });

    it('should not find user', ()=>{
        var userId = '4';
        var user = users.getUser(userId);

        expect(user).toNotExist();

    });

    it('should return name for node course', ()=>{
        var userList = users.getUserlist('Node');
        expect(userList).toEqual(['Hester', 'Michael']);
    });

    it('should return name for react course', ()=>{
        var userList = users.getUserlist('React');
        expect(userList).toEqual(['James']);
    });
});