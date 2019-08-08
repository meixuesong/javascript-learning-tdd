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
      return x* x;
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

  // it('use spread operator to copy fields', function () {
  //   const sam = {first: 'Sam', age: 20};
  //   // let sam2 = Object.assign(sam, {age: 3, height: 100});
  //   // let sam2 = Object.assign({...sam, age: 3, height: 100});
  //   let sam2 = {...sam, age: 3, height: 100};
  //
  //   expect(sam2).toEqual({first: 'Sam', age: 3, height: 100});
  // });

});