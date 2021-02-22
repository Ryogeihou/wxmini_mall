// pages/detail/detail.js
import regeneratorRuntime from'../../lib/runtime/runtime';
import Poster from '../../miniprogram_dist/poster/poster';

const db = wx.cloud.database() //获取数据库实例
const app = getApp()
const posterConfig = {
  jdConfig: {
      width: 750,
      height: 1334,
      backgroundColor: '#fff',
      debug: false,
      pixelRatio: 1,
      blocks: [
          {
              width: 690,
              height: 808,
              x: 30,
              y: 183,
              borderWidth: 2,
              borderColor: '#f0c2a0',
              borderRadius: 20,
          },
          {
              width: 634,
              height: 74,
              x: 59,
              y: 770,
              backgroundColor: '#fff',
              opacity: 0.5,
              zIndex: 100,
          },
      ],
      texts: [
          {
              x: 113,
              y: 61,
              baseLine: 'middle',
              text: '伟仔',
              fontSize: 32,
              color: '#8d8d8d',
          },
          {
              x: 30,
              y: 113,
              baseLine: 'top',
              text: '发现一个好物，推荐给你呀',
              fontSize: 38,
              color: '#080808',
          },
          {
              x: 92,
              y: 810,
              fontSize: 38,
              baseLine: 'middle',
              text: '标题标题标题标题标题标题标题标题标题',
              width: 570,
              lineNum: 1,
              color: '#8d8d8d',
              zIndex: 200,
          },
          {
              x: 59,
              y: 895,
              baseLine: 'middle',
              text: [
                  {
                      text: '2人拼',
                      fontSize: 28,
                      color: '#ec1731',
                  },
                  {
                      text: '¥99',
                      fontSize: 36,
                      color: '#ec1731',
                      marginLeft: 30,
                  }
              ]
          },
          {
              x: 522,
              y: 895,
              baseLine: 'middle',
              text: '已拼2件',
              fontSize: 28,
              color: '#929292',
          },
          {
              x: 59,
              y: 945,
              baseLine: 'middle',
              text: [
                  {
                      text: '商家发货&售后',
                      fontSize: 28,
                      color: '#929292',
                  },
                  {
                      text: '七天退货',
                      fontSize: 28,
                      color: '#929292',
                      marginLeft: 50,
                  },
                  {
                      text: '运费险',
                      fontSize: 28,
                      color: '#929292',
                      marginLeft: 50,
                  },
              ]
          },
          {
              x: 360,
              y: 1065,
              baseLine: 'top',
              text: '长按识别小程序码',
              fontSize: 38,
              color: '#080808',
          },
          {
              x: 360,
              y: 1123,
              baseLine: 'top',
              text: '超值好货一起拼',
              fontSize: 28,
              color: '#929292',
          },
      ],
      images: [
          {
              width: 62,
              height: 62,
              x: 30,
              y: 30,
              borderRadius: 62,
              url: 'https://7268-rhtest-xncrn-1301029421.tcb.qcloud.la/11.png?sign=f36a49fee5dfa90050337ca46c3fe5c8&t=1608729901',
          },
          {
              width: 634,
              height: 634,
              x: 59,
              y: 210,
              url: 'https://7268-rhtest-xncrn-1301029421.tcb.qcloud.la/11.png?sign=f36a49fee5dfa90050337ca46c3fe5c8&t=1608729901',
          },
          {
              width: 220,
              height: 220,
              x: 92,
              y: 1020,
              url: 'https://7268-rhtest-xncrn-1301029421.tcb.qcloud.la/11.png?sign=f36a49fee5dfa90050337ca46c3fe5c8&t=1608729901',
          },
          {
              width: 750,
              height: 90,
              x: 0,
              y: 1244,
              url: 'https://7268-rhtest-xncrn-1301029421.tcb.qcloud.la/11.png?sign=f36a49fee5dfa90050337ca46c3fe5c8&t=1608729901',
          }
      ]

  },
  demoConfig: {
      width: 750,
      height: 1000,
      backgroundColor: '#fff',
      debug: false,
      blocks: [
          {
              x: 0,
              y: 10,
              width: 750, // 如果内部有文字，由文字宽度和内边距决定
              height: 120,
              paddingLeft: 0,
              paddingRight: 0,
              borderWidth: 10,
              borderColor: 'red',
              backgroundColor: 'blue',
              borderRadius: 40,
              text: {
                  text: [
                      {
                          text: '金额¥ 1.00',
                          fontSize: 80,
                          color: 'yellow',
                          opacity: 1,
                          marginLeft: 50,
                          marginRight: 10,
                      },
                      {
                          text: '金额¥ 1.00',
                          fontSize: 20,
                          color: 'yellow',
                          opacity: 1,
                          marginLeft: 10,
                          textDecoration: 'line-through',
                      },
                  ],
                  baseLine: 'middle',
              },
          }
      ],
      texts: [
          {
              x: 0,
              y: 180,
              text: [
                  {
                      text: '长标题长标题长标题长标题长标题长标题长标题长标题长标题',
                      fontSize: 40,
                      color: 'red',
                      opacity: 1,
                      marginLeft: 0,
                      marginRight: 10,
                      width: 200,
                      lineHeight: 40,
                      lineNum: 2,
                  },
                  {
                      text: '原价¥ 1.00',
                      fontSize: 40,
                      color: 'blue',
                      opacity: 1,
                      marginLeft: 10,
                      textDecoration: 'line-through',
                  },
              ],
              baseLine: 'middle',
          },
          {
              x: 10,
              y: 330,
              text: '金额¥ 1.00',
              fontSize: 80,
              color: 'blue',
              opacity: 1,
              baseLine: 'middle',
              textDecoration: 'line-through',
          },
      ],
      images: [
          {
              url: 'https://7268-rhtest-xncrn-1301029421.tcb.qcloud.la/11.png?sign=f36a49fee5dfa90050337ca46c3fe5c8&t=1608729901',
              width: 300,
              height: 300,
              y: 450,
              x: 0,
              // borderRadius: 150,
              // borderWidth: 10,
              // borderColor: 'red',
          },
          {
              url: 'https://7268-rhtest-xncrn-1301029421.tcb.qcloud.la/11.png?sign=f36a49fee5dfa90050337ca46c3fe5c8&t=1608729901',
              width: 100,
              height: 100,
              y: 450,
              x: 400,
              borderRadius: 100,
              borderWidth: 10,
          },
      ],
      lines: [
          {
              startY: 800,
              startX: 10,
              endX: 300,
              endY: 800,
              width: 5,
              color: 'red',
          }
      ]

  }
}
Page({
  data: {
    id: 0,
    info: {},
    carts: [],
    introduce: [],
    isCollect: false,
    posterConfig: posterConfig.jdConfig,
    qrcode:[],
  },
  onLoad (query) {
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    // const scene = decodeURIComponent(query.scene)    
    if (query && query.scene) {
      const scene = decodeURIComponent(query.scene) // 处理扫码进商品详情页面的逻辑
      console.log("scene:",scene)
      if (scene && scene.split('_').length >= 2) {
        query.id = scene.split('_')[0]
        // wx.setStorageSync('referrer', scene.split(',')[1])
        console.log("上级ID:",scene.split('_')[1])
      }
    }
    this.data.id = query.id
  },
  onShow: function () {
    // let pages = getCurrentPages();
    // let currentPage = pages[pages.length - 1];
    // let options = currentPage.options
    // const { id } = options;
    // console.log(id)

      //入口判断 扫码渠道进入ID则为空值   判断已在onload中
    // if(id!=undefined){
    //   this.setData({
    //     id: options.id
    //   })
      //若不加入判断则从扫码入口进入时，此函数将在onload后再次赋空值给data
      this.getGoodsDetail(this.data.id)
    // }
  },
  getGoodsDetail(id) {
    // 判断商品是否被收藏
    // console.log(id)

    let collect = wx.getStorageSync("userInfo").collection || [];
    let isCollect = collect.some(function (value) {
      return value.rhid == id
    })
    // 数据库调用商品信息
    const ins = db.collection('rhnewbee').where({ 'rhid': Number(id) })
    ins.update({
      data: {
        count: db.command.inc(1)
      }
    })
    ins.field({
      "_id": true,
      "price": true,
      "title": true,
      "pics": true,
      "subHead": true,
      "introduce": true,
      "rhid": true
    }).get({
      success: res => {
        // console.log(res)
        // console.log(res.data.rhid,options)

        this.setData({
          info: res.data[0],
          isCollect
        })
      }
    });
    // wx.getStorageSync("userInfo").collect || []; v  === this.info.rhid

    // var aaa = this.data.info
    // console.log(collect, aaa)
    // console.log(id)


  },
  //点击商品收藏
  handleCollect() {
    var id = Number(this.data.id)
    let isCollect = false;
    // 1 获取缓存中的商品收藏数组
    // console.log('id',id)
    let userInfo = wx.getStorageSync("userInfo") || [];
    let collect = userInfo.collection || [];
    // 2 判断商品是否被收藏过
    let index = collect.findIndex(v => v.rhid === id)
    // let isCollect = userInfo.collection.some(function (value) {
    //   return value == id
    // });
    // console.log(index,id)

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
      var info = this.data.info
      // console.log(this.data.info.pics)
      if (this.data.info.pics == null) {
        var pics = []
      } else {
        var pics = this.data.info.pics[0]
      }
      let briefGoodsInfo = {
        "price": info.price,
        "title": info.title,
        "pics": pics,// 无图报错
        "subHead": info.subHead,
        "rhid": info.rhid
      };
      collect.push(briefGoodsInfo);
      console.log(briefGoodsInfo)
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: false
      });
    }
    // 4 把数组存入缓存
    wx.setStorageSync("userInfo", userInfo);
    // console.log(userInfo)
    // 5 修改data中的属性
    this.setData({
      isCollect
    })
    // 同步数据库 待优化 暂时把简化后商品信息存入DB 希望DB只保存rhid
    const ins = db.collection('userInfo')
      .where({ '_openid': userInfo._openid })
    ins.update({
      data: {
        'collection': collect
      }
    })
  },



  //点击加入购物车
  handleCartAdd(e) {
    // let info=this.info
    // console.log(e.currentTarget)
    // console.log("dataset",e.currentTarget,"\noptions",this.options,"\nlist",info)
    const { item } = e.currentTarget.dataset //小程序里传递数据的一个方法
    const i = app.globalData.carts.findIndex(v => v._id == item._id)
    if (i > -1) {
      // 已经存在，数量加一
      app.globalData.carts[i].num += 1
    } else {
      item.num = 1
      item.checked = true
      app.globalData.carts.push(item)
    }
    app.setTabbar()
    wx.showToast({
      title: '加入成功',
      icon: 'succes',
      //防止手抖
      // mask: true
    });
  },
  async toShare(e) {
    // console.log(e)
    await this.getQR(e)
    // console.log(qr)
    // time.sleep(1)
    console.log( this.getQR(e))
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/goods_code/goods_code?id=' + id+ '&qrcode=' + this.data.qrcode +'&itemPhoto='+ this.data.info.pics[0],
    })
    console.log(e)
  },
  getQR(e){
    wx.cloud.callFunction({
      name:'qr111',
      data:{
        rhid:e.currentTarget.id, 
        userId:1
      },
      success:res=>{
        this.setData({
          qrcode:res.result.fileID
        })
        // console.log(res.result.fileID)
        // console.log(this.data.qrcode)
        return this.toNavigateTo()
      }
    })
  },
  toNavigateTo(){
        wx.navigateTo({
      url: '/pages/goods_code/goods_code?id=' + this.data.id+ '&qrcode=' + this.data.qrcode +'&itempic='+ this.data.info.pics[0],
    })
  },
  onPosterSuccess(e) {
    const { detail } = e;
    wx.previewImage({
        current: detail,
        urls: [detail]
    })
},
onPosterFail(err) {
    console.error(err);
},
onCreatePoster() {
  this.setData({ posterConfig: posterConfig.demoConfig }, () => {
      Poster.create(true);    // 入参：true为抹掉重新生成
  });
},

onCreateOtherPoster() {
  this.setData({ posterConfig: posterConfig.jdConfig }, () => {
      Poster.create(true);    // 入参：true为抹掉重新生成 
  });
}
  // 点击轮播图 放大预览
  // handlePrevewImage(){
  //   const urls = GoodsInfo.pics.map(v=>v.pics);
  //   wx.wx.previewImage({
  //     current: urls[0],
  //     urls: urls,
  //   });
  // },
  // addCart(e){
  //   const {item} = e.currentTarget.dataset //小程序里传递数据的一个方法
  //   const i = app.globalData.carts.findIndex(v=>v._id==info._id)
  //   if(i>-1){
  //     // 已经存在，数量加一
  //     app.globalData.carts[i].num += 1
  //   }else{
  //     item.num = 1
  //     app.globalData.carts.push(item)
  //   }
  //   app.setTabbar()
  //   wx.showToast({
  //     title: '加入成功',
  //     icon: 'succes',
  //     //防止手抖
  //     mask: true
  //   });
  // },
  
})
