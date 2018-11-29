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
        const _scene = options.scene;
        // const _scene = decodeURIComponent(options.scene);
        console.log('_scene_scene', options);
        if (Boolean(options.scene) == true) {
            console.log('../duanzi_detail/duanzi_detail?id=' + _scene);
            wx.navigateTo({
                url: '../duanzi_detail/duanzi_detail?id=' + _scene
            });
            return false;
        }
        console.log("wx.getStorageSync('storageLogined')", wx.getStorageSync('storageLogined'));
        this.setData({
            logined: wx.getStorageSync('storageLogined'),
            username: wx.getStorageSync('storageLoginedUsernames')
        })
        this.fetchData();
        this.getShowListData(this.data.currentTab);
        this.getMeituListData(this.data.currentTab);
        this.getMeiwenListData(this.data.currentTab);
        this.getshuoshuoListData(this.data.currentTab);
        this.getwangmingListData(this.data.currentTab);
        this.gettouxiangListData(this.data.currentTab);
        this.getbiaoqingListData(this.data.currentTab);
        this.getqianmingListData(this.data.currentTab);
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
    getShowListData: function (classid, more) {
        let that = this;
        let _arr = this.data.contentArray;
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/show/?getJson=column&pageSize=4&classid=' + classid,
            method: 'GET',
            dataType: 'json',
            success: (json) => {
                console.log('json.data.result---', json);
                if (more) {
                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            titlepic: 'https://www.yishuzi.com.cn/allStaticFiles' + json.data.result[index].titlepic.substring(30)
                        });
                    };
                    _arr = _arr.concat(_newArr);
                    that.setData({
                        contentArray: _arr
                    });
                } else {

                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            titlepic: 'https://www.yishuzi.com.cn/allStaticFiles' + json.data.result[index].titlepic.substring(30)
                        });
                    };
                    console.log('===', _newArr);
                    that.setData({
                        contentArray: _newArr
                    });
                };
                console.log('contentArray--==', this.data.contentArray);
                wx.hideLoading();
            }
        })
    },
    getMeituListData: function (classid, more) {
        let that = this;
        let _arr = this.data.contentMeituArray;
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/meitu/?getJson=column&pageSize=4&classid=' + classid,
            method: 'GET',
            dataType: 'json',
            success: (json) => {
                console.log('json.data.result---', json);
                if (more) {
                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            titlepic: 'https://www.yishuzi.com.cn/allStaticFiles' + json.data.result[index].titlepic.substring(30)
                        });
                    };
                    _arr = _arr.concat(_newArr);
                    that.setData({
                        contentMeituArray: _arr
                    });
                } else {

                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            titlepic: 'https://www.yishuzi.com.cn/allStaticFiles' + json.data.result[index].titlepic.substring(30)
                        });
                    };
                    console.log('===', _newArr);
                    that.setData({
                        contentMeituArray: _newArr
                    });
                };
                console.log('contentMeituArray--==', this.data.contentMeituArray);
                wx.hideLoading();
            }
        })
    },
    gettouxiangListData: function (classid, more) {
        let that = this;
        let _arr = this.data.contenttouxiangArray;
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/touxiang/?getJson=column&pageSize=4&classid=' + classid,
            method: 'GET',
            dataType: 'json',
            success: (json) => {
                console.log('json.data.result---', json);
                if (more) {
                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            titlepic: 'https://www.yishuzi.com.cn/allStaticFiles' + json.data.result[index].titlepic.substring(30)
                        });
                    };
                    _arr = _arr.concat(_newArr);
                    that.setData({
                        contenttouxiangArray: _arr
                    });
                } else {

                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            titlepic: 'https://www.yishuzi.com.cn/allStaticFiles' + json.data.result[index].titlepic.substring(30)
                        });
                    };
                    console.log('===', _newArr);
                    that.setData({
                        contenttouxiangArray: _newArr
                    });
                };
                console.log('contenttouxiangArray--==', this.data.contenttouxiangArray);
                wx.hideLoading();
            }
        })
    },
    getbiaoqingListData: function (classid, more) {
        let that = this;
        let _arr = this.data.contentbiaoqingArray;
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/biaoqing/?getJson=column&pageSize=4&classid=' + classid,
            method: 'GET',
            dataType: 'json',
            success: (json) => {
                console.log('json.data.result---', json);
                if (more) {
                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            titlepic: 'https://www.yishuzi.com.cn/allStaticFiles' + json.data.result[index].titlepic.substring(30)
                        });
                    };
                    _arr = _arr.concat(_newArr);
                    that.setData({
                        contentbiaoqingArray: _arr
                    });
                } else {

                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            titlepic: 'https://www.yishuzi.com.cn/allStaticFiles' + json.data.result[index].titlepic.substring(30)
                        });
                    };
                    console.log('===', _newArr);
                    that.setData({
                        contentbiaoqingArray: _newArr
                    });
                };
                console.log('contentbiaoqingArray--==', this.data.contentbiaoqingArray);
                wx.hideLoading();
            }
        })
    },
    getMeiwenListData: function (classid, more) {
        let that = this;
        let _arr = this.data.contentMeiwenArray;
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/meiwen/?getJson=column&pageSize=4&classid=' + classid,
            method: 'GET',
            dataType: 'json',
            success: (json) => {
                console.log('json.data.result---', json);
                if (more) {
                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            smalltext: json.data.result[index].smalltext
                        });
                    };
                    _arr = _arr.concat(_newArr);
                    that.setData({
                        contentMeiwenArray: _arr
                    });
                } else {

                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            smalltext: json.data.result[index].smalltext
                        });
                    };
                    console.log('===', _newArr);
                    that.setData({
                        contentMeiwenArray: _newArr
                    });
                };
                console.log('contentMeiwenArray--==', this.data.contentMeiwenArray);
                wx.hideLoading();
            }
        })
    },
    getshuoshuoListData: function (classid, more) {
        let that = this;
        let _arr = this.data.contentshuoshuoArray;
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/shuoshuo/?getJson=column&pageSize=4&classid=' + classid,
            method: 'GET',
            dataType: 'json',
            success: (json) => {
                console.log('json.data.result---', json);
                if (more) {
                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            smalltext: json.data.result[index].smalltext
                        });
                    };
                    _arr = _arr.concat(_newArr);
                    that.setData({
                        contentshuoshuoArray: _arr
                    });
                } else {

                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            smalltext: json.data.result[index].smalltext
                        });
                    };
                    console.log('===', _newArr);
                    that.setData({
                        contentshuoshuoArray: _newArr
                    });
                };
                console.log('contentshuoshuoArray--==', this.data.contentshuoshuoArray);
                wx.hideLoading();
            }
        })
    },
    getwangmingListData: function (classid, more) {
        let that = this;
        let _arr = this.data.contentwangmingArray;
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/wangming/?getJson=column&pageSize=4&classid=' + classid,
            method: 'GET',
            dataType: 'json',
            success: (json) => {
                console.log('json.data.result---', json);
                if (more) {
                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            smalltext: json.data.result[index].smalltext
                        });
                    };
                    _arr = _arr.concat(_newArr);
                    that.setData({
                        contentwangmingArray: _arr
                    });
                } else {

                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            smalltext: json.data.result[index].smalltext
                        });
                    };
                    console.log('===', _newArr);
                    that.setData({
                        contentwangmingArray: _newArr
                    });
                };
                console.log('contentwangmingArray--==', this.data.contentwangmingArray);
                wx.hideLoading();
            }
        })
    },
    getqianmingListData: function (classid, more) {
        let that = this;
        let _arr = this.data.contentqianmingArray;
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/qianming/?getJson=column&pageSize=4&classid=' + classid,
            method: 'GET',
            dataType: 'json',
            success: (json) => {
                console.log('json.data.result---', json);
                if (more) {
                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            smalltext: json.data.result[index].smalltext
                        });
                    };
                    _arr = _arr.concat(_newArr);
                    that.setData({
                        contentqianmingArray: _arr
                    });
                } else {

                    let _newArr = [];
                    for (let index = 0; index < json.data.result.length; index++) {
                        _newArr.push({
                            classid: json.data.result[index].classid,
                            id: json.data.result[index].id,
                            title: json.data.result[index].title,
                            smalltext: json.data.result[index].smalltext
                        });
                    };
                    console.log('===', _newArr);
                    that.setData({
                        contentqianmingArray: _newArr
                    });
                };
                console.log('contentqianmingArray--==', this.data.contentqianmingArray);
                wx.hideLoading();
            }
        })
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
