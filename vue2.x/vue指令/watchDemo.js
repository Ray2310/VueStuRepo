//定义操作的盒子
const app = new Vue({
  el: '#app',
  data: {
    obj: {
      lang: 'german', //默认设置语言为德语
      words: '',
    },
    result: ''

    
  },
  watch : {
    //TODO: 对于复杂的类型， 比如对象， 对里面的所有内容进行全部监听
    //使用对象的形式来进行书写
    obj: {
      deep: true, 
      immediate: true,
      handler (newValue) {
        clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
          const res = await axios({
            url: 'https://applet-base-api-t.itheima.net/api/translate',
            params: newValue
          })
          this.result = res.data.data
          console.log(res.data.data)
        }, 300)
      }
      // async handler (newVal) {
      //   console.log( "\t new: " + newVal)
      //   // console.log(newVal.data)
      //     // console.log("test" )
      //     const res = await axios({
      //       url: 'https://applet-base-api-t.itheima.net/api/translate',
      //       params: {
      //         words: newVal
      //       }
      //     })
      //     console.log("res = " + res.data.data)
      //     result = res.data.data
        
      // }
    },
    //用于监听之前的属性
  }



})