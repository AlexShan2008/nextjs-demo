# Learn TypeScript

## `Type vs Interface`

One of TypeScript’s core principles is that type checking focuses on the shape that values have. This is sometimes called “duck typing” or “structural subtyping”. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.

## Interface

```ts
interface User {
    name: string;
    id: number;
}

// constraint the type
const user: User = {
    name: "Hayes",
    id: 0,
};

// use 2
class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

// constraint the type
const user: User = new UserAccount("Murphy", 1);

// use in function return type
function getAdminUser(): User {
  //...
}

// use in function to constraint the params
function deleteUser(user: User) {
  // ...
}

```

## Type

> `type` 一定是小写的

**Must be, use the types `number`, `string`, `boolean`, `object` and `symbol`.**

```ts
type MyBool = true | false;

type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
  return obj.length;
}

type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

declare const backpack: Backpack<string>;
const object = backpack.get();
backpack.add(23);
```

### To learn the type of a variable, use typeof:
|  Type   | Predicate  |
|  ----  | ----  |
string	| typeof s === "string"
number	| typeof n === "number"
boolean	| typeof b === "boolean"
undefined	| typeof undefined === "undefined"
function	| typeof f === "function"
array	| Array.isArray(a)

## Basic Types

1. `Boolean`

```ts
let isDone: boolean = false;
```

2. `Number`

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

3. `String`

```ts
let color: string = "blue";
color = "red";

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;
```

4. `Array`

```ts
let list: number[] = [1, 2, 3];

let list: Array<number> = [1, 2, 3];
```

5. `Tuple`

```ts
/ Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

6. `Enum`

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green; // Green

enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];

// Displays 'Green'
console.log(colorName);
```

6. `Unknown`

```ts
let notSure: unknown = 4;
notSure = "maybe a string instead";

// OK, definitely a boolean
notSure = false;

declare const maybe: unknown;
// 'maybe' could be a string, object, boolean, undefined, or other types
const aNumber: number = maybe;
Type 'unknown' is not assignable to type 'number'.

if (maybe === true) {
  // TypeScript knows that maybe is a boolean now
  const aBoolean: boolean = maybe;
  // So, it cannot be a string
  const aString: string = maybe;
Type 'boolean' is not assignable to type 'string'.
}

if (typeof maybe === "string") {
  // TypeScript knows that maybe is a string
  const aString: string = maybe;
  // So, it cannot be a boolean
  const aBoolean: boolean = maybe;
Type 'string' is not assignable to type 'boolean'.
}
```

7. `Any`

```ts
declare function getValue(key: string): any;
// OK, return value of 'getValue' is not checked
const str: string = getValue("myString");

let looselyTyped: any = 4;
// OK, ifItExists might exist at runtime
looselyTyped.ifItExists();
// OK, toFixed exists (but the compiler doesn't check)
looselyTyped.toFixed();

let strictlyTyped: unknown = 4;
strictlyTyped.toFixed();
```

## `Any` vs `unknown`

any 和 unknown 的最大区别是, unknown 是 top type (任何类型都是它的 subtype) , 而 any 即是 top type, 又是 bottom type (它是任何类型的 subtype ) , 这导致 any 基本上就是放弃了任何类型检查.

我们只能将 unknown 类型的变量赋值给 any 和 unknown。

8. `Void`

```ts
function warnUser(): void {
  console.log("This is my warning message");
}

let unusable: void = undefined;
// OK if `--strictNullChecks` is not given
unusable = null;
```

9. `Null and Undefined`

```ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

// --strictNullChecks
```

10. `Never`

```ts
// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}

// Function returning never must not have a reachable end point
function infiniteLoop(): never {
  while (true) {}
}
```

11. `Object`

object is a type that represents the non-primitive type, i.e. anything that is not number, string, boolean, bigint, symbol, null, or undefined.



```ts
declare function create(o: object | null): void;

// OK
create({ prop: 0 });
create(null);

create(42);
// Argument of type '42' is not assignable to parameter of type 'object | null'.
create("string");
// Argument of type '"string"' is not assignable to parameter of type 'object | null'.
create(false);
// Argument of type 'false' is not assignable to parameter of type 'object | null'.
create(undefined);
// Argument of type 'undefined' is not assignable to parameter of type 'object | null'.
```

## Type assertions

- `as-syntax`:
```ts
let someValue: unknown = "this is a string";

let strLength: number = (someValue as string).length;
```
- `angle-bracket syntax`:

```ts
let someValue: unknown = "this is a string";

let strLength: number = (<string>someValue).length;
```

The two samples are equivalent. Using one over the other is mostly a choice of preference; however, when using TypeScript with JSX, only as-style assertions are allowed.