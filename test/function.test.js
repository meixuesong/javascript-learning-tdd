import expect from 'expect';

describe('Function', function () {
  it('should define a function', function () {
    const add = function (x, y) {
      return x + y;
    }

    expect(add(2, 3)).toBe(5);
  });

  it('should declare a function', function () {
    function square(x) {
      return x * x;
    }

    expect(square(2)).toBe(4);
  });

  it('should has scope', function () {
    let a = 10;
    const add = function (x, y) {
      var b = 20;
      return x + y + a;
    };

    expect(add(2, 3)).toBe(15);
  });

  it('should support arrow function', function () {
    const power = (base, exponent) => {
      let result = 1;
      for (let count = 0; count < exponent; count++) {
        result *= base;
      }
      return result;
    }

    expect(power(2, 3)).toBe(8);
  });

  it('should support default parameter', function () {
    const power = (base, exponent = 2) => {
      let result = 1;
      for (let count = 0; count < exponent; count++) {
        result *= base;
      }
      return result;
    }

    expect(power(3)).toBe(9);
  });

  it('default parameter, undefined', () => {
    function add(a, b = 10, c) {
      return a + b + c;
    }

    expect(add(1, 2, 3)).toEqual(6);
    expect(add(1, undefined, 2)).toEqual(13);
    expect(add(1, null, 2)).toEqual(3);
  });

  it('expression as default parameter value', () => {
    function hello(name, time = new Date()) {
      return `Hello ${name}, ${time}`;
    }

    expect(hello('A')).toContain('GMT+0800');
  });

  it('should support closure 1', function () {
    function wrapValue(n) {
      let local = n;
      return () => local;
    }

    let wrap1 = wrapValue(1);
    let wrap2 = wrapValue(2);

    expect(typeof wrap1()).toBe("number");
    expect(wrap1()).toBe(1);
    expect(wrap2()).toBe(2);
  });

  it('should support closure 2', function () {
    function multiplier(factor) {
      return number => number * factor;
    }

    let twice = multiplier(2);
    expect(typeof twice).toBe("function");
    expect(twice(4)).toBe(8);
  });

  it('should support recursion', function () {
    function power(base, exponent) {
      if (exponent == 0) {
        return 1;
      } else {
        //Warning: slow implementation
        return base * power(base, exponent - 1);
      }
    }

    expect(power(2, 3)).toBe(8);
  });

  it('should support rest parameters, it should be the last parameter', function () {
    function max(...numbers) {
      let result = -Infinity;
      for (let number of numbers) {
        if (number > result) {
          result = number;
        }
      }

      return result;
    }

    expect(max(1, 100, 2, -3, 90)).toBe(100);
  });

  it('should support spread operator', function () {
    function max(a, b) {
      if (a > b) return a;
      return b;
    }

    const array = [1, 2];

    //spread操作符用在调用时，把数组展开为单个参数
    expect(max(...array)).toEqual(2);
    expect(max(array[0], array[1])).toEqual(2);
  });

  it('use spread operator to copy fields', function () {
    const sam = {first: 'Sam', age: 20};
    let sam2 = {...sam, age: 3, height: 100};

    expect(sam2).toEqual({first: 'Sam', age: 3, height: 100});
  });

});

describe('Arrow Functions', function () {
  it('from anonymous to arrow function', function () {
    function sqr(n) {
      return n * n;
    }

    expect(sqr(3)).toEqual(9);

    const sqr2 = (n) => n * n;
    expect(sqr2(3)).toEqual(9);

    const arrow3 = () => 6;
    expect(arrow3()).toEqual(6);
  });

  it('dropping the parentheses when only 1 parameter', function () {
    const sqr = n => n * n;
    expect(sqr(2)).toEqual(4);
  });

  it('arrow function vs anonymous function, lexical scope', function () {
    //两者r 区别：
    //anonymous function对this和arguments不是lexical scope
    this.stuff = 'from lexical scope';
    const someValue = 4;
    const self = this;

    // setTimeout(function () {
    //   console.log('someValue is ' + someValue); //4
    //   console.log('this...' + this.stuff); //undefined
    //   console.log('self...' + self.stuff); //from lexical scope
    // }, 50);

    (function() {
      expect(someValue).toEqual(4);
      expect(this).toBeUndefined();
      expect(self.stuff).toEqual('from lexical scope');
    })();

    // setTimeout(() => {
    //   console.log('someValue is ' + someValue); //4
    //   console.log('this...' + this.stuff); //from lexical scope
    //   console.log('self...' + self.stuff); //from lexical scope
    // }, 50);

    (()=>{
      expect(someValue).toEqual(4);
      expect(this.stuff).toEqual('from lexical scope');
      expect(self.stuff).toEqual('from lexical scope');
    })();

  });

});

describe('bind, call, apply', function () {
  it('bind', function () {
    const greet = function (message, name) {
      return message + ' ' + name;
    }
    //bind的第n+1个参数绑定function的第n个参数
    //bind的第1个参数绑定function的this,
    const sayHi = greet.bind(null, 'hi');
    expect(sayHi('Joe')).toEqual('hi Joe');

    const greet2 = (message, name) => message + ' ' + name;
    const sayHi2 = greet2.bind(null, 'hi'); //对箭头函数，会忽略第1个参数
    expect(sayHi2('Jason')).toEqual('hi Jason');
  });
});