const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  // console.log(event.rhid,event.userId)
  try {
    let a = event.rhid +'_'+event.userId;
    let b = 'user_poster/'+ a + '.png';
    const result = await cloud.openapi.wxacode.getUnlimited({
        scene: a,
        page:'pages/detail/detail',
        isHyaline:true
      })
    return await cloud.uploadFile({
      cloudPath:b,
      fileContent:result.buffer
    })
  } catch (err) {
  console.log(err)
    return err
  }
}


// exports.main = async (event, context) => {
//   try {
//   let imgBuf = await cloud.openapi.wxacode.getUnlimited({
//   page: "pages/detail/detail",
//   scene: "?sellerId=71f2cd945cb0b2e304fc61"
//   })
  
  
  
//   const result = await cloud.uploadFile({
//   cloudPath: '71f2cd945cb0b2e304fc6126353113**/code.png',
//   fileContent: imgBuf.buffer
//   })
//   return result
//   } catch (err) {
//   console.log(err)
//   return err
//   }
//   }
  
  