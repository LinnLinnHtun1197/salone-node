const express = require('express');
const helmet = require('helmet');
const { Strategy } = require('passport-google-oauth20');

require('dotenv').config();

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
};

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
};

function verifyCallBack(accessToken, refreshToken, profile, done) {
    console.log('Google Profile', profile);
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallBack));

const app = express();

app.use(helmet());

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email'],
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: false
}), (req, res) => {
    console.log('google call us back')
});

app.get('/auth/logout', (req, res) => {
    // Perform logout logic
});

app.get('/secret', (req, res) => {
    // Your secret route logic
});

app.get('/failure', (req, res) => {
    // Failure route logic
});

app.get('/', (req, res) => {
    // Your homepage route logic
});

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { pathname } = new URL(request.url);
  
  if (pathname.startsWith('/auth/google/callback')) {
    return new Response('Google OAuth callback route', { status: 200 });
  }

  if (pathname.startsWith('/secret')) {
    // Perform authentication check here
    return new Response('Your personal secret value is 42!', { status: 200 });
  }

  // Handle other routes
  return new Response('Hello World!', { status: 200 });
}
