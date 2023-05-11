/**
 * 构造函数继承。借助 call调用Parent函数
 *
 * 存在问题：
 * 相比第一种原型链继承方式，父类的引用属性不会被共享，优化了第一种继承方式的弊端，但是只能继承父类的实例属性和方法，不能继承原型属性或者方法。
 * 如此时c2调用sayName() 会报错b2.sayName is not a function
 */

;(function () {
  function Parent() {
    this.name = 'parent'
    this.play = [1, 2, 3]
  }

  Parent.prototype.sayName = function () {
    return this.name
  }

  function Child() {
    // 重点是这一行
    Parent.call(this) // call super constructor
    this.type = 'child'
  }

  let b1 = new Child()
  let b2 = new Child()
  console.log(b1)
  b1.play.push(4)
  console.log('b1', b1.play) // [1, 2, 3, 4]
  console.log('b2', b2.play) // [1, 2, 3]
  // console.log(b2.sayName()) // 会报错 b2.sayName is not a function
})()
