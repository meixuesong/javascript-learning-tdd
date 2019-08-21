import expect from "expect";

describe('Meta Programming', function () {
  //Injection: 例如给Date加个方法
  //Synthesis: 例如Employee.findThoseWithFirstName('Sara')

  it('Dynamic Access', function () {
    class Person {
      constructor(age) {
        this.age = age;
      }

      play() {
        return `The ${this.age} year old is playing`;
      }

      get years() {
        return this.age;
      }
    }

    const sam = new Person(2);

    const ageField = 'age';
    const methodName = 'play';

    expect(sam['age']).toEqual(2);
    expect(sam[methodName]()).toEqual('The 2 year old is playing');

    //get properties of object
    const properties = [];
    for (const property in sam) {
      properties.push(property);
    }
    expect(properties).toEqual(['age']);

    //get own property names
    const ownProperties = Object.getOwnPropertyNames(Reflect.getPrototypeOf(sam));
    expect(ownProperties).toEqual(['constructor', 'play', 'years']);
  });
});

describe('Member injection', function () {
  it('injecting a method into an instance', function () {
    const text = new String('live');
    text.reverse = function () {
      return this.split('').reverse().join('');
    }

    expect(text.reverse()).toEqual('evil');
  });

  it('injecting a method into class prototype', function () {
    const text = 'live';
    String.prototype.reverse = function () {
      return this.split('').reverse().join('');

    }

    expect(text.reverse()).toEqual('evil');
  });

  it('injecting a property into an instance', function () {
    const today = new Date('2019-01-20');

    Object.defineProperty(today, 'isInLeapYear', {
      get: function () {
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
      }
    });

    expect(today.isInLeapYear).toEqual(false);
  });

  it('injecting a property into class', function () {
    //在Mocha watch模式下，会重复定义，导致出错
    //   Object.defineProperty(Date.prototype, 'isInLeapYear', {
    //     get: function () {
    //       const year = this.getFullYear();
    //       return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    //     }
    //   });
    //   const today = new Date("2019-01-20");
    //
    //   expect(today.isInLeapYear).toEqual(true);
    // });

    it('injecting properties', function () {
      Object.defineProperties(Array.prototype, {
        first: {
          get: function () {
            return this[0];
          },
          set: function (value) {
            this[0] = value;
          }
        },
        last: {
          get: function () {
            return this[this.length - 1];
          },
          set: function (value) {
            this[Math.max(this.length - 1, 0)] = value;
          }
        }
      });

      const langs = ['JavaScript', 'Ruby', 'Python', 'Clojure'];

      expect(langs.first).toEqual('JavaScript');
      expect(langs.last).toEqual('Clojure');

      langs.last = 'ClojureScript';
      expect(langs[3]).toEqual('ClojureScript');
    });
  });
});

describe('Reflect', function () {
  it('invoking a function through reflect', function () {
    const greet = function(msg, name) {
      const pleasantry = typeof (this) === 'string' ? this : 'have a nice day';
      return `${msg} ${name}, ${pleasantry}`;
    }

    expect(greet('Howdy', 'Jane')).toEqual('Howdy Jane, have a nice day');
    expect(greet.call('how are you?', 'Howdy', 'Jane')).toEqual('Howdy Jane, how are you?');
    //apply is prefer
    expect(greet.apply('how are you?', ['Howdy', 'Jane'])).toEqual('Howdy Jane, how are you?');

    expect(Reflect.apply(greet, 'how are you?', ['Howdy', 'Jane'])).toEqual('Howdy Jane, how are you?');
  });

});