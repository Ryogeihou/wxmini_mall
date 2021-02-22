Page({
  getQR(){
    wx.cloud.callFunction({
      name:'qr111'
    })
    .then(console.log)
  }
})