var app = getApp();
Page({
    data: {
        username:'',
        avatarUrl:'',
        usernames:''
    },
    onLoad: function () {
        console.log('app.globalData.usernameapp.globalData.username==', app.globalData.username);
        this.setData({
            username: wx.getStorageSync('storageLoginedNickName'),
            avatarUrl: wx.getStorageSync('storageLoginedavAtarUrl'),
            usernames: wx.getStorageSync('storageLoginedUsernames')
        })
        wx.setNavigationBarTitle({
            title: '会员中心'
        })
    }
})