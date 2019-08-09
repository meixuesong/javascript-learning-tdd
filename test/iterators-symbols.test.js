import expect from "expect";

describe('Iterators', function () {
  it('for', () => {
    const names = ['a', 'b', 'c'];
    for (const name of names) {
      console.log(name);
    }
  });

  it('for entry', () => {
    const names = ['a', 'b', 'c'];
    for (const entry of names.entries()) {
      console.log(entry);
    }

    for (const [i, name] of names.entries()) {
      console.log(i + '--' + name);
    }
  });

  it('Symbol iterator', function () {
    let iterator = new Map([[111, 2222]])[Symbol.iterator]();
    let result1 = iterator.next();
    let result2 = iterator.next();

    expect(result1).toEqual({"done": false, "value": [111, 2222]});
    expect(result2).toEqual({"done": true, "value": undefined});
  });

  it('using yield with generator', function () {
    class MyIterator {
      constructor() {
        this.members = ['A', 'B', 'C'];
      };

      * [Symbol.iterator]() {
        for (const member of this.members) {
          yield member;
        }
      };

      * manualGenerator() {
        yield 'A';
        yield 'K';
        yield 'Q';
        yield 'J';

        for (let i = 10; i > 1; i--) {
          yield i.toString();
        }
      };

      * combinedGenerators() {
        yield* this[Symbol.iterator]();
        yield* this.manualGenerator();
      }
    }

    const myit = new MyIterator()[Symbol.iterator]();
    expect(myit.next()).toEqual({done: false, value: 'A'});
    expect(myit.next()).toEqual({done: false, value: 'B'});
    expect(myit.next()).toEqual({done: false, value: 'C'});
    expect(myit.next()).toEqual({done: true, value: undefined});

    const array = [];
    for (const ele of new MyIterator().manualGenerator()) {
      array.push(ele);
    }
    expect(array).toEqual(['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']);


    const combinedArray = [];
    for (const ele of new MyIterator().combinedGenerators()) {
      combinedArray.push(ele);
    }

    expect(combinedArray).toEqual(['A', 'B', 'C', 'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']);
  });

  it('infinite iterator', function () {
    const isPrime = function(number) {
      for (let i = 2; i < number; i++) {
        if (number % i === 0) return false;
      }

      return  number > 1;
    };

    const primesStartingFrom = function* (start) {
      let index = start;
      while (true) {
        if (isPrime(index)) yield index;
        index++;
      }
    };

    const array = [];
    let iterator = primesStartingFrom(10);
    for (let i = 0; i < 1000; i++) {
      array.push(iterator.next().value);
    }
    expect(array).toHaveLength(1000);
  });
});

describe('Symbol', function () {
  it('hidden properties', () => {
    const age = Symbol('ageValue');
    const email = 'emailValue';
    const sam = {
      first: 'Sam',
      [email]: 'sam@a.com',
      [age]: 2
    };

    let properties = [];
    for (const property in sam) {
      properties.push(property);
    }

    expect(properties).toContain('first');
    expect(properties).toContain('emailValue');
    expect(properties).not.toContain('age');

    sam[age] = 3;
    expect(sam[age]).toEqual(3);
    expect(typeof sam.age).toBe('undefined');
    expect(typeof sam[Symbol('ageValue')]).toBe('undefined');
  });

  it('global registry with symbol', () => {
    const masterWizard = Symbol.for('abc');
    const topWizard = Symbol.for('abc');

    expect(masterWizard).toBe(topWizard);
    expect(masterWizard === topWizard).toBeTruthy();
    expect(Symbol.keyFor(masterWizard)).toEqual('abc');
  });

  it('special well-known symbols', function () {
    class SuperHero {
      constructor(name, realName) {
        this.name = name;
        this.realName = realName;
      }

      toString() {
        return this.name;
      }

      [Symbol.search](value) {
        console.info('this: ' + this + ', value: ' + value);
        return value.search(this.realName);
      }
    }

    const superHeroes = [
      new SuperHero('Superman', 'Clark Kent'),
      new SuperHero('Batman', 'Bruce Wayne'),
      new SuperHero('Ironman', 'Tony Stark'),
      new SuperHero('Spiderman', 'Peter Parker')
    ];

    const names = 'Peter Parker, Clark Kent, Bruce Wayne';
    for (const superHero of superHeroes) {
      console.log(`Result of search: ${names.search(superHero)}`);
    }
  });
});
