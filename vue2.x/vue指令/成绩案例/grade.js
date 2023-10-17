/**
 * TODO: 
 * 功能描述：
1.渲染功能
2.删除功能
3.添加功能
4.统计总分，求平均分
思路分析：
1.渲染功能 v-for :key v-bind:动态绑定class的样式
2.删除功能 v-on绑定事件， 阻止a标签的默认行为
3.v-model的修饰符 .trim、 .number、 判断数据是否为空后 再添加、添加后清空文本框的数据
4.使用计算属性computed 计算总分和平均分的值
 */
const app = new Vue({
  el: '#app',
  data: {
    list: [
      { id: 1, subject: '语文', score: 20 },
      { id: 7, subject: '数学', score: 99 },
      { id: 12, subject: '英语', score: 70 },
    ],
    subject: '',
    score: ''
  },
  computed: {
    totalCount(){
      return this.list.reduce((sum, item)=>sum += item.score,0)
    }  
  },
  methods: {
    fn(id){
      console.log(id)  
      //通过使用filter过滤器的方式实现删除元素
      this.list = this.list.filter(item => item.id !== id)
    },  
    add(){
      console.log("收集表单信息")
      console.log(this.subject)
      console.log(this.score)
      // 添加到list集合中
      this.list.unshift({
        id: +new Date(),
        subject: this.subject,
        score: this.score
      })
      // 清空表单
      this.subject= ''
      this.score=''
    }
  }
})  