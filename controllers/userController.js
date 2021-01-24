import passport from 'passport'
import routes from '../routes'
import User from '../models/User'

export const getJoin = (req, res) => res.render('join', { pageTitle: 'join' })

// 회원가입 후 바로 로그인시키기 위해서 미들웨어로 사용
export const postJoin = async (req, res, next) => {
  const {
    body: {
      name, email, password, password2
    }
  } = req // const password = req.body.password

  if (password !== password2) {
    res.status(400)
    res.render('join', { pageTitle: 'join' })
  }
  else { // register user
    try {
      const user = await new User({
        name,
        email
      })
      await User.register(user, password)
      next()
    }
    catch (error) {
      console.log(error)
      res.redirect(routes.home)
    }
  }
}

export const getLogin = (req, res) => res.render('login', { pageTitle: 'login' })

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home
})

export const logout = (req, res) => {
  req.logout()
  res.redirect(routes.home)
}
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'editProfile' })
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'changePassword' })
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'userDetail' })
