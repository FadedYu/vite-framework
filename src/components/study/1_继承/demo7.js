/**
 * 使用es6 中的 extends 语法糖方式
 */
class Parent {
  constructor(name, play) {
    this.name = name
    this.play = play
  }
  // 父类原型方法，即Person.prototype.getName = function() { }
  sayName() {
    return this.name
  }
}
class Child extends Parent {
  constructor(type, name, play) {
    // 子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    // 相当于 Parent.call(this)
    super(name, play)
    this.type = type
  }

  // 子类原型方法，即Child.prototype.eat = function () { }
  eat() {
    return '吃吃吃'
  }
}
const g = new Child('child', 'parent', [1, 2, 3])
console.log(g)
