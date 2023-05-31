/*
  深拷贝需要考虑的几种问题：
  基本类型数据是否能拷贝？
  键和值都是基本类型的普通对象是否能拷贝？
  Symbol作为对象的key是否能拷贝？
  Date和RegExp对象类型是否能拷贝？
  Map和Set对象类型是否能拷贝？
  Function对象类型是否能拷贝？（函数我们一般不用深拷贝）
  对象的原型是否能拷贝？
  不可枚举属性是否能拷贝？
  循环引用是否能拷贝？
 
  深拷贝的几种方式，
  1. JSON.parse(JSON.stringify(obj))
 
     局限问题：
      1. 会忽略 undefined和symbol；
      2. 不可以对Function进行拷贝，因为JSON格式字符串不支持Function，在序列化的时候会自动删除；
      3. 诸如 Map, Set, RegExp, Date, ArrayBuffer 和其他内置类型在进行序列化时会丢失；
      4. date时间对象会变成字符串，RegExp定义的属性会变成 {}
      5. 不支持循环引用对象的拷贝;（循环引用的可以大概地理解为一个对象里面的某一个属性的值是它自己）
 
  2. loadsh中的_.cloneDeep()
 
     局限问题：
      1. 不能拷贝属性描述符，而且存取描述符get set，会被转换成数据描述符，且全为true。
         例如，如果一个对象用属性描述符标记为 read-only，它将会被复制为 read-write。
 
  3. jQuery的extend()
 
  4. 使用MessageChannel。使用结构化克隆算法
     MessageChannel API允许我们创建一个新的消息通道，并通过它的两个MessagePort属性发送数据。传递的数据也是深拷贝的。
 
     局限问题:
      1. 这是异步的，所以需要new Promise返回。
      2. 结构化克隆算法的局限问题。
 
  5. HTML DOM API 的全局 structuredClone()方法。使用结构化克隆算法。
 
     结构化克隆算法的局限问题：
      1. 不允许克隆Error、Function、Symbol和DOM对象，如果对象中含有，将抛出DATA_CLONE_ERR异常。
      2. 不保留RegExp 对象的 lastIndex 字段。
      3. 不保留属性描述符，setters 以及 getters（以及其他类似元数据的功能）。
         例如，如果一个对象用属性描述符标记为 read-only，它将会被复制为 read-write。
      4. 不保留原形链。
 
  6. 自定义递归实现
 */
const stringTag = '[object String]'
const numberTag = '[object Number]'
const bigIntTag = '[object BigInt]'
const symbolTag = '[object Symbol]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const arrayTag = '[object Array]'

/**
 * 是否为object，除去null和function
 * @param obj 源数据
 */
function isObject<T>(obj: T) {
  return typeof obj === 'object' && obj
}

/**
 * 判断是否为数组
 * @param obj 源数据
 */
function isArray<T>(obj: T) {
  return Object.prototype.toString.call(obj) === arrayTag
}

/**
 * 获取数据的类型
 * @param obj 源数据
 */
function getType<T>(obj: T): string {
  return Object.prototype.toString.call(obj)
}

/**
 * 针对正则RegExp的拷贝
 * @param regex 正则表达式
 *
 */
function handleRegExp(regex: RegExp) {
  const { source, flags, lastIndex } = regex
  const re = new RegExp(source, flags)
  re.lastIndex = lastIndex
  return re
}

/**
 * 创建一个新的对象并初始化，继承原型链
 * @param obj 源数据
 */
function createObject(obj: object) {
  if (obj.constructor === undefined) {
    return Object.create(null)
  }

  if (typeof obj.constructor === 'function' && (obj !== obj.constructor || obj !== Object.prototype)) {
    return Object.create(Object.getPrototypeOf(obj))
  }

  return {}
}

/**
 * 深拷贝
 * @param obj 源数据
 * @param weekMap WeakMap储存遍历过的拷贝数据，解决循环引用问题
 */
function deepClone<T>(obj: T, weekMap = new WeakMap()) {
  // 函数不作处理直接返回，不是object直接返回
  if (typeof obj === 'function' || !isObject(obj)) {
    return obj
  }

  // 处理特殊对象
  switch (getType(obj)) {
    case stringTag:
    case numberTag:
    case bigIntTag:
    case symbolTag:
    case errorTag:
      return (obj as object).constructor(obj)
    case boolTag:
      return (obj as object).constructor(+obj)
    case dateTag:
      return new Date(+obj)
    case regexpTag:
      return handleRegExp(obj as RegExp)
  }

  const exist = weekMap.get(obj as object)
  if (exist) {
    return exist
  }

  // 克隆map
  if (obj instanceof Map) {
    let result = new Map()
    weekMap.set(obj, result)
    for (const [key, val] of obj) {
      result.set(key, deepClone(val, weekMap))
    }
    return result
  }

  // 克隆set
  if (obj instanceof Set) {
    let result = new Set()
    weekMap.set(obj, result)
    for (const val of obj) {
      result.add(deepClone(val, weekMap))
    }
    return result
  }

  // 通过手动创建新的对象，显式原型继承
  let result = isArray(obj) ? [] : createObject(obj as object)

  weekMap.set(obj as object, result)

  // 获取源数据所有属性，包括Symbol和不可枚举属性，并递归遍历，同时拷贝属性的描述符
  for (const key of Reflect.ownKeys(obj as object)) {
    // 只遍历可枚举描述符的属性，不可枚举属性将忽略掉，与lodash的做法一样忽略不可枚举属性
    if (Object.prototype.propertyIsEnumerable.call(obj, key)) {
      // 获取源数据的属性描述符
      let oldDesc = Object.getOwnPropertyDescriptor(obj, key)

      /* 
        属性描述对象不是引用对象，则直接使用原来的属性描述符
        如果是引用对象且是访问器描述符，即有[get 或 set]，则直接使用原来的属性描述符
        利用了描述符同时具有 [value 或 writable] 和 [get 或 set] 键，则会抛出异常的特性
      */
      if (!isObject(obj[key as keyof T]) || !oldDesc?.value) {
        Object.defineProperty(result, key, oldDesc as PropertyDescriptor)
      } else {
        // 引用对象进行递归克隆
        let targetValue = deepClone(obj[key as keyof T], weekMap)
        // 创建新的属性描述符，value存放克隆后的新值
        Object.defineProperty(result, key, {
          enumerable: true,
          configurable: oldDesc?.configurable,
          writable: oldDesc?.writable,
          value: targetValue
        })
      }
    }
  }

  return result
}

/**
 * 使用MessageChannel
 * @param obj 拷贝源对象
 * @example
 * deepCopy(obj).then((copy) => {
 *   // 异步的
 *   let copyObj = copy;
 *   console.log(copyObj, obj)
 *   console.log(copyObj == obj)
 * });
 */
function deepCloneUseMessageChannel<T>(obj: T): Promise<T> {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage = ev => resolve(ev.data)
    port1.postMessage(obj)
  })
}

export { deepClone, deepCloneUseMessageChannel }
