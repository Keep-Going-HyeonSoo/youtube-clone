/* eslint-disable no-underscore-dangle */
import passport from 'passport'
import passportGithub2 from 'passport-github2'
import FacebookStrategy from 'passport-facebook'
import User from './models/User'
import { githubStrategyCallback, facebookStrategyCallback } from './controllers/socialLoginController'

// local strategy
passport.use(User.createStrategy())

// github strategy

const GitHubStrategy = passportGithub2.Strategy

passport.use(
  new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'https://3000-ff35f1ec-99c8-49dc-8780-d2093bd0b279.ws-us03.gitpod.io/auth/github/callback',
    scope: 'user:email' // // scope 지정 안해주면 email 이 private 일 경우 email 값 못 받아옴
  },
  githubStrategyCallback)
)

// facebook strategy

passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: 'https://3000-ff35f1ec-99c8-49dc-8780-d2093bd0b279.ws-us03.gitpod.io/auth/facebook/callback'
  },
  facebookStrategyCallback)
)

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
