/**
 * 原型链继承。借助Child的prototype指向Parent构造函数
 *
 * 存在问题：
 * 1. 不像其他语言一样的继承（其他语言的继承是拷贝继承，会把父类的属性和方法拷贝到子类中，供子类调取使用），
 *    它是把父类的实例放在子类实例的原型链上，实例想调取这些方法，是基于__proro__原型链查找机制完成的。
 *
 * 2. 子类用的是同一个原型对象，可以重写父类上的方法，会导致父类其他的实例也会收到影响。如c1修改play为[1, 2, 3, 4]，则c2的play也会跟着改变
 *
 * 3. 父类中私有或者公有的属性方法，最后都会变成子类中公有方法。
 */

function Parent() {
  this.name = 'parent'
  this.play = [1, 2, 3]
}

Parent.prototype.sayName = function () {
  return this.name
}

function Child() {
  this.name = 'child'
}

// 重点是这一行
Child.prototype = new Parent()
Child.prototype.constrctor = Child // 保证子类构造函数的完整性

let a1 = new Child()
let a2 = new Child()
console.log(a1)
a1.play.push(4)
console.log('a1', a1.play) // [1, 2, 3, 4]
console.log('a2', a2.play) // [1, 2, 3, 4]
