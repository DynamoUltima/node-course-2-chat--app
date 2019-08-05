const expect = require('expect');

const { Users } = require('./users')


describe('Users', () => {

    var users;
    

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Joel',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'John',
            room: 'React Course'
        }, {
            id: '3',
            name: 'James',
            room: 'Node Course'
        }]
    })




    it('it should add new users', () => {
        var users = new Users();

        var user = {
            id: '123',
            name: 'Joel',
            room: 'Mest'
        }

        var resUsers = users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual([resUsers])
    })

    it('should return names for Node Course',()=>{
        var userList= users.getUserList('Node Course')

        expect(userList).toEqual(['Joel','James']);
    })

    it('should return names for React Course', () => {
        var userList = users.getUserList('React Course')

        expect(userList).toEqual(['John']);
    })

})