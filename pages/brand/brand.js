// pages/brand/brand.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand: {},
    list: [],
    folded: false,
    isBrandInfoUnfold: false,
    isCollect: false,
    id:0
  },
  // 折叠
  handleFold() {
    this.folded = !this.folded
    this.isBrandInfoUnfold = !this.isBrandInfoUnfold
    // let a =!a,
    // isBrandInfoUnfold =!isBrandInfoUnfold
    // console.log(a,isBrandInfoUnfold)
    var folded = this.folded
    var isBrandInfoUnfold = this.isBrandInfoUnfold
    this.setData({
      folded,
      isBrandInfoUnfold
    })
    // console.log(this.folded, this.isBrandInfoUnfold)
  },

  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options
    const id = Number(options.id);
    this.setData({
      id
    })
    this.getBrandDetail(id)
    wx.hideLoading()
  },

  getBrandDetail(id) {
    // 判断商品是否被收藏
    console.log(id)
    let collect = wx.getStorageSync("userInfo").brandCollection || [];
    let isCollect = collect.some(function (value) {
      return value.brandId == id
    })
    // 数据库调用商品信息
    const ins = db.collection('brand').where({ 'brandId': id })
    ins.update({
      data: {
        count: db.command.inc(1)
      }
    })
    ins.field({
      bgpic: true,
      title: true,
      onSale: true,
      logo: true,
      intro: true,
      homePage: true,
      brandId: true,
      slogan:true
    }).get({
      success: res => {
        this.setData({
          brand: res.data[0],
          isCollect
        })
      }
    });
  },
  handleCollect() {
    var id = Number(this.data.id)
    console.log(id)
    let isCollect = false;
    // 1 获取缓存中的商品收藏数组
    let userInfo = wx.getStorageSync("userInfo") || [];
    let collect = userInfo.brandCollection || [];
    // 2 判断商品是否被收藏过
    let index = collect.findIndex(v => v.brandId === id)
    // 3 当index！==-1表示已经收藏过
    if (index !== -1) {
      // 能找到 已收藏 在数组中删除该商品
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: false
      });
    } else {
      // 未收藏
      var brand = this.data.brand
     
      let briefBrandInfo = {
        "brandId": brand.brandId,
        "logo": brand.logo,
        "slogan": brand.slogan,// 无图报错
        "title": brand.title,
      };
      collect.push(briefBrandInfo);
      // console.log(briefBrandInfo)
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: false
      });
    }
    // 4 把数组存入缓存
    wx.setStorageSync("userInfo", userInfo);
    console.log(userInfo)
    // 5 修改data中的属性
    this.setData({
      isCollect
    })
    // 同步数据库 待优化 暂时把简化后商品信息存入DB 希望DB只保存rhid
    // const ins = db.collection('userInfo')
    //   .where({ '_openid': userInfo._openid })
    // ins.update({
    //   data: {
    //     'collection': collect
    //   }
    // })
  },
})