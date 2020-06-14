// pages/detail/detail.js
const db = wx.cloud.database() //获取数据库实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    info: {},
    carts: [],
    introduce: [],
    isCollect: false,
 
  },

  /**
   * 生命周期函数--监听页面加载
   */



  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options
    const { id } = options;
    this.setData({
      id: options.id
    })
    // const userInfo = wx.getStorageSync("userInfo");
    // if(userInfo._openid==''){
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    // }
    // console.log(userInfo)
    // console.log(id)
    // this.setData({userInfo})
    // // const Cates = wx.getStorageSync("cates");
    // db.collection('rhnewbee').doc(id)
    this.getGoodsDetail(id)
    // const info = this.data.info
    // console.log(info)

    // this.setData({
    //   id: options.id
    // let aaa = this.aaa
    // db.collection('rhnewbee').doc(id).field({
    //   "_id": true,
    //   "price": true,
    //   "title": true,
    //   "pics": true,
    //   "subHead": true,
    //   "introduce": true,
    //   "rhid": true
    // }).get({
    //   success:res=>{
    // console.log(res)

    //     this.setData({
    //       aaa:res.data
    //     })
    //   }
    // })

    // console.log(data.aaa)
    // })

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
          // isCollect
          // //返回值优化，只取页面显示值

          // info:{
          //   _id:res.data._id,
          //   price:res.data.price,
          //   title:res.data.title,
          //   pics:res.data.pics,
          //   subHead:res.data.subHead,
          //   introduce:res.data.introduce,
          //   rhid:res.data.rhid
          // }
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
      console.log(this.data.info.pics)
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
  toShare(e) {
    console.log(e)
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/goods_code/goods_code?id=' + id,
    })
  },
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

// success:res=>{
//   this.setData({
//     info:res.data
//   })
//   console.log(res)


// price:res.data.price,
            // title:res.data.title,
            // image:res.data.image,
            // count:res.data.count,
            // introduce:res.data.introduce

            // handleCollect(id) {
            //   let isCollect = false;
            //   // 1 获取缓存中的商品收藏数组
            //   let collect = wx.getStorageSync("userInfo").collection || [];
            //   // 2 判断商品是否被收藏过
            //   let index = collect.findIndex(v => v == id)
            //   // 3 当index！==-1表示已经收藏过
            //   if (index !== -1) {
            //     // 能找到 已经收藏过了 在数组中删除该商品
            //     collect.splice(index, 1);
            //     isCollect = false;
            //     wx.showToast({
            //       title: '取消成功',
            //       icon: 'success',
            //       mask: true
            //     });
            //   } else {
            //     // 没有收藏过
            //     collect.push(this.info);
            //     isCollect = true;
            //     wx.showToast({
            //       title: '收藏成功',
            //       icon: 'success',
            //       mask: true
            //     });
            //   }
            //   // 4 把数组存入缓存
            //   // wx.setStorageSync("userInfo", collect);
            //   console.log(collect)
            //   // 5 修改data中的属性
            //   this.setData({
            //     isCollect
            //   })
            // },
