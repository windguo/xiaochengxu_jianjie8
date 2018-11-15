// latest.js
var Api = require('../../utils/api.js');
var WxParse = require('../../wxParse/wxParse.js')


var app = getApp();
Page({
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log('res.target===', res.target);
            return {
                title: this.data.contentArray[res.target.id].title,
                imageUrl: this.data.contentArray[res.target.id].titlepic,
                success: (res) => {
                    wx.showToast({
                        content: '分享成功'
                    });
                },
                fail: (res) => {
                    wx.showToast({
                        content: '分享失败,原因是' + res
                    });
                }
            }
        } else {
            return {
                title: '简洁设计网提供表情、签名、网名等个性素材。',
                imageUrl: '../../indexPic.png',
                success: (res) => {
                    wx.showToast({
                        content: '分享成功'
                    });
                },
                fail: (res) => {
                    wx.showToast({
                        content: '分享失败,原因是' + res
                    });
                }
            }
        }
    },
    data: {
        index: null,
        winHeight: "",//窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        expertListi: [],
        expertList: [],
        expertListId: [],
        _windowWidth: wx.getSystemInfoSync().windowWidth,
        contentArray: [],
        title:'',
        newstext:''
    },
    onLoad: function (options) {
        wx.showLoading({})
        wx.setNavigationBarTitle({
            title: '详情页'
        })
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/shuoshuo/?getJson=content&id=' + options.id,
            method: 'GET',
            dataType: 'json',
            success: (json) => {
                var that = this;
                WxParse.wxParse('article', 'html', json.data.result['newstext'], that, 5);
                this.setData({
                    title:json.data.result['title']
                });
                wx.hideLoading();
            }
        });
        var that = this;
        //  高度自适应
        wx.getSystemInfo({
            success: function (res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR - 98;
                that.setData({
                    winHeight: calc
                });
            }
        });
    }
})