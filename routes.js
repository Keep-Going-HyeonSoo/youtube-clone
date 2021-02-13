// 라우터 구조의 유지보수성을 위해 path 를 상수로 처리

// Global
const HOME = '/'
const JOIN = '/join'
const LOGIN = '/login'
const LOGOUT = '/logout'
const SEARCH = '/search'

// Users

const USERS = '/users'
const USER_DETAIL = '/:id'
const EDIT_PROFILE = '/edit-profile'
const CHANGE_PASSWORD = '/change-password'
const ME = '/me'

// Videos

const VIDEOS = '/videos'
const UPLOAD = '/upload'
const VIDEO_DETAIL = '/:id' // /videos/123
const EDIT_VIDEO = '/:id/edit' // /videos/123/edit
const DELETE_VIDEO = '/:id/delete' // /videos/123/delete

// Github Login

const GITHUB_LOGIN = '/auth/github'
const GITHUB_LOGIN_CB = '/auth/github/callback'

// Facebook Login

const FACEBOOK_LOGIN = '/auth/facebook'
const FACEBOOK_LOGIN_CB = '/auth/facebook/callback'

// API

const API = '/api'
const INC_VIEW_COUNT = '/:id/view' // video의 조회수 증가시키기

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (id) => {
    if (id) return `/${id}`
    return USER_DETAIL
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: (id) => {
    if (id) return `/${id}`
    return VIDEO_DETAIL
  },
  editVideo: (id) => {
    if (id) return `/${id}/edit`
    return EDIT_VIDEO
  },
  deleteVideo: (id) => {
    if (id) return `/${id}/delete`
    return DELETE_VIDEO
  },
  githubLogin: GITHUB_LOGIN,
  githubLoginCB: GITHUB_LOGIN_CB,
  facebookLogin: FACEBOOK_LOGIN,
  facebookLoginCB: FACEBOOK_LOGIN_CB,
  me: ME,
  api: API,
  incViewCount: INC_VIEW_COUNT
}

export default routes
