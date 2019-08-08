import expect from "expect";

describe('Higer order functions', function () {
  it('should be a function which taking other functions as arguments or returning a function', function () {
    function greaterThan(n) {
      return m => m > n;
    }

    let greaterThan0 = greaterThan(0);

    expect(greaterThan0(1)).toBe(true);
  });

  it('should transforming with map', function () {
    function map(array, transform) {
      let mapped = [];
      for (let element of array) {
        mapped.push(transform(element));
      }

      return mapped;
    }

    function trans(x) {
      return x + 1;
    }

    let numbers = [0, 1, 2];
    expect(map(numbers, trans)).toEqual([1, 2, 3]);
  });

  it('should summarizing with reduce', function () {
    function reduce(array, combine, start) {
      let current = start;
      for (let element of array) {
        current = combine(current, element);
      }

      return current;
    }

    function combine(x, y) {
      return x + y;
    }

    let numbers = [1, 2, 3, 4];

    expect(reduce(numbers, combine, 0)).toBe(10);
  });
});