import expect from "expect";

describe('JavaScript Gotchas', function () {
  it('do not use var, use let or const', function () {
    for (let i = 0; i < 3; i++) {
      console.log(varName);
      var varName = 'spill ' + i;
      let letName = 'spill ' + i;
      const constName = 'spill ' + i;
    }

    //message可以在外部访问到
    expect(varName).toEqual("spill 2");
    expect(typeof letName).toEqual("undefined");
    expect(typeof constName).toEqual("undefined");
  });

  it('const only protect primitive values', function () {
    const max = 200;
    const sam = {first: 'Sam', age: 20};

    // max = 300;// not allowed
    // sam = {first: 'Sam', age: 30}; //not allowed
    sam.age = 30;
    expect(sam.age).toEqual(30);
  });

  it('freeze a object, but it is shallow freeze, not deep freez', function () {
    const sam = Object.freeze({first: 'Sam', age: 20});
    // sam.age = 30;//not allowed

  });



});