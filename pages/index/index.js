// latest.js
var Api = require('../../utils/api.js');

Page({
    data: {
        title: '首页',
        nodes: [],
        winHeight: 100,
        hidden: false,

        interval: 5000,
        duration: 500,
        autoplay: true
    },
    fetchData: function () {
        var that = this;
        that.setData({
            hidden: false
        })
        wx.request({
            url: Api.getAllNode(),
            success: function (res) {
                console.log(res);
                that.setData({
                    nodes: res.data.result
                })
                setTimeout(function () {
                    that.setData({
                        hidden: true
                    })
                }, 300)
            }
        })
    },
    onLoad: function () {
        this.fetchData();
    },
    // 滚动切换标签样式
    swiperChange: function (e) {
        console.log('swiperChange==ee.detail.current', e.detail.current);
        this.setData({
            currentTab: e.detail.current
        });
        let _txt = '';
        if (e.detail.current == 12) {
            _txt = 'yishuzi';
        } else {
            _txt = '艺术字生成';
        }
        this.getListData(this.data.expertListId[e.detail.current], _txt);
        this.checkCor();
    },
    checkCor: function () {
        this.setData({
            scrollLeft: this.data._windowWidth / 5 * this.data.currentTab - 100
        });
    },
    changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        })
    },
})
