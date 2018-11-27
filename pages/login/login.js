const app = getApp();
Page({
    data:{
        loginedInfo:'',
        hiddenmodalput: true,
        username: "",
        password: "",
        sessionkey:'',
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    cancelM: function (e) {
        this.setData({
            hiddenmodalput: true,
        })
    },
    confirmM: function (e) {
        console.log("姓名：" + this.data.username + "密码：" + this.data.password);
        wx.request({
            url: 'https://www.yishuzi.com.cn/e/api/jianjie8_xiaochengxu/bind.php',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            dataType: 'json',
            data: {
                sessionkey: wx.getStorageSync('storageSessionkey'),
                username: this.data.username,
                password: this.data.password
            },
            success: (res) => {
                console.log('json.data===v--bind', res.data);
                if (res.data.status == 1){
                    wx.setStorageSync('storageLogined', true);
                    wx.setStorageSync('storageSessionkey', res.data.sessionkey);
                    wx.setStorageSync('storageRnd', res.data.rnd);
                    wx.getUserInfo({
                        success: function (_res) {
                            console.log('- getUserInfo -', res.data);
                            wx.setStorageSync('storageLoginedUsername', res.data.result.usernames);
                            wx.setStorageSync('storageRnd', res.data.result.rnd);
                            app.globalData.username = _res.userInfo.nickName;
                            app.globalData.avatarUrl = _res.userInfo.avatarUrl;
                            wx.navigateTo({
                                url: '../index/index'
                            });
                        },
                        fail: function () {
                            console.log('failssss');
                        }
                    })
                }else if(res.data.status == '-3') {
                    let _usernames = this.data.username + '_' + parseInt(Math.random() * 999999);
                    wx.request({
                        url:'https://www.yishuzi.com.cn/e/api/jianjie8_xiaochengxu/register.php',
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        method: 'POST',
                        dataType: 'json',
                        data: {
                            sessionkey: wx.getStorageSync('storageSessionkey'),
                            email: 'xcx_' + parseInt(Math.random() * 9999999999) + '@163.com',
                            enews: 'register',
                            ecmsfrom: 'xiaochengxu',
                            username: _usernames,
                            password: this.data.password,
                            repassword: this.data.password
                        },
                        success: (res) => {
                            console.log('res000----res',res.data);
                            wx.getUserInfo({
                                success: function (res) {
                                    console.log('- getUserInfo -', res);
                                    wx.setStorageSync('storageLoginedUsername', _usernames);
                                    wx.setStorageSync('storageLoginedavAtarUrl', res.userInfo.avatarUrl);
                                    wx.navigateTo({
                                        url: '../index/index'
                                    });
                                },
                                fail: function () {
                                    console.log('failssss');
                                }
                            })
                        }
                    })
                }else{
                    wx.showModal({
                        content: res.data.message,
                        showCancel: false,
                        confirmColor: '#ff5a00'
                    })
                    setTimeout(function () {
                        wx.hideToast()
                    }, 2000);
                    return false;
                }
                
            },
            fail: (res) => {
                console.log('fail---res', res);
            }
        })
    },
    username: function (e) {
        console.log('e.detail.valuee.detail.value', e.detail.value);
        this.setData({
            username: e.detail.value
        })
    },
    password: function (e) {
        console.log('e.detail.valuee.detail.value。password', e.detail.value);
        this.setData({
            password: e.detail.value
        })
    },
    bindGetUserInfo:function(){
        this.onLogin();
    },
    onLogin:function(){
        console.log('onLoginonLogin');
        if (wx.getStorageSync('storageLogined')) return;
        let that = this;
        wx.login({
            success: function (res) {
                console.log('comm.code', res);
                if (res.code) {
                    that.setData({
                        code:res.code
                    });
                    //发起网络请求
                    wx.request({
                        url: 'https://www.yishuzi.com.cn/e/api/jianjie8_xiaochengxu/login.php',
                        data: {
                            code: res.code
                        },
                        success: (res) => {
                            console.log('login--res.data', res.data);
                            // wx.getStorageSync('storageSessionkey') = res.data.sessionkey;
                            // app.globalData.rnd = res.data.rnd;
                            wx.setStorageSync('storageLogined',true);
                            wx.setStorageSync('storageSessionkey', res.data.sessionkey);
                            wx.setStorageSync('storageRnd',res.data.rnd);
                            if(res.data.isbind == 0){
                                console.log('未绑定账号');
                                that.setData({
                                    hiddenmodalput: false
                                })
                            }else{
                                console.log('已经绑定账号');
                                wx.setStorageSync('storageLoginedUsername', res.data.usernames);
                                wx.setStorageSync('storageRnd', res.data.rnd);
                                wx.getUserInfo({
                                    success: function (_res) {
                                        console.log('- getUserInfo -', _res.userInfo);
                                        wx.setStorageSync('storageLoginedUsernames', res.data.usernames);
                                        wx.setStorageSync('storageLoginedavAtarUrl', _res.userInfo.avatarUrl);
                                        wx.navigateTo({
                                            url: '../index/index'
                                        });
                                    },
                                    fail: function () {
                                        console.log('failssss');
                                    }
                                })
                            }
                        },
                        fail:(res)=> {
                            console.log('fail---res',res);
                        }
                    })
                }
            },
            fail: function (res) {

            }
        })
    }
})