/**
 * 寄生式继承。原型式继承基础上进行优化。主要是解决组合继承的第二个问题。
 * 即child的prototype的属性方法会覆盖掉parent的prototype中的属性方法。
 *
 * 创建一个仅用于封装继承过程的函数，该函数在内部使用原型式继承。
 * 即利用创建Object.create()，parent作为原型，继承parent的属性方法，
 * 然后向这个新的object添加属性和方法，作为子类child的属性方法，解决覆盖问题。
 *
 * 在主要考虑是对象object而不是自定义类型和构造函数Function的情况下,寄生式继承也是一种有用的模式。
 *
 * 存在问题：
 * 与原型链继承的问题相同，Object.create方法实现的是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能。
 *
 */

/**
 * 子类的封装函数，通过浅拷贝增强复制的能力
 */
function child(parent) {
  let child = Object.create(parent)

  // 在这里添加子类的属性方法，解决组合继承中prototype覆盖的问题
  child.type = 'child'
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
