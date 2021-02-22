Page({
  data:{
    id:0,
    qrcode:"",
    itempic:"",
  },
  onLoad: function (options) {
    this.setData({
      id:options.id,
      qrcode:options.qrcode,
      itempic:options.itempic
    })
  },
  
  onReady: function () {
    var context = wx.createCanvasContext('canvas')

    // const img = canvas.createImage()
    // const qr = canvas.createImage()
    // this.drawBall()
    // this.interval = setInterval(this.drawBall, 17)
    // const img = context.createImage()
    // const qr = context.createImage()
    // img.onload = () => {
    //   this._img = img
    // }
    // qr.onload = () => {
    //   this._qr = qr
    // }
    // img = '../pic/111.png',
    // qr.src = './11 (2).png'
    context.drawImage("", 0, 0, 300,300)
    context.draw()

  },
  drawImg(){
    console.log("hello world")
  }
})
