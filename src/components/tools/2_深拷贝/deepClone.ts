const boolTag = '[object Boolean]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'

function isObject<T>(data: T) {
  return (typeof data === 'object' && data) || typeof data === 'function'
}

function getType<T>(data: T): string {
  return Object.prototype.toString.call(data)
}

function deepClone<T>(data: T, map = new WeakMap()) {
  if (!isObject(data)) {
    return data
  }

  if (typeof data === 'function') {
    return data
  }

  // 判断Object类型的非遍历类型
  switch (getType(data)) {
    case symbolTag:
    case errorTag:
      return data
    case boolTag:
      return new Boolean(data)
    case numberTag:
      return new Number(data)
    case stringTag:
      return new String(data)
    case dateTag:
      return new Date((data as Date).getTime())
    case regexpTag:
      return new RegExp(data as RegExp)
  }

  const exist = map.get(data as object)
  if (exist) {
    return exist
  }

  // 克隆map
  if (data instanceof Map) {
    const result = new Map()
    map.set(data, result)
    data.forEach((val, key) => {
      if (isObject(val)) {
        result.set(key, deepClone(val, map))
      } else {
        result.set(key, val)
      }
    })
    return result
  }

  // 克隆set
  if (data instanceof Set) {
    const result = new Set()
    map.set(data, result)
    data.forEach(val => {
      if (isObject(val)) {
        result.add(deepClone(val, map))
      } else {
        result.add(val)
      }
    })
    return result
  }

  // 克隆可继续遍历的数据类型，引用类型，Array，Object，Arguments等
  const keys = Reflect.ownKeys(data as object)
  // const allDesc = Object.getOwnPropertyDescriptors(data)
  // 通过手动，创建新对象，显式原型继承
  const result = Object.create(Object.getPrototypeOf(data))

  map.set(data as object, result)

  // 遍历object
  keys.forEach(key => {
    const val = data[key as keyof T]
    if (isObject(val)) {
      result[key] = deepClone(val, map)
    } else {
      result[key] = val
    }
  })
  return result
}
export { deepClone }
