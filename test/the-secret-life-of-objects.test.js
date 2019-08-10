import expect from "expect";

describe('The secret life of object', function () {
  it('methods', function () {
    let rabbit = {};
    rabbit.speak = function (line) {
      return `The rabbit says '${line}'`;
    }

    expect(rabbit.speak('Hello')).toEqual("The rabbit says 'Hello'");
  });

  it('classes', function () {
    function Rabbit(type) {
      this.type = type;
    }
    Rabbit.prototype.speak = function (line) {
      return `The ${this.type} rabbit says '${line}'`;
    }

    let weirdRabbit = new Rabbit("weird");

    expect(weirdRabbit.speak("Hello")).toEqual("The weird rabbit says 'Hello'");
  });

  it('ES6 Class Notation', function () {
    class Rabbit {
      constructor(type) {
        this.type = type;
      }
      speak(line) {
        return `The ${this.type} rabbit says '${line}'`;
      }
    }

    let blackRabbit = new Rabbit('black');

    expect(blackRabbit.speak("Hello")).toEqual("The black rabbit says 'Hello'");
  });

  it('should have getter, setter and static', function () {
    class Temperature {
      constructor(celsius) {
        this.celsius = celsius;
        this.fahrenheitSetterCalled = false;
      }

      get fahrenheit() {
        return this.celsius * 1.8 + 32;
      }

      set fahrenheit(value) {
        this.fahrenheitSetterCalled = true;
        this.celsius = (value - 32) /1.8;
      }

      static fromFahrenheit(value) {
        return new Temperature((value - 32) / 1.8);
      }
    }

    let temp = new Temperature(22);
    expect(temp.fahrenheit).toEqual(71.6);

    expect(temp.fahrenheitSetterCalled).toBeFalsy();
    //will call setter
    temp.fahrenheit = 70;
    expect(temp.fahrenheitSetterCalled).toBeTruthy();
    expect(temp.celsius).toBeCloseTo(21.11, 2);

    let value = Temperature.fromFahrenheit(70);
    expect(temp.celsius).toBeCloseTo(21.11, 2);
  });

  it('static method', function () {
    class Car {
      static get ageFactor() {
        return 0.1;
      }
    }

    expect(Car.ageFactor).toEqual(0.1);
  });

  it('should support extends', function () {
    class Parent {
      constructor(x) {
        this.x = x;
      }

      plus(y) {
        this.x += y;
      }
    }

    let parent = new Parent(10);
    parent.plus(10);
    expect(parent.x).toEqual(20);

    class Child extends Parent {
      plus(y) {
        this.x += 2 * y;
      }
    }

    let child = new Child(10);
    child.plus(10);
    expect(child.x).toEqual(30);

    expect(child instanceof Parent).toBeTruthy();
  });
});

describe('Class expressions', function () {
  it('create class', function () {
    const createClass = function (...fields) {
      return class {
        constructor(...values) {
          fields.forEach((field, index) => this[field] = values[index]);
        }
      }
    }

    const Book = createClass('title', 'subtitle', 'pages');
    const book = new Book('A', 'B', 30);

    expect(book.title).toEqual('A');
    expect(book.subtitle).toEqual('B');
    expect(book.pages).toEqual(30);
  });
});

describe('new build-in classes: Set, Map, WeakSet, WeakMap', function () {
  it('Set', function () {
    const set = new Set(['A', 'b', 'c', 'A']);
    expect(set.size).toEqual(3);

    set.add('B');
    expect(set.size).toEqual(4);
  });

  it('Map', function () {
    const scores = new Map([['A', 10], ['B', 9]]);
    scores.set('B', 8);
    scores.set('C', 20);

    expect(scores.size).toEqual(3);
    expect(scores.get('B')).toEqual(8);
  });
});

describe('Prototypal Inheritance', function () {
  it('prototype chain', function () {
    class Counter {}

    const counter1 = new Counter();
    const counter2 = new Counter();

    const counter1Prototype = Reflect.getPrototypeOf(counter1);
    const counter2Prototype = Reflect.getPrototypeOf(counter2);

    expect(counter1).not.toBe(counter2);
    expect(counter1Prototype).toBe(counter2Prototype);
  });

  it('getter & setter behaviour', function () {
    class Counter {}
    Counter.prototype.count = 0;
    Counter.prototype.increment = function() {this.count += 1;};

    const counter1 = new Counter();
    const counter2 = new Counter();

    counter1.increment();

    expect(counter1.count).toEqual(1);
    expect(counter2.count).toEqual(0);

    //prototpye是用代理的方式，对getter和setter的处理不一样：
    //getter: 属性查找路径：object -> class prototype -> class prototype' prototype...
    //setter: 如果object没有属性，在object增加属性。
    expect(Object.keys(counter1)).toContain('count');
    expect(Object.keys(counter2)).not.toContain('count');
  });
});