var app = getApp();
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '大家喜欢的精品网名小程序,赶紧来看看',
      // path:'/',
      imageUrl:'../../indexPic.png',
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
  },
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertListi:[],
    expertList: [],
    expertListId:[],
    _windowWidth : wx.getSystemInfoSync().windowWidth,
    contentArray:[]
  },
  copyTBL: function (e) {
    console.log('wwweeee',e);
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

  getListData:function(classid,more){
    let that = this;
    let _arr = this.data.contentArray;
    wx.request({
      url: 'https://jianjiexcx.92kaifa.com/wangmingApi/?getJson=column&classid=' + classid,
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        console.log('json.data.result', json.data.result);
        if (more){
          // _arr.slice(_arr,json.data.result);
          _arr = _arr.concat(json.data.result);
          that.setData({
            contentArray: _arr
          });
        }else{
          that.setData({
            contentArray: json.data.result
          });
        };
        console.log('contentArray--==',this.data.contentArray);
      }
    })
  },
  // 滚动切换标签样式
  swiperChange: function (e) {
    console.log('swiperChange==e', e);
    this.setData({
      currentTab: e.detail.current
    });
    this.getListData(this.data.expertListId[e.detail.current]);
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    console.log('eee--click',e);
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    };
    this.getListData(this.data.expertListId[cur]);
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    this.setData({
      scrollLeft: this.data._windowWidth / 5 * this.data.currentTab - 100
    });
  },
  onLoad: function () {
    let _classid = [];
    let _expertListi = [];
    wx.request({
      url: 'https://jianjiexcx.92kaifa.com/wangmingApi/?getJson=class',
      method: 'GET',
      dataType: 'json',
      success: (json) => {
        for (var i = 0; i < json.data.result.length; i++) {
           _expertListi.push(i)
          _classid.push(json.data.result[i].classid);
        };
        this.setData({
          expertList: json.data.result,
          expertListi: _expertListi,
          expertListId:_classid
        });
      }
    });
    this.getListData(this.data.currentTab);
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
  },
  scrolltolowerLoadData: function(e){
    console.log('scrolltolowerLoadData', e);
    this.getListData(this.data.expertListId[this.data.currentTab],true);
  }
})