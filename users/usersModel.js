const db = require('../database/dbConfig');

module.exports = {
    add,
    findBy,
    findById
}


function findBy(filter) {
    return db('users')
    .select('id', 'username', 'password')
    .where(filter)
}


function findById(id) {
    return db('users')
    .select('id', 'username', 'password')
    .where({id})
    .first()
}


function add(user) {
    return db('users')
    .insert(user, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id)
    })
}