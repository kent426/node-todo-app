const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

const { Todo } = require('./../../models/todo')
const { User } = require('./../../models/user')





const userOneId = new ObjectID()
const userTwoId = new ObjectID()

const todosSample = [{
    _id: new ObjectID(),
    text: "first todo",
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: "second todo",
    completed: true,
    completedAt: 123,
    _creator: userTwoId
}]


const usersSample = [{
    _id: userOneId,
    email: 'kent@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
},{
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]

}]



const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todosSample)
    }).then(() => done())
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var user1 = new User(usersSample[0]).save();
        var user2 = new User(usersSample[1]).save();
        
        return Promise.all([user1, user2]);
    }).then(() => done())

}

module.exports= {
    todosSample,
    populateTodos,
    usersSample,
    populateUsers

}