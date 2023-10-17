/**
 * TODO: 
 * 需求说明：
 * 1. 渲染功能
 * 2. 删除功能
 * 3. 修改个数
 * 4. 全选反选
 * 5. 统计 选中的 总价 和 总数量
 * 6. 持久化到本地
 * 
 TODO: 实现思路

1.基本渲染： v-for遍历、:class动态绑定样式

2.删除功能 ： v-on 绑定事件，获取当前行的id

3.修改个数 ： v-on绑定事件，获取当前行的id，进行筛选出对应的项然后增加或减少

4.全选反选

必须所有的小选框都选中，全选按钮才选中 → every
如果全选按钮选中，则所有小选框都选中
如果全选取消，则所有小选框都取消选中
声明计算属性，判断数组中的每一个checked属性的值，看是否需要全部选

5.统计 选中的 总价 和 总数量 ：通过计算属性来计算选中的总价和总数量

6.持久化到本地： 在数据变化时都要更新下本地存储 watch

 */
const app = new Vue({
  el: '#app',
  data: {
    // 水果列表
    fruitList: [
      {
        id: 1,
        icon: 'http://autumnfish.cn/static/火龙果.png',
        isChecked: true,
        num: 2,
        price: 6,
      },
      {
        id: 2,
        icon: 'http://autumnfish.cn/static/荔枝.png',
        isChecked: false,
        num: 7,
        price: 20,
      },
      {
        id: 3,
        icon: 'http://autumnfish.cn/static/榴莲.png',
        isChecked: false,
        num: 3,
        price: 40,
      },
      {
        id: 4,
        icon: 'http://autumnfish.cn/static/鸭梨.png',
        isChecked: true,
        num: 10,
        price: 3,
      },
      {
        id: 5,
        icon: 'http://autumnfish.cn/static/樱桃.png',
        isChecked: false,
        num: 20,
        price: 34,
      },
    ],
  },
  //计算属性
  computed: {
    //获取totalCount 。但是好像不需要
    totalCount(){
      return this.fruitList.reduce((sum, item)=>sum += (item.price * item.num),0)
    }
  }, 
  //方法 test
  methods: {
    del(id){
      //找出id == id的 然后 用filter过滤调
      this.fruitList = this.fruitList.filter(item => item.id !== id)
    },
    full(){
      this.fruitList.forEach((item, index)=>{
        item.isChecked = true
      })
    }
  },
  //监听器
  watch: {
    fruitList: {
      deep: true,
      immediate: true,
      handler (newValue) {
        console.log(newValue)
        localStorage.setItem("item", newValue)
      }

    }
  }



})