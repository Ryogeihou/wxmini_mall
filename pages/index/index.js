// pages/index/index.js
import regeneratorRuntime from'../../lib/runtime/runtime';

const db =wx.cloud.database()
const app = getApp()
Page({
  data:{
    list:[],
    tops:[],
    categories: []
  },
  addCart(e){
    console.log(e.currentTarget)
    const {item} = e.currentTarget.dataset //小程序里传递数据的一个方法
    const i = app.globalData.carts.findIndex(v=>v._id==item._id)
    if(i>-1){
      // 已经存在，数量加一
      app.globalData.carts[i].num += 1
    }else{
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
  onPullDownRefresh(){
    this.getList(true)
  },
  onReachBottom(){
    this.page +=1
    this.getList()
  }, 
  
  toDetail(e){
    const id = e.currentTarget.id
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

  async getList(isInit){
    const PAGE =8
    wx.showLoading({
      title: '加载中',
    })
    await db.collection('rhnewbee').where({
      "pics":{$ne:null}
    }).skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        console.log('触底刷新', res.data)

        if(isInit){
          this.setData({
            list: res.data
          })
        }else{
          //下拉刷新，不能直接覆盖而是累加
          this.setData({
            list: this.data.list.concat(res.data)
          })
          wx.stopPullDownRefresh()
        }
        wx.hideLoading()
      }
    })
  },
  getTops(){
    db.collection('rhnewbee').orderBy('count','desc').limit(4).get({
      success:res=>{
        // console.log(res.data[0].pics[0])
        this.setData({
          // tops:{
          //   image:res[0].image,
          //   image:res[1].image,
          //   image:res[2].image,
          //   image:res[3].image
          // }
          tops:res.data
          // tops:{ 单个商品详细页面可以这样设置，tops列表为4个商品
          //   count:res.data.count,
          //   image:res.data.image
          // } 
        })
      }
    })
  },
  onShareAppMessage(){
    return {
      title:"唯一になる \t Become the only"
    }
  }, 
  onShow: function () {
    db.collection('catesDetails').get({
      success:res1=>{
        this.setData({
          categories:res1.data,
        })
      }
    })
  },
  onLoad(){
    this.page = 0
    this.getList(true)
    // this.getTops()

    wx.showShareMenu()

    wx.showLoading({
      title:'加载中',
    })
    // limit(4)设置首次加载上限
    // db.collection('rhnewbee').limit(20).get({
    //   success:res=>{
    //     this.setData({
    //       list: res.data
    //     })
    //     wx.hideLoading()
    //   }
    // })
    
  }
})
