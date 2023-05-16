/**
 * 组合继承（原型链继承和构造函数继承组合）
 *
 * 存在问题：
 * 1. Parent被执行了两次，分别为：Parent.call(this)和new Parent()，期望执行一次，多执行的一次便会造成一次性能开销。
 *    控制台查看会发现，c1的属性name,play会与原型链Parent上的属性重复。
 *
 * 2. 在之前Child.prototype = new Parent()定义一些公共属性和方法时会被覆盖掉，例如不能实例调用c1.eat()。
 *    控制台会报错Uncaught TypeError: c1.eat is not a function，若是在其之后定义则会污染Parent
 */
function Parent() {
  this.name = 'parent'
  this.play = [1, 2, 3]
}

Parent.prototype.sayName = function () {
  return this.name
}
function Child() {
  // 第二次调用 Parent3()
  Parent.call(this)
  this.type = 'child'
}
Child.prototype.eat = function () {
  return '吃吃吃'
}

// 第一次调用 Parent3()，但上面的Child.prototype.eat会被覆盖掉，无法再调用eat()
Child.prototype = new Parent()
// 手动挂上构造器，指向自己的构造函数
Child.prototype.constructor = Child
var c1 = new Child()
var c2 = new Child()
console.log(c1)

c1.play.push(4)
console.log(c1.play, c2.play) // 不互相影响[1, 2, 3, 4], [1, 2, 3]
console.log(c1.sayName()) // 正常输出'parent'
// console.log(c1.eat()) // 会报错eat is not a function

c2.name = '张三'
console.log(c2)
