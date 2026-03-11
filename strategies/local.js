const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const crypto = require('crypto');

function getHash(password) {
  const hash = crypto.createHash('sha1');
  hash.update(password);
  return hash.digest("hex");
}

// Konfigurasi Passport
const config = {
  usernameField: 'email',
  passwordField: 'password'
}; 

const local = new LocalStrategy(config, async (email, password, done) => {
  try {
    const user = await User.findOne({ email }); 
    if (!user) {
      return done(null, false, { message: 'Email tidak ditemukan.' }); 
    }
    

    const pwHash = getHash(password);
    if (user.password !== pwHash) {
      return done(null, false, { message: 'Password salah.' }); 
    }
    
    done(null, {
      _id: user._id,
      email: user.email,
      name: user.name
    }); 
  } catch (err) {
    done(err, null); 
  }
});

module.exports = local;