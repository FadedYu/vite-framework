// 可继续遍历的数据类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

// 不可继续遍历的数据类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

// 可继续遍历的数据类型
const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

/**
 * 遍历回调函数，使用while循环优化遍历速度
 * @param array 源数组
 * @param iteratee 回调函数
 * @returns 
 */
function forEach(array: any, iteratee: (item: any, index: number) => void) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}
/**
 * 判断是否为对象
 * @param target 源数据
 * @returns boolean
 */
function isObject<T>(target: T): boolean {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

function getType<T>(target: T): string {
  return Object.prototype.toString.call(target);
}

function getInit(target: any): any {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol<T>(targe: T): T {
  return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe: any) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func: Function): Function {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return new Function;
    }
  } else {
    return eval(funcString);
  }
}

function cloneOtherType<T>(targe: T, type: String) {
  const Ctor = (targe as Object).constructor;
  switch (type) {
    case boolTag:
      return new Boolean(targe)
    case numberTag:
      return new Number(targe)
    case stringTag:
      return new String(targe)
    case errorTag:
      return new Error((targe as Error).message)
    case dateTag:
      return new Date((targe as Date).getTime());
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe as Function);
    default:
      return null;
  }
}

function clone(target: any, map = new WeakMap()): any {

  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget: any;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return target;
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value: any) => {
      cloneTarget.add(clone(value));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value: any, key: number) => {
      cloneTarget.set(key, clone(value));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
}


function deepCopy(obj: any, weekMap = new WeakMap()) {
  let newObj: any = null;
  // 判断数据类型是否是复杂的数据类型，如果是则调用自己，如果不是则直接赋值即可！
  // 由于 null 不可以循环但是他的类型又是 object ，所以这个需要对 null 进行判断
  if (!isObject(obj)) {
    return obj
  }
  // 先从map中查找是否已经拷贝过该对象
  let cachedObj = weekMap.get(obj);
  // 如果已经拷贝过，则直接返回缓存中的对象
  if (cachedObj) {
    return cachedObj;
  }
  // 获取对象的具体类型
  let type = Object.prototype.toString.call(obj);
  switch (type) {
    case '[object Array]':
      newObj = [];
      break;
    case '[object Date]':
      newObj = new Date(obj.valueOf());
      break;
    case '[object RegExp]':
      newObj = new RegExp(obj.source, obj.flags);
      break;
    case '[object Map]':
      newObj = new Map();
      for (let [key, value] of obj.entries()) {
        newObj.set(key, deepCopy(value, weekMap));
      }
      break;
    case '[object Set]':
      newObj = new Set();
      for (let value of obj.values()) {
        newObj.add(deepCopy(value, weekMap));
      }
      break;
    case '[object Function]':
      newObj = obj;
      break;
    default:
      newObj = {};
  }
  // 将新对象和原对象放入map中，建立映射关系
  weekMap.set(obj, newObj);
  // 循环obj的每一项，如果里面还有复杂的数据类型的话，则直接利用递归函数再次调用。
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key], weekMap);
    }
  }
  return newObj;
}

export { clone, deepCopy }