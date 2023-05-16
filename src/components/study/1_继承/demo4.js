/**
 * 原型式继承。不用创建构造函数形式，借助Object.create方法实现普通对象的继承。
 *
 * 存在问题：
 * 与原型链继承的问题相同，Object.create方法实现的是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能
 */
// 该对象作为拷贝对象的原型对象
let Parent = {
  name: 'parent4',
  friends: [1, 2, 3],
  getName: function () {
    return this.name
  }
}

// 重点是这行
let d1 = Object.create(Parent)
d1.name = 'd1'
d1.type = 'child1'
console.log(d1)
d1.friends.push(4)

let d2 = Object.create(Parent)
d2.name = 'd2'
d2.type = 'child2'
d2.friends.push(5)
console.log(d2)
