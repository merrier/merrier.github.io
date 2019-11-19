---
title: 读书笔记系列（10）——TypeScript入门教程
urlname: typescript-tutorial
id: 6928487239585
categories:
  - 笔记
tags:
  - typescript
  - 入门
img: /images/hexo_thumbnail_132.jpeg
date: 2019-04-01 20:06:15
---

[TypeScript 入门教程](https://ts.xcatliu.com/)笔记，总结了一些需要额外注意的点，过滤掉了一些基础知识

## Hello TypeScript

1. TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。但即使报错了，还是会生成编译结果，我们仍然可以使用这个编译之后的文件。

> 如果要在报错的时候终止 js 文件的生成，可以在 tsconfig.json 中配置 noEmitOnError 即可。

## 原始数据类型

1. 使用构造函数 Boolean 创造的对象不是布尔值：

```ts
let createdByNewBoolean: boolean = new Boolean(1);

// index.ts(1,5): error TS2322: Type 'Boolean' is not assignable to type 'boolean'.
```

事实上 new Boolean() 返回的是一个 Boolean 对象：

```ts
let createdByNewBoolean: Boolean = new Boolean(1);
```

直接调用 Boolean 也可以返回一个 boolean 类型：

```ts
let createdByBoolean: boolean = Boolean(1);
```

在 TypeScript 中，`boolean` 是 JavaScript 中的基本类型，而 `Boolean` 是 JavaScript 中的构造函数。

2. `0b1010` 和 `0o744` 是 ES6 中的二进制和八进制表示法，它们会被编译为十进制数字：

```ts
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
```

编译结果：

```js
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
```

3. `JavaScript` 没有空值（Void）的概念，在 `TypeScript` 中，可以用 `void` 表示没有任何返回值的函数：

```ts
function alertName(): void {
    alert('My name is Tom');
}
```

声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`：

```ts
let unusable: void = undefined;
```

4. `undefined` 类型的变量只能被赋值为 `undefined`，`null` 类型的变量只能被赋值为 `null`

5. 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

```ts
// 这样不会报错
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num: number = u;
```

## 任意值

1. 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

2. 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

```ts
let something;
something = 'seven';
something = 7;

something.setName('Tom');
```

等价于：

```ts
let something: any;
something = 'seven';
something = 7;

something.setName('Tom');
```

## 类型推论

1. 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。以下代码虽然没有指定类型，但是会在编译的时候报错：

```ts
let myFavoriteNumber = 'seven'; // 等价于 let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

2. 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

```ts
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

## 联合类型

1. 联合类型（Union Types）表示取值可以为多种类型中的一种。联合类型使用 `|` 分隔每个类型：

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

2. 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

```ts
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

上例中，`length` 不是 `string` 和 `number` 的共有属性，所以会报错。

## 对象的类型——接口

1. 赋值的时候，变量的形状必须和接口的形状保持一致：

```ts
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom'
};
// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
// index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

2. 可选属性用 `?` 表示：

```ts
interface Person {
    name: string;
    age?: number;
}
```

3. 任意属性用 `[]` 表示：

```ts
interface Person {
    [propName: string]: any;
}
```
使用 `[propName: string]` 定义了任意属性取 string 类型的值。需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```
上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。

4. 只读属性用 `readonly` 表示：

```ts
interface Person {
    readonly id: number;
}
let tom: Person = {
    id: 89757,
};
tom.id = 9527;
// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

## 数组类型

1. 在 TypeScript 中，数组类型有多种定义方式，比较灵活：

* 「类型 + 方括号」表示法：

```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

* 数组泛型：

```ts
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

* 用接口表示：

```ts
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

`NumberArray` 表示：只要 index 的类型是 number，那么值的类型必须是 number。

2. 类数组（Array-like Object）不是数组类型，比如 `arguments`；常见的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等：

```ts
function sum() {
    let args: IArguments = arguments;
}
```

## 函数类型

1. 函数表达式：

```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

2. 用接口定义函数

```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

3. 可选参数必须在必需参数后面。换句话说，可选参数后面不允许再出现必须参数了：

```ts
function buildName(firstName?: string, lastName: string) {
  return lastName;
}
let tomcat = buildName(undefined, 'Cat');

// index.ts(1,40): error TS1016: A required parameter cannot follow an optional parameter.
```

4. TypeScript 会将添加了默认值的参数识别为可选参数，此时就不受「可选参数必须接在必需参数后面」的限制了：

```ts
function buildName(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');
```

5. 剩余参数是一个数组。所以我们可以用数组的类型来定义它：

```ts
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}
let a = [];
push(a, 1, 2, 3);
```

> 注意，rest 参数只能是最后一个参数

6. 我们可以使用重载定义多个 reverse 的函数类型：

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。

> 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

## 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

1. 语法：

```ts
<类型>值
```
或：

```ts
值 as 类型
```

> 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。

2. 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：

```ts
function toBoolean(something: string | number): boolean {
    return <boolean>something;
}
// index.ts(2,10): error TS2352: Type 'string | number' cannot be converted to type 'boolean'.
//   Type 'number' is not comparable to type 'boolean'.
```

## 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

1. 比如使用 `declare var` 来定义 `jQuery` 的类型：

```ts
declare var jQuery: (selector: string) => any;
jQuery('#foo');
```

上例中，`declare var` 并没有真的定义一个变量，只是定义了全局变量 `jQuery` 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。

2. 声明文件必需以 `.d.ts` 为后缀。

3. 推荐使用 `@types` 统一管理第三方库的声明文件。以 jQuery 为例：

```bash
npm install @types/jquery --save-dev
```

> 可以在[这个页面](http://microsoft.github.io/TypeSearch/)搜索你需要的声明文件。

4. 全局变量的声明文件主要有以下几种语法：

* `declare var` 声明全局变量
* `declare function` 声明全局方法
* `declare class` 声明全局类
* `declare enum` 声明全局枚举类型
* `declare namespace` 声明全局对象（含有子属性）
* `interface` 和 `type` 声明全局类型

## 内置对象

1. [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的。

> 注意，TypeScript 核心库的定义中不包含 Node.js 部分。

2. Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：

```bash
npm install @types/node --save-dev
```

## 类型别名

类型别名用来给一个类型起个新名字（类型别名常用于联合类型）：

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

## 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个：

```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
```

上例中，我们使用 type 定了一个字符串字面量类型 EventNames，它只能取三种字符串中的一种。

## 元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象：

```ts
let xcatliu: [string, number] = ['Xcat Liu', 25];
```

1. 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：

```ts
let xcatliu: [string, number];
xcatliu = ['Xcat Liu', 25];
xcatliu.push('http://xcatliu.com/');
xcatliu.push(true);

// index.ts(4,14): error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
```

## 类

1. 使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

```ts
class Animal {
    static isAnimal(a) {
        return a instanceof Animal;
    }
}
let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```

2. TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected：

* public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
* private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
* protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的