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

// userDetail view 를 보여주는 방식 1️⃣ : 자기 자신의 userDetail 을 볼 때 사용 (/me)
// 현재 접속중인 유저(req.user) 값을 사용
export const getMe = (req, res) => {
  res.render('userDetail', { pageTitle: 'userDetail', user: req.user })
  // view 에 넘겨주는 user (req.user) 와 middleware.js 에서 view 로 넘겨주는 loggedUser (req.user) 는 같은 값이다.
}

// userDetail view 를 보여주는 방식 2️⃣ : 다른 유저의 userDetail 을 볼 때 사용 (/users/:id)
// '/users/:id' 라우터를 사용해서 params 로 들어오는 id 값을 바탕으로 DB에서 검색
export const userDetail = async (req, res) => {
  const { params: { id } } = req
  try {
    const user = await User.findById(id)
    console.log(user)
    res.render('userDetail', { pageTitle: 'userDetail', user })
  }
  catch (error) {
    console.log(error)
    res.redirect(routes.home)
  }
}

export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'editProfile' })
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'changePassword' })
