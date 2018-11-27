var app = getApp();
Page({
    data: {
        username:'',
        avatarUrl:'',
        usernames:'',
        rnd:'',
        index:0,
        objectArray:[],
        _classid:'',
        contents:'',
        sessionkey:''
    },
    onLoad: function () {
        this.setData({
            avatarUrl: wx.getStorageSync('storageLoginedavAtarUrl'),
            sessionkey: wx.getStorageSync('storageSessionkey'),
            rnd: wx.getStorageSync('storageRnd'),
            usernames: wx.getStorageSync('storageLoginedUsername')
        });
        wx.setNavigationBarTitle({
            title: '发布句子'
        });
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/juzi/?getJson=class&classid=225&publish=1',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'GET',
            dataType: 'json',
            success: (json) => {
                console.log('class-json', json.data.result);
                this.setData({
                    objectArray: json.data.result
                });
            }
        })
    },
    bindPickerChange: function (e) {
        console.log('bindPickerChangebindPickerChangebindPickerChange--', e);
        this.setData({
            _classid: this.data.objectArray[e.detail.value].classid,
            index: e.detail.value
        })
    },
    formSubmit:function(e){
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        if (e.detail.value.smalltext == '') {
            wx.showModal({
                content: '请输入内容',
                showCancel: false,
                confirmColor: '#ff5a00'
            })
            setTimeout(function () {
                wx.hideToast()
            }, 2000);
            return false;
        };
        wx.request({
            url: 'https://www.yishuzi.com.cn/e/api/jianjie8_xiaochengxu/publish.php',
            data: {
                sessionkey: this.data.sessionkey,
                smalltext: e.detail.value.smalltext,
                title: e.detail.value.smalltext,
                ecmsfrom: 'xiaochengxu',
                username: wx.getStorageSync('storageLoginedUsername'),
                enews: 'MAddInfo',
                rnd: wx.getStorageSync('storageRnd'),
                mid: '25',
                classid: e.detail.value['classid'],
                addnews:'提交'
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            dataType: 'json',
            success: (json) => {
                console.log('---===-----json====', json);
                wx.showToast({
                    title: json.data.message,
                    icon: 'success',
                    duration: 2000,
                    success:function(){
                        wx.redirectTo({
                            url: '../publish_juzi/publish_juzi'
                        });
                    }
                });

            }
        })
    }
})