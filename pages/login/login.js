// pages/login/login.js
// wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    userInfo: []
  },

  // 登录
  getUserInfo: function (e) {
    if (wx.getStorageSync("userInfo") == []) {
      // 1 内存空的情况下请求服务器获取openid
      console.log("内存无数据")
      wx.cloud.callFunction({
        name: 'login1',
        success: res => {
          e.detail.userInfo.openid = res.result.wxInfo.OPENID
          app.globalData.userInfo = e.detail.userInfo
          const userInfo = e.detail.userInfo
          // 2 此处调用函数判断
          this.setDataBase(userInfo)
          wx.navigateBack({
            delta: 1
          });
        }
      })
    } else {

      // console.log("内存有数据")

      wx.navigateBack({
        delta: 1
      });
    }
  },
  setDataBase(userInfo) {
    const userDBInfo = db.collection('userInfo')
    userDBInfo.where({ '_openid': userInfo.openid }).get({
      success: res => {
        console.log(res)
        if (res.data.length == 0) {
          // console.log('不存在')
          // 新用户
          userDBInfo.add({
            data: {
              // _openid: userInfo.openid,
              avatarUrl: userInfo.avatarUrl,
              city: userInfo.city,
              country: userInfo.country,
              gender: userInfo.gender,
              nickName: userInfo.nickName,
              province: userInfo.province
            }

          })
          wx.setStorageSync("userInfo", userInfo);

        } else {
          // 用户已存在 将获取的信息存入缓存
          wx.setStorageSync("userInfo", res.data[0]);
          // userDBInfo.where({ '_openid': userInfo.openid })
          //   .get({
          // success: res => {
          // }
          // })
          // console.log('存在')
          // console.log()

        }
      }
    })
    // console.log()
    // })
    // if(wx.getStorageSync("userInfo")==[]){
    //   db.collection('userInfo').add({
    //     data:{
    //           country:e.detail.userInfo.country,
    //           gender: e.detail.userInfo.gender,
    //           nickName: e.detail.userInfo.nickName,
    //           // _openid: e.detail.userInfo.openid
    //           } 
    //       })
    // }else{
    //   console.log('缓存中存在')
    // }
  },
  // //弃用
  // handleGetUserInfo(e) {
  //   // console.log(e)
  //   const { userInfo } = e.detail;
  //   if (wx.getStorageSync("userInfo") == []) {
  //     db.collection('userInfo').add({
  //       data: {
  //         country: e.detail.userInfo.country,
  //         gender: e.detail.userInfo.gender,
  //         nickName: e.detail.userInfo.nickName,
  //         // _openid: e.detail.userInfo.openid
  //       }
  //     })
  //   } else {
  //     // console.log('缓存中存在')
  //     wx.navigateBack({
  //       delta: 1
  //     });
  //   }
  //   wx.setStorageSync("userInfo", userInfo);
  //   wx.navigateBack({
  //     delta: 1
  //   });
  //   // this.getUserInfo()

  // },
  onLoad: function () {
    // this. getUserInfo()
    // // let a = this.data.a
    // db.collection('userInfo').where(
    //   {},{'userId':1,}
    // ).limit(1).field({'userId':1,'_openid':1})
    // .orderBy('userId', 'desc').get({
    //   success:res=>{
    //     console.log(res)
    //     this.setData({
    //       a:res.data
    //     })
    //     console.log(this.a)
    //   }
    // })
  }
})