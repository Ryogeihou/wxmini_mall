//index.js
//获取应用实例
const app = getApp()
// 云数据库实例
const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    list: [],
    oldList: [],
    rhid: 0
  },
  setInputtedRhid(e) {
    const rhid1 = e.detail.value
    console.log(typeof (rhid1), rhid1)
    this.setData({
      rhid: Number(rhid1)
    })
    console.log(this.data.rhid)
  },
  update() {
    db.collection('rhnewbee')
      .where({
        rhid: this.data.rhid
      }).update({
        data: {
          "subHead": this.data.list[0].subHead,
          "introduce": this.data.list[0].introduce,
          "marketValue": this.data.list[0].marketValue,
          "pics": this.data.list[0].pics,
          "point": this.data.list[0].point,
          "title": this.data.list[0].title
        }
      })
    this.getOldDB()

  },
  reset() {
    this.setData({
      list: [],
      oldList: []
    })
  },
  getTestDB() {
    db.collection('test0417')
      .where({
        rhid: this.data.rhid
      }).get({
        success: res => {
          this.setData({
            list: res.data
          })
        }
      })
  },
  getOldDB() {
    this.getTestDB()
    db.collection('rhnewbee')
      .where({
        rhid: this.data.rhid
      }).get({
        success: res => {
          this.setData({
            oldList: res.data
          })
        }
      })
  },
  getOldList() {
    this.getOldDB()
  },
  getList() {
    this.getTestDB()
  },

  getNotPicDB() {
    db.collection('rhnewbee').limit(2)
      .orderBy('rhid', 'esc')
      .field({
        'rhid': true,
        'title': true,
        'pics': true
      })
      .where({
        pics: null
      }).get({
        success: res => {
          console.log(res)
          const a= res.data
          for (var i = 0;i<a.length;i++){
            var j = a[i]
            db.collection('rhwait')
            .add({
              data: {
                _ope
              }
            })
            // console.log(i)
          }
          

        }
      })
  },

  onLoad(options) {
  }

})
