const db = wx.cloud.database()
import regeneratorRuntime from'../../lib/runtime/runtime';

Page({
  data:{
    tabs:[
      {
        id:0,
        value:"综合",
        isActive: true
      },
      {
        id:1,
        value:"销量",
        isActive: false
      },
      {
        id:2,
        value:"榜单",
        isActive: false
      },
      {
        id:3,
        value:"价格",
        isActive: false
      }
    ],
    goodsList:[],
    Cates:[],
    rightContent:[],
    // toView: 'green',
    //被点击的左侧菜单
    currentIndex:0,
    // cidFirst:"",
    // dbName:""
    catId:0,
    // scrollLeft:0
  },
  // 接口所要参数
  // QueryParams:{
  //   query:"",
  //   cid:"",
  //   pagenum:1,
  //   pahesize:10
  // },
  
  onLoad:function(options){
    this.page = 0
    // console.log(typeof(options.cid),"options")
    this.getTabsData()
    this.getGoodList();
    this.getList(true)
    // console.log(rightContent.children);
  },

  // 获取商品列表数据  // 取值待优化
  async getGoodList(){
    // const dbName = "catFirst" + this.options.cid.replace(/^(\d{1}).*/, '$1');
    // let dbName = this.catId;
    // let dbName1= "\""+ dbName + "\"";
    
      let catId = Number(this.options.cid);
      // console.log(catId);
      // console.log("options",this.options.cid,10);
      // console.log("ex",this.options.cid.substring(this.options.cid.length-2));
        if(this.options.cid.substring(this.options.cid.length-2)==="00")
        {
        const res = await db.collection("rhnewbee").where({
          "catFirstId":Number(this.options.cid),
          // "catFirstId":null
        }).get({
          success:res=>{
            this.setData({
              goodsList:res.data
            })
          }
        })
        }else{
          const res = await db.collection("rhnewbee").where({
          "catSecondId":Number(this.options.cid),
          // "catFirstId":null
          }).get({
            success:res=>{
              this.setData({
                goodsList:res.data
              })
            }
          })
        }
  },
  // 获取商品列表
  async getList(isInit){
    // const dbName = "catFirst" + this.options.cid.replace(/^(\d{1}).*/, '$1');
    // let catId = Number(this.options.cid);
    // const catId = this.catId;
    // const dbName = "rhnewbee";
    // let dbName1= "\""+ dbName + "\"";
    // console.log(this.options.cid);
    const PAGE =16
    wx.showLoading({
      title: '加载中',
    })
    if(this.options.cid.substring(this.options.cid.length-2)==="00")
    {
    const res = await db.collection("rhnewbee").where({
      "catFirstId":Number(this.options.cid),
      // "catFirstId":null
    }).skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        if(res!=[]){
          // console.log('触底刷新', res.data)
          if(isInit){
            this.setData({
              goodsList: res.data
            })
          }else{
            //下拉刷新，不能直接覆盖而是累加
            this.setData({
              goodsList: this.data.goodsList.concat(res.data)
            })
            wx.stopPullDownRefresh()
          }
          wx.hideLoading()
        }
      }
    })
    }else{
      const res = await db.collection("rhnewbee").where({
      "catSecondId":Number(this.options.cid),
      // "catFirstId":null
      }).skip(this.page * PAGE).limit(PAGE).get({
        success: res => {
          if(res!=[]){
            // console.log('触底刷新', res.data)
            if(isInit){
              this.setData({
                goodsList: res.data
              })
            }else{
              //下拉刷新，不能直接覆盖而是累加
              this.setData({
                goodsList: this.data.goodsList.concat(res.data)
              })
              wx.stopPullDownRefresh()
            }
            wx.hideLoading()
          }
        }
      })
    }
  },

  //获取分类数据
  getCates(){
    wx.showLoading({
      title:'加载中',
    })
    db.collection('catesDetails').get({
      success:res=>{
        console.log(res)
        this.Cates=res.data
        // this.setData({
        //   list: res.data
        // })
        //把接口的数据存入到本地存储中
        wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
        // let leftMenuList=this.Cates.map(v=>v.cat_name);
        //构造右侧分类数据
        getTabsData()
        // let rightContent=this.Cates[0].children;
        // this.setData({
        //   Cates, // 取值不用
        // // leftMenuList,
        //   rightContent
        // })
        // wx.hideLoading()
      }
    })
  },
// const Cates = wx.getStorageSync("cates"); // 取值不用 多余
    // this.Cates=Cates.data;                    // 取值不用 多余
    // let i = Number(this.options.cid.replace(/^(\d{1}).*/, '$1'));
    // let i = Number(this.options.cid.replace(/^(\d{1}).*/, '$1'));
    // let catId = i--;
    // let rightContent=this.Cates[i].children[index];
    // const scrollLeft= this.scrollLeft;
    // console.log(rightContent)

/* ——————————————————————————————————————————————————————————————————————*/
      //点击触发事件函数
  //设置点击二级分类 active控制，数据库调用
  async handleItemTap(e){
    const{index}=e.currentTarget.dataset; 
    const cid=e.currentTarget.id;
    
      this.setData({
        currentIndex:index,
        // rightContent,
        //  Cates,                               // 取值不用 多余
        //   catId
        })
    console.log(e.currentTarget.id)
    console.log("currentTarget",e.currentTarget.id,typeof(e.currentTarget.id));
    let a=e.currentTarget.id.substring(e.currentTarget.id-2)
    console.log(a,"ex",e.currentTarget.id.substring(e.currentTarget.id.length-2));
    if(e.currentTarget.id.substring(e.currentTarget.id.length-2)=="00"){
    // let catFirstId = Number(e.currentTarget.id);
    console.log("currentTarget",e.currentTarget.id,typeof(e.currentTarget.id));
    const res = await db.collection("rhnewbee").where({
      "catFirstId":Number(e.currentTarget.id),
      // "catFirstId":null
    }).get({
      success:res=>{
        this.setData({
          goodsList:res.data
        })
      }
    })
    }else{
      const res = await db.collection("rhnewbee").where({
      "catSecondId":Number(e.currentTarget.id),
      // "catFirstId":null
      }).get({
        success:res=>{
          this.setData({
            goodsList:res.data
          })
        }
      })
    }
      // let rightContent=this.Cates.data[1].children[0].children[0];
      //重新设置 右侧内容的scroll-view标签的顶部距离
      // rightContent,
      // scrollTop:0
  },
  //设置上方分类图标点击切换事件
  getTabsData(){
    const Cates = wx.getStorageSync("cates");
    this.Cates=Cates.data;
    let a = Number(this.options.cid.substring(this.options.cid.length-2));
    let i = Number(this.options.cid.replace(/^(\d{1}).*/, '$1'));
    let catId = i--;
    let currentIndex = a;
    let rightContent=this.Cates[i].children[0];
      this.setData({
        rightContent,
        currentIndex,
        // currentIndex:catId,
        Cates,
        catId//备用
        })
        // console.log(catId,a,currentIndex)
  },
  // Tabs标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    // 1 获取点击的标题索引
    const{index}=e.detail;
    // 2 修改源数组
    let{tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  //点击商品跳转详情页  _id传值待优化
  toDetail(e){
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    console.log(e)
  },
  // 页面上滑 滚动条触底
  onReachBottom(){
    this.page +=1
    // console.log(this.page); 无限增长
    this.getList()
  },
  getStorageData(){
    // 1 获取本地存储中的数据 （小程序中页存在本地存储技术）    
    const Cates = wx.getStorageSync("cates");
    // 2 开始做判断
    if(!Cates){
      //不存在 发送请求
      this.getCates();
    }else{
      //有旧的数据 定义过期时间 10s  改成 5min
      if(Date.now()-Cates.time>1000*300){
        //重新发送请求
        this.getCates();
      }else{
        //可以使用旧数据
        this.Cates=Cates.data;
            //构造左侧的大菜单数据
            // let leftMenuList=this.Cates.map(v=>v.cat_name);
            //构造右侧商品数据
            getTabsData()
            // console.log(Cates)
            // let rightContent=this.Cates[0].children;
            // this.setData({
            //   // leftMenuList,
            //   Cates,
            //   rightContent
            // })
       }
    }
  }
})