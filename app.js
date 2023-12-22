const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Sesuaikan dengan informasi kredensial OAuth 2.0
const GOOGLE_CLIENT_ID = 'your-client-id';
const GOOGLE_CLIENT_SECRET = 'your-client-secret';
const CALLBACK_URL = 'http://localhost:3000/auth/google/callback';

// Konfigurasi Passport
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    // Lakukan sesuatu dengan informasi profil pengguna
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  // Implementasi serializeUser
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  // Implementasi deserializeUser
  done(null, obj);
});

// Pengaturan session
app.use(session({ secret: 'your-session-secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Rute untuk login dan logout
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.send('Hello, ' + (req.isAuthenticated() ? req.user.displayName : 'Guest') + '!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
