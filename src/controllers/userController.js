/* eslint-disable camelcase */
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
    req.flash('error', '비밀번호가 일치하지 않습니다.')
    res.status(400)
    res.render('join', { pageTitle: 'join' })
  }
  else { // register user
    try {
      const user = await new User({
        name,
        email
      })
      await User.register(user, password) // passport-local-mongoose
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
  successRedirect: routes.home,
  failureFlash: '아이디/비밀번호가 일치하지 않습니다.',
  successFlash: '환영합니다!'
})

export const logout = (req, res) => {
  req.flash('info', '로그아웃 되었습니다.')
  req.logout()
  res.redirect(routes.home)
}

// userDetail view 를 보여주는 방식 1️⃣ : 자기 자신의 userDetail 을 볼 때 사용 (/me)
// 현재 접속중인 유저(req.user) 값을 사용
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('videos')
    res.render('userDetail', { pageTitle: 'userDetail', user })
    // view 에 넘겨주는 user (req.user) 와 middleware.js 에서 view 로 넘겨주는 loggedUser (req.user) 는 같은 값이다.
  }
  catch (error) {
    console.log(error)
    res.redirect(routes.home)
  }
}

// userDetail view 를 보여주는 방식 2️⃣ : 다른 유저의 userDetail 을 볼 때 사용 (/users/:id)
// '/users/:id' 라우터를 사용해서 params 로 들어오는 id 값을 바탕으로 DB에서 검색
export const userDetail = async (req, res) => {
  const { params: { id } } = req
  try {
    const user = await User.findById(id).populate('videos')
    res.render('userDetail', { pageTitle: 'userDetail', user }) // getMe 와는 다르게 이 user 는 DB에서 찾은 user 임.
  }
  catch (error) {
    req.flash('error', '존재하지 않는 유저입니다.')
    console.log(error)
    res.redirect(routes.home)
  }
}

export const getEditProfile = (req, res) => res.render('editProfile', { pageTitle: 'editProfile' })

export const postEditProfile = async (req, res) => {
  const {
    body: { name }, file
  } = req

  const path = file ? file.location : req.user.avatarUrl

  try {
    await User.findByIdAndUpdate(req.user.id, { name, avatarUrl: path })
    req.flash('success', '프로필 변경 완료')
    res.redirect(routes.me)
  }
  catch (err) {
    console.log(err)
    req.flash('error', '프로필 변경 중 오류 발생')
    res.redirect(routes.home)
  }
}

export const getChangePassword = (req, res) => res.render('changePassword', { pageTitle: 'changePassword' })

export const postChangePassword = async (req, res) => {
  const { body: { cur_pw, new_pw1, new_pw2 } } = req

  // 비밀번호 확인이 맞야하고, 현재비번과 새로운 비번이 동일하면 안됨
  if (new_pw1 !== new_pw2 || cur_pw === new_pw1) {
    req.flash('error', '비밀번호가 일치하지 않습니다.')
    res.status(400)
    res.redirect(`${routes.users}${routes.changePassword}`)
    return
  }
  try {
    await req.user.changePassword(cur_pw, new_pw1)
    req.flash('success', '비밀번호 변경 완료')
    res.redirect(routes.me)
    // cur_pw 와 기존 사용자 pw 의 일치여부는 changePassword 내부로직에서 알아서 해줌
    // 일치 안할시 catch 문에서 잡아줌 ( [IncorrectPasswordError] )
  }
  catch (err) {
    console.log(err)
    req.flash('error', '비밀번호 변경 중 오류 발생')
    res.status(400)
    res.redirect(`${routes.users}${routes.changePassword}`)
  }
}
