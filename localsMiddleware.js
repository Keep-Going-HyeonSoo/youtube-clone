import routes from './routes'

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'HyeonTube'
  res.locals.routes = routes
  res.locals.user = {
    isAuthenticated: true,
    id: 24
  }
  next()
}
