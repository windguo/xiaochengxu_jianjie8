const app = getApp();

Page({
    data:{
        backUrl:''
    },
    onLoad:function(){
        wx.clearStorageSync();
        wx.navigateTo({
            url: '../index/index'
        });
    }
})