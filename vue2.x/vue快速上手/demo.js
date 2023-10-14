//vue的第一个demo示例
/**TODO: 创建一个实例
1. 准备容器 （也就是一个盒子div之类的）
2. 引包（官网） — 开发版本/生产版本
3. 创建Vue实例  new Vue()
4. 指定配置项，渲染数据
   1. el:指定挂载点
   2. data提供数据
 */

const data ={
  msg: 'rayce',
  ipaddr: '192.168.1.110'
}

const app = new Vue({
  //通过el 配置选择器就可以指定vue对象管理的盒子
  el: '#app',
  data: data
})



