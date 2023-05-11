/**
 * 寄生组合式继承。
 * 借助解决普通对象的继承问题的Object.create 方法。
 * 在前面几种继承方式的优缺点基础上进行改造，这也是所有继承方式里面相对最优的继承方式。
 *
 * es6中class、extends是语法糖，在编译过程中也会转换成寄生组合式继承的优化方法。
 *
 */

;(function () {
  function Parent(name, play) {
    this.name = name
    this.play = play
  }

  Parent.prototype.sayName = function () {
    return this.name
  }
  function Child(type, name, play) {
    // 第二次调用 Parent3()
    Parent.call(this, name, play) // 相当于es6 class中constructor的super
    this.type = type
  }

  // 将new Parent() 改成Object.create 方式，就可以减少组合继承中多进行一次构造的过程
  Child.prototype = Object.create(Parent.prototype)
  Child.prototype.constructor = Child

  // 子类原型方法，写在Object.create后面，避免被覆盖
  Child.prototype.eat = function () {
    return '吃吃吃'
  }

  let f1 = new Child('child', 'parent', [1, 2, 3])
  let f2 = new Child('child', 'parent', [1, 2, 3])
  console.log(f1)
  console.log(f1.eat()) // 吃吃吃

  f1.play.push(4)
  console.log(f1.play) // [1, 2, 3, 4]
  console.log(f2.play) // [1, 2, 3]
})()
