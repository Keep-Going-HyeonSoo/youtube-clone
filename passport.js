import passport from 'passport'
import passportGithub2 from 'passport-github2'
import User from './models/User'

const GitHubStrategy = passportGithub2.Strategy

// local strategy
passport.use(User.createStrategy())

// github strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: 'https://3000-ff35f1ec-99c8-49dc-8780-d2093bd0b279.ws-us03.gitpod.io/auth/github/callback'
},
(accessToken, refreshToken, profile, done) => {
  console.log(accessToken, refreshToken, profile, done)
}))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
