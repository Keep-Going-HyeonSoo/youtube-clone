import passport from 'passport'
import routes from '../routes'

export const githubLogin = passport.authenticate('github', { scope: ['user:email'] })

export const githubLoginMiddleware = passport.authenticate('github', { failureRedirect: '/login' })

export const githubLoginSuccess = (req, res) => {
  res.redirect(routes.home)
}
