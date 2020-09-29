# Interface

One of TypeScript’s core principles is that type checking focuses on the shape that values have. This is sometimes called “duck typing” or “structural subtyping”. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.


```ts
interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

## Optional Properties `?`

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
```

## Readonly properties

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
// Cannot assign to 'x' because it is a read-only property.


let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

ro[0] = 12; // error!
// Index signature in type 'readonly number[]' only permits reading.
ro.push(5); // error!
// Property 'push' does not exist on type 'readonly number[]'.
ro.length = 100; // error!
// Cannot assign to 'length' because it is a read-only property.
a = ro; // error!
// The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.


let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

a = ro as number[];
```

## readonly vs const

The easiest way to remember whether to use readonly or const is to ask whether you’re using it on a variable or a property. `Variables` use `const` whereas properties use readonly.

## Excess Property Checks

- multi types


```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

// as syntax
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

## Function Types

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

// ❌ bad
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};

// ✅ good
mySearch = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
};
```

## Indexable Types

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];Try


interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

## Class Types

```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// static methods and instance function

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


// Another good way which use implements in class
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
};
```

## Extending Interfaces

```ts
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

// extend interface
interface Square extends Shape {
  sideLength: number;
}

// extend multiple interfaces
interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

## Hybrid Types

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

## Interfaces Extending Classes

```ts
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

class ImageControl implements SelectableControl {
// Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
//   Types have separate declarations of a private property 'state'.
  private state: any;
  select() {}
}
```