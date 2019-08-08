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