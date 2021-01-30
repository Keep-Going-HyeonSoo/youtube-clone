/* eslint-disable no-underscore-dangle */
import passport from 'passport'
import routes from '../routes'
import User from '../models/User'

// github login

export const githubLogin = passport.authenticate('github', { scope: ['user:email'] })

// 사용자가 app 의 github API 사용을 승인 후, github 에서 app 으로 넘어오는 사용자 데이터
export const githubStrategyCallback = async (accessToken, refreshToken, profile, done) => {
  const {
    login, avatar_url: avatarUrl, id
  } = profile._json // const avatarUrl = profile._json.avatar_url
  const email = profile.emails[0].value
  // login: 'Keep-Going-HyeonSoo' ( name 으로 사용할 것)
  // id: 48885608 ( github 고유 식별자인듯)

  try {
    // 기존 DB 에서 github email 과 동일한 email 이 있는지 찾음
    // 즉, 이미 계정이 존재하는 사용자인지 판단
    const user = await User.findOne({ email })

    // email 계정이 기존에 존재할 경우에는 githubId 만 최신화시켜주고 save
    // 해당 email 의 사용자는 로컬로 로그인하던, github 로 로그인하던 같은 계정으로 로그인하게됨
    if (user) {
      user.githubId = id
      user.avatarUrl = avatarUrl
      user.name = login
      await user.save()
      return done(null, user)
    }

    // else : 신규 유저 ( DB 에 해당 email 유저가 없음 )
    const newUser = await User.create({
      email,
      name: login,
      githubId: id,
      avatarUrl
    })
    return done(null, newUser)
  }
  catch (error) {
    return done(error)
  }
}

export const githubLoginMiddleware = passport.authenticate('github', { failureRedirect: '/login' })

export const githubLoginSuccess = (req, res) => {
  res.redirect(routes.home)
}

// facebook login

export const facebookLogin = passport.authenticate('facebook', { scope: ['email'] })

// 사용자가 app 의 facebook API 사용을 승인 후, facebook 에서 app 으로 넘어오는 사용자 데이터
export const facebookStrategyCallback = async (accessToken, refreshToken, profile, done) => {
  const { _json: { id, name, email } } = profile

  console.dir(profile._json)

  try {
    const user = await User.findOne({ email })
    console.log(user)

    // 같은 이메일로 가입한 유저정보가 존재할때
    if (user) {
      user.facebookId = id
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large&access_token=${accessToken}`
      await user.save() // DB에 저장
      return done(null, user) // req.user 로 넘겨주기 ( serializeUser )
    }

    // 신규 사용자
    const newUser = await User.create({
      name,
      email,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large&access_token=${accessToken}`,
      facebookId: id
    })
    return done(null, newUser)
  }
  catch (err) {
    console.log(err)
    return done(err)
  }
}

export const facebookLoginMiddleware = passport.authenticate('facebook', { failureRedirect: '/login' })

export const facebookLoginSuccess = (req, res) => {
  res.redirect(routes.home)
}
