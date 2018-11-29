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
                title: this.data.title,
                path: '/pages/duanzi_detail/duanzi_detail?id=' + this.data.id,
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
                title: this.data.title,
                path: '/pages/duanzi_detail/duanzi_detail?id=' + this.data.id,
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
        smalltext:'',
        avatarUrl:'',
        id:'',
        qrodeImg:'',
        width:'',
        height:'',
        height:'',
        shareTempFilePath:'',
        tempFilePath:'',
        newstext:''
    },
    onLoad: function (options) {
        wx.showLoading({})
        wx.setNavigationBarTitle({
            title: '段子详情页'
        });
        this.setData({
            username: wx.getStorageSync('storageLoginedNickName'),
            avatarUrl: wx.getStorageSync('storageLoginedavAtarUrl'),
            id:options.id,
            usernames: wx.getStorageSync('storageLoginedUsernames')
        })
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/duanzi/?getJson=content&id=' + options.id,
            method: 'GET',
            dataType: 'json',
            success: (json) => {
                console.log('duanzi_detail---',json.data);
                var that = this;
                WxParse.wxParse('article', 'html', json.data.result['smalltext'], that, 5);
                this.setData({
                    title: json.data.result['title'],
                    smalltext: json.data.result['smalltext'],
                    id: options.id
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
        this.getListData(this.data.currentTab);
    },
    getListData: function (classid, more) {
        let that = this;
        let _arr = this.data.contentArray;
        wx.request({
            url: 'https://www.yishuzi.com.cn/jianjie8_xiaochengxu_api/xiaochengxu/duanzi/?getJson=column&classid=' + classid,
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
                            smalltext: json.data.result[index].smalltext.replace(/<[^<>]+>/g, '')
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
                            smalltext: json.data.result[index].smalltext.replace(/<[^<>]+>/g, '')
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
    copyTBL: function (e) {
        console.log('wwweeee', e);
        var self = this;
        wx.setClipboardData({
            data: e.currentTarget.dataset.text.trim(),
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        wx.showToast({
                            title: '复制成功',
                        })
                    }
                })
            }
        })
    },
    drawText: function (ctx, str, initHeight, titleHeight, canvasWidth) {
        var lineWidth = 0;
        var lastSubStrIndex = 0; //每次开始截取的字符串的索引
        for (let i = 0; i < str.length; i++) {
            lineWidth += ctx.measureText(str[i]).width;
            if (lineWidth > canvasWidth) {
                ctx.fillText(str.substring(lastSubStrIndex, i), 15, initHeight);//绘制截取部分
                initHeight += 30;//20为字体的高度
                lineWidth = 0;
                lastSubStrIndex = i;
                // titleHeight += 30;
            }
            if (i == str.length - 1) {//绘制剩余部分
                ctx.fillText(str.substring(lastSubStrIndex, i + 1), 30, initHeight);
            }
        }
        console.log('----initHeight--', initHeight);
        // 标题border-bottom 线距顶部距离
        // titleHeight = titleHeight + 10;
        return titleHeight
    },
    //创建海报
    creat: function () {
        let that = this;
        wx.getImageInfo({
            src: 'https://www.yishuzi.com.cn/e/api/jianjie8_xiaochengxu/qrode.php?path=' + encodeURIComponent("pages/duanzi_detail/duanzi_detail") + '&scene=' + this.data.id + '&width=200&channel=duanzi',
            success: function (res) {
                console.log('that.data', res);
                that.setData({
                    tempFilePath:res.path
                });
                // 开始绘画
                const ctx = wx.createCanvasContext('shareCanvas');
                ctx.setFillStyle('#fff');
                let _width = 600;
                // ctx.fillRect(0, 0, _width, 400)
                ctx.fillRect(0, 0, _width, 500);
                ctx.setFontSize(18);
                ctx.fillStyle = "#555555";
                ctx.lineWidth = 0;
                var str = that.data.smalltext.replace(/<[^<>]+>/g, '').substring(0, 180) + '...';
                var titleHeight = 50; // 标题的高度
                var canvasWidth = _width - 340;//计算canvas的宽度
                var initHeight = 50;//绘制字体距离canvas顶部初始的高度
                // 标题border-bottom 线距顶部距离
                titleHeight = that.drawText(ctx, str, initHeight, titleHeight, canvasWidth);// 调用行文本换行函数
                console.log('titleHeight---', str.height);
                ctx.moveTo(30, titleHeight);
                // 创建渐变
                var gradient = ctx.createLinearGradient(0, 0, canvasWidth, 0);
                gradient.addColorStop("0", "magenta");
                gradient.addColorStop("0.5", "blue");
                gradient.addColorStop("1.0", "red");
                // 用渐变填色
                ctx.fillStyle = gradient;
                ctx.stroke() //绘制已定义的路径
                ctx.setFontSize(12);
                ctx.fillText('识别二维码,访问更多内容...', 40, 450)

                ctx.drawImage(that.data.tempFilePath, 190, 395, 100, 100);

                ctx.draw(true, setTimeout(function () {
                    wx.canvasToTempFilePath({
                        canvasId: 'shareCanvas',
                        success: (res) => {
                            that.setData({
                                shareTempFilePath: res.tempFilePath
                            });
                            // that.saveImageToPhotosAlbum();
                            // 预览图片
                            that.previewImage(that.data.shareTempFilePath);
                        }
                    })
                }, 100))
            }
        })
    },
    previewImage: function (e) {
        console.log('eee', e);
        var current = e;
        wx.previewImage({
            current: current,
            urls: ['' + current + '']
        })
    },
    //保存至相册
    saveImageToPhotosAlbum: function () {
        if (!this.data.shareTempFilePath) {
            wx.showModal({
                title: '提示',
                content: '图片绘制中，请稍后重试',
                showCancel: false
            })
        }
        wx.saveImageToPhotosAlbum({
            filePath: this.data.shareTempFilePath,
            success: (res) => {
                if (res.errMsg == "saveImageToPhotosAlbum:ok") {
                    wx.showModal({
                        content: '保存成功',
                        showCancel: false
                    })
                }
            },
            fail: (err) => {
                console.log(err)
            }
        })
    }
})