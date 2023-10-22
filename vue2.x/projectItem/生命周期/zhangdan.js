/**
    * 接口文档地址：
    * https://www.apifox.cn/apidoc/shared-24459455-ebb1-4fdc-8df8-0aff8dc317a8/api-53371058
    * 
    * 功能需求：
    * 1. 基本渲染
    * 2. 添加功能
    * 3. 删除功能
    * 4. 饼图渲染
    */
const app = new Vue({
  el: '#app',
  data: {
    // 对象数组
    list: [
      {
        id: 0,
        name: '',
        price: 0,
        creator: ''
      } 
    ],
    //需要添加的单个对象内容
    itemName: '',
    itemPrice: ''
  },
  computed: {
    totalCount (){
      return this.list.reduce((sum, item)=>sum += item.price,0)
    }
  },

  methods: {
    // 删除数据
    del(id) {
      this.list = this.list.filter(item => item.id !== id)   
    },
    add(){
      console.log("商品名称："+ this.itemName)
      this.list.unshift({
        id: +new Date(),
        name: this.itemName,
        price: this.itemPrice,
        creator: 'rayce'
      })
      //todo: 更新试图
      this.updateView()
      // 清空表单
      this.itemName= ''
      this.itemPrice=''
    },
    updateView(){
      // 更新图表 按照配置中 只需要再次调用setOption
      //利用this来存储mycharts
      this.myCharts.setOption({
        // 数据项
        series: [
          {
            // data: [
            //   { value: 1048, name: '球鞋' },
            //   { value: 735, name: '防晒霜' }
            // ]
            data: this.list.map(item => ({ value: item.price, name: item.name}))
          }
        ]
      })
    }

  },

  async created(){
    //发送请求拿到数据， 然后进行渲染
    console.log("生命周期的准备响应式数据阶段")
    const res = await axios({
      url: 'https://applet-base-api-t.itheima.net/bill',
      params: {
        creator: 'rayce'
      }
    })
    // console.log(res.data.data)
    this.list = res.data.data 
    this.updateView()
  },
  beforeCreated(){
    console.log("生命周期的创建数据阶段。 发送初始化渲染请求")
  },
  /**
   * TODO: echarts 需要在mounted阶段进行
   * echarts 官网查看对应的用法
  */
  mounted(){

    console.log("生命周期的挂载数据阶段(操作dom阶段)")
    //进行柄图渲染
    //初始化一个饼图 echarts.init(dom) mounted钩子中渲染  
    //根据数据试试更新饼图 echarts.setOptions({...})
  
    this.myCharts = echarts.init(document.querySelector('#main'))
      this.myCharts.setOption({
        // 大标题
        title: {
          text: '消费账单列表',
          left: 'center'
        },
        // 提示框
        tooltip: {
          trigger: 'item'
        },
        // 图例
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        // 数据项
        series: [
          {
            name: '消费账单',
            type: 'pie',
            radius: '50%', // 半径
            data: [
              // { value: 1048, name: '球鞋' },
              // { value: 735, name: '防晒霜' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })

  
  }

})

/**
 * TODO:
3.思路分析
1.基本渲染
立刻发送请求获取数据 created
拿到数据，存到data的响应式数据中
结合数据，进行渲染 v-for
消费统计 —> 计算属性

2.添加功能
收集表单数据 v-model，使用指令修饰符处理数据
给添加按钮注册点击事件，对输入的内容做非空判断，发送请求
请求成功后，对文本框内容进行清空
重新渲染列表

3.删除功能

注册点击事件，获取当前行的id
根据id发送删除请求
需要重新渲染

4.饼图渲染

 */