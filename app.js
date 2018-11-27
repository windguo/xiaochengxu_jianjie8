//app.js
const app = getApp();

App({
  globalData:{
    token:null,
    rnd: '',
    username: '',
    usernames: '',
    avatarUrl: '',
    logined: false,
    sessionkey:'',
    userid:null
  },
  onLaunch: function () {
  }
})
