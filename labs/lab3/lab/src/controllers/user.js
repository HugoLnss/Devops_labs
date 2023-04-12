const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    db.exists(user.username, (err, res) => {
      if (err) return callback(err, null)
      if (res) return callback(new Error('User already exists'), null)
    db.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })
    })
  },
  get: (username, callback) => {
  //   // TODO create this method
  db.hgetall(username, (err, res) => {
      if (err) return callback(err, null)
      if (!res) return callback(new Error('User not found'), null)
      const user = {
        username: username,
        firstname: res.firstname,
        lastname: res.lastname
      }
      callback(null, user) // Return callback
  })
  }
}
