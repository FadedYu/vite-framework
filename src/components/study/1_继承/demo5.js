/**
 * 寄生式继承。原型式继承基础上进行优化。主要是解决组合继承的第二个问题。
 * 创建一个仅用于封装继承过程的函数，该函数在内部使用原型式继承对一个目标对象进行浅复制，增强这个浅复制的能力来增强对象，
 * 最后就好像像真的是它做了所有工作一样返回对象。引用类型的属性始终会被继承和共享。
 *
 * 在主要考虑对象而不是自定义类型和构造函数的情况下,寄生式继承也是一种有用的模式。
 *
 * 存在问题：
 * 与原型链继承的问题相同，Object.create方法实现的是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能。
 * 虽然其优缺点和原型式继承一样，但是对于普通对象的继承方式来说，寄生式继承相比于原型式继承，还是在父类基础上添加了更多的方法。
 */

/**
 * 子类的封装函数，通过浅拷贝增强复制的能力，添加一些需要的方法
 */
function child(parent) {
  let child = Object.create(parent)

  child.type = 'child'
  // 以某种方式来增强这个对象，解决组合继承中，子类方法会被覆盖的问题
  child.getFriends = function () {
    return this.friends
  }
  return child
}

let Parent = {
  name: 'Parent',
  play: [1, 2, 3],
  getName: function () {
    return this.name
  }
}

let e1 = child(Parent)
let e2 = child(Parent)
console.log(e1)

e1.play.push(4)
console.log('d1', e1.play) // [1, 2, 3, 4]
console.log('d2', e2.play) // [1, 2, 3, 4] d1修改属性会影响到d2
