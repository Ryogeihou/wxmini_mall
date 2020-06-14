// pages/my/my.js
Page({
  data: {
    userInfo: {},
    collectionNums: 0,
    brandcollectNums: 0
  },
  onShow () {
    const userInfo = wx.getStorageSync("userInfo") || [];
    // console.log(userInfo,Object.keys(userInfo))
    if (Object.keys(userInfo)!==[]) {
      const collect = userInfo.collection;
      const brandCollection = userInfo.brandCollection
      this.setData({
        userInfo,
        collectionNums: collect.length,
        brandcollectNums: brandCollection.length
      })
    }

  }

})