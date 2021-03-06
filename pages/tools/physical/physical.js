var app = getApp();

Page({
  data: {
    scoreList: [],
    pullDownFlag: true
  },

  onLoad: function() {
    this.getScore();
  },

  onPullDownRefresh: function() {
    var _pullDownFlag = this.data.pullDownFlag;

    if (_pullDownFlag) {
      this.data.pullDownFlag = false;

      this.getScore();
      wx.stopPullDownRefresh();
    }
  },

  getScore: function() {
    // 加载中
    wx.showLoading({
      title: '获取中',
      mask: true
    });

    wx.request({
      url: app.api + '/physical',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + app.store.token
      },
      success: requestRes => {
        var _requestRes = requestRes.data;

        if (_requestRes.statusCode === 200) {
          this.setData({
            scoreList: _requestRes.data
          });
        } else {
          wx.showToast({
            title: '获取失败',
            image: '/images/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取失败',
          image: '/images/common/fail.png',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
        this.data.pullDownFlag = true;
      }
    });
  },

  fold: function(e) {
    var index = e.currentTarget.id;
    var fold = this.data.scoreList[index].fold;
    this.data.scoreList[index].fold = fold ? false : true;

    this.setData({
      scoreList: this.data.scoreList
    });
  }
});
