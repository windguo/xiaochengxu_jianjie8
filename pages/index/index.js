// latest.js
var Api = require('../../utils/api.js');

const app = getApp();

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
                title: '简洁设计网提供设计欣赏、表情、签名、网名、头像等海量个性素材。',
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
        title: '首页',
        nodes: [],
        winHeight: 100,
        hidden: false,
        interval: 5000,
        duration: 500,
        logined: false,
        username: '',
        userid: '',
        token: '',
        autoplay: true,
        contentArray:[],
        contentMeiwenArray:[],
        contentshuoshuoArray:[],
        contentwangmingArray:[],
        contenttouxiangArray:[],
        contentbiaoqingArray:[],
        contentqianmingArray:[],
        contentMeituArray:[]
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
                }, 300);
                wx.hideLoading();
            }
        })
    },
    onLoad: function (options) {
        wx.showLoading({});
        // 扫码进入的判断开始
      const _scene = options.scene;
      console.log('_scene_scene', _scene);
      if (Boolean(_scene) == true) {
        if (_scene.indexOf('start_') == 0) {
          let __scene = _scene.substring(6);
          console.log('__scene', __scene);
          wx.switchTab({
            url: '../' + __scene + '/' + __scene
          });
        } else if (_scene.indexOf('classid-') == 0) {
          let _ar = _scene.split('_');
          let _classid = _ar[0].split('-');
          let _id = _ar[1].split('-');
          let _channel = _id[0];
          switch (_channel) {
            case 'duanziid':
              wx.navigateTo({
                url: '../duanzi_detail/duanzi_detail?classid=' + _classid[1] + '&id=' + _id[1]
              });
              break;
            default:
              break;
          };
        }
      };
        // 扫码进入的判断结束
        console.log("wx.getStorageSync('storageLogined')", wx.getStorageSync('storageLogined'));
        this.setData({
            logined: wx.getStorageSync('storageLogined'),
            username: wx.getStorageSync('storageLoginedUsernames')
        })
        this.fetchData();
    },
    login:function(){
        if (app.globalData.logined){
            console.log('存在登陆态啊');
            wx.navigateTo({
                url: '../my/my'
            });
        }else{
            console.log('不存在登陆态');
            wx.navigateTo({
                url: '../login/login'
            });
        }
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
