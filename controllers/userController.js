import routes from '../routes'
import User from '../models/User'

export const getJoin = (req, res) => res.render('join', { pageTitle: 'join' })

export const postJoin = async (req, res) => {
  const {
    body: {
      name, email, password, password2
    }
  } = req // const password = req.body.password
  if (password !== password2) {
    res.status(400)
    res.render('join', { pageTitle: 'join' })
  } else {
    // to do : register usera
    try {
      const user = await new User({
        name,
        email
      })
      await User.register(user, password)
    } catch (error) {
      console.log(error)
    }

    // to do : log user in
    // ...

    // redirect
    res.redirect(routes.home)
  }
}
export const getLogin = (req, res) => res.render('login', { pageTitle: 'login' })
export const postLogin = (req, res) => {
  // to do : Process user login
  res.redirect(routes.home)
}
export const logout = (req, res) => {
  // to do : Process user logout
  /* res.locals 로 user의 인증상태를 변경할려고 했는데 이 방법으로는 안됨
  console.log('res.locals.user', res.locals.user)
  res.locals.user.isAuthenticated = false
  console.log('res.locals.user', res.locals.user)
  */
  res.redirect(routes.home)
}
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'editProfile' })
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'changePassword' })
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'userDetail' })
