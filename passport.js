/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import passport from 'passport'
import passportGithub2 from 'passport-github2'
import User from './models/User'

const GitHubStrategy = passportGithub2.Strategy

// local strategy
passport.use(User.createStrategy())

// github strategy
passport.use(
  new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'https://3000-ff35f1ec-99c8-49dc-8780-d2093bd0b279.ws-us03.gitpod.io/auth/github/callback',
    scope: 'user:email' // // scope 지정 안해주면 email 이 private 일 경우 email 값 못 받아옴
  },
  // 사용자가 app 의 github API 사용을 승인 후, github 에서 app 으로 넘어오는 사용자 데이터
  async (accessToken, refreshToken, profile, done) => {
    const {
      login, avatar_url, id
    } = profile._json
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
        user.save()
        return done(null, user)
      }

      // else : 신규 유저 ( DB 에 해당 email 유저가 없음 )
      const newUser = await User.create({
        email,
        login,
        githubId: id,
        avatarUrl: avatar_url
      })
      return done(null, newUser)
    }
    catch (error) {
      return done(error)
    }
  })
)

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
