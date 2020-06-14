const db = wx.cloud.database()
Page({
  data: {
    items: [
      { name: 20101, value: "卸妆" },
      { name: 20102, value: '洁面' },
      { name: 20103, value: "化妆水" },
      { name: 20104, value: "乳液" },
      { name: 20105, value: '面霜' },
      { name: 20106, value: '精华' },
      { name: 20107, value: '面膜' },
      { name: 20108, value: '防晒' },
      { name: 20109, value: '美体' },
      { name: 20110, value: '颈/唇/眼 护理' },
      { name: 20111, value: '美容食品' },
    ],
    catFirstId: [],
    newList: ""
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value,
      typeof (e.detail.value[0]),
      '\ncheckbox发生change事件，携带id值为：', e.currentTarget.id,
      typeof (e.currentTarget.id)
    )
    let b = [];
    for (let j = 0, len = e.detail.value.length; j < len; j++) {
      console.log(e.detail.value[j])
      let a = Number(e.detail.value[j]);
      b.push(a)
    }
    console.log(b)
    db.collection('rhnewbee').where({
      "rhid": Number(e.currentTarget.id)
    }).update({
      data: {
        "catSecondId": b
      }
    })
    let c = [];
    c.push(e)
    let newList = e.currentTarget.id;
    // c=this.newList
    this.setData({
      newList: e.currentTarget.id
    })
    console.log("商品：", e.currentTarget.id, "已经更新", newList)
  },

  goods_setting() {
    wx.navigateTo({
      url: 'pages/backstage/backstage',
    })
  },




  getList() {
    db.collection('rhnewbee').limit(5).where(
      { "catSecondId": null, 'catFirstId': { $in: [20100] } })
      .field({
        'catFirstId': true,
        'catSecondId': true,
        'title': true,
        'rhid': true
      })
      .get({
        success: res => {
          this.setData({
            list: res.data,
            items: [
              { name: 20101, value: "卸妆" },
              { name: 20102, value: '洁面' },
              { name: 20103, value: "化妆水" },
              { name: 20104, value: "乳液" },
              { name: 20105, value: '面霜' },
              { name: 20106, value: '精华' },
              { name: 20107, value: '面膜' },
              { name: 20108, value: '防晒' },
              { name: 20109, value: '美体' },
              { name: 20110, value: '颈/唇/眼 护理' },
              { name: 20111, value: '美容食品' },
            ]
          })
        }
      })

  },
  reset() {
    this.setData({
      list: []
    })
  },

  onLoad() {
    // this.page = 0
    // this.getList(true)
    // this.getList()
    // limit(4)设置首次加载上限

  }
})


// items: [
//   { name: 10101, value: "唇妆" },
//   { name: 10102, value: '腮红高光' },
//   { name: 10103, value: "眼影" },
//   { name: 10104, value: "眼线笔" },
//   { name: 10105, value: '睫毛膏' },
//   { name: 10106, value: '眉笔/粉' },
//   { name: 10107, value: '隔离打底' },
//   { name: 10108, value: '阴影遮瑕' },
//   { name: 10109, value: '粉底' },
//   { name: 10110, value: '工具' },
// ]
// { name: 20101, value: "卸妆" },
// { name: 20102, value: '洁面' },
// { name: 20103, value: "化妆水" },
// { name: 20104, value: "乳液" },
// { name: 20105, value: '面霜' },
// { name: 20106, value: '精华' },
// { name: 20107, value: '面膜' },
// { name: 20108, value: '防晒' },
// { name: 20109, value: '身体乳' },


