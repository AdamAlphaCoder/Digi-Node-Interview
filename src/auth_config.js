const { Strategy: LocalStrategy } = require('passport-local')

const User = require('./models/User')

// Declare Passport strategies
module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((_id, done) => {
    User.findById(_id)
      .select('name email')
      .then(user => {
        done(null, user)
      })
      .catch(err => {
        done(err, false)
      })
  })

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .select('name email password')
        .exec((err, user) => {
          if (err) return done(err)
          if (!user) return done(null, false, { message: "User doesn't exist" })
          user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err)
            if (!isMatch)
              return done(null, false, { message: 'Incorrect password' })
            done(null, user)
          })
        })
    })
  )
}
