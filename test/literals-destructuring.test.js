import expect from "expect";

describe('Literals', function () {
  it('template literals', function () {
    const name1 = 'Jack';
    const name2 = 'Jill';
    const value = `Hello ${name1} and ${name2}`;

    expect(value).toEqual('Hello Jack and Jill');
  });

  it('multiline strings', function () {
    const name = 'John';
    const message = `Dear ${name}
    We're delighted to let you know...
      You can thank us later.
    
    `;

    const expectedMessage = 'Dear John\n    We\'re delighted to let you know...\n      You can thank us later.\n    \n    ';

    expect(message).toEqual(expectedMessage);
  });

  it('tagged template', function () {
    const mask = function (texts, ...expressions) {
      const createMask = (text) => '*'.repeat(text.length);
      const maskedText = expressions
        .map((expression, index) => `${texts[index]}${createMask(expression.toString())}`).join('');

      const closingText = texts[texts.length - 1];
      return `${maskedText}${closingText}`;
    };
    const agent = 'Bond';
    const organization = 'MI6';

    expect(mask`Hi, I'm ${agent}, with ${organization}.`).toEqual('Hi, I\'m ****, with ***.');
  });
});

describe('Destructuring', function () {
  it('array destructuring', function () {
    const getPresidentNames = function () {
      return ['John', 'Quincy', 'Adams'];
    }

    expect(getPresidentNames()).toEqual(['John', 'Quincy', 'Adams']);

    const [first, second, third] = getPresidentNames();
    expect(first).toEqual('John');
    expect(second).toEqual('Quincy');
    expect(third).toEqual('Adams');

    const [firstName] = getPresidentNames();
    expect(firstName).toEqual('John');

    const [name1, , name3] = getPresidentNames();
    expect(name1).toEqual('John');
    expect(name3).toEqual('Adams');

    const [n1, , n3, n4] = getPresidentNames();
    expect(n4).toBeUndefined();

    const [nd1, , nd3, nd4='default'] = getPresidentNames();
    expect(nd4).toEqual('default');

    const [f1, ...f2] = getPresidentNames();
    expect(f2).toEqual(['Quincy', 'Adams']);
  });

  it('array destructuring sample: swapping', function () {
    let [a, b] = [1, 2];
    expect(a).toEqual(1);
    expect(b).toEqual(2);

    [a, b] = [b, a];
    expect(a).toEqual(2);
    expect(b).toEqual(1);
  });

  it('object destructuring', function () {
    const weight = 'WeightKG';
    const sam = {
      name: 'Sam',
      age: 2,
      height: 110,
      address: {street: '404 Missing St.'},
      shipping: {street: '500 NoName St.'},
      [weight]: 15,
      [Symbol.for('favoriteColor')]: 'Orange'
    };

    const {name: firstName, age: theAge} = sam;
    expect(firstName).toEqual('Sam');
    expect(theAge).toEqual(2);

    const {[weight]: wt, [Symbol.for('favoriteColor')]: favColor} = sam;
    expect(wt).toEqual(15);
    expect(favColor).toEqual('Orange');

    const{name, address: {street}, shipping: {street: shipStreet}} = sam;
    expect(name).toEqual('Sam');
    expect(typeof address).toEqual('undefined');
    expect(street).toEqual('404 Missing St.');
    expect(shipStreet).toEqual('500 NoName St.');
  });

  it('object destructuring with default value', function () {
    const sam = {
      name: 'Sam',
      age: 2
    }

    const {name, age=1, color='red'} = sam;
    expect(age).toEqual(2);
    expect(color).toEqual('red');
  });

  it('extracting object when passing to function', function () {
    const sam = {
      name: 'Sam',
      age: 2
    };

    const printInfo = function ({name: theName, age: theAge}) {
      return `${theName} is ${theAge} years old`;
    };

    expect(printInfo(sam)).toEqual('Sam is 2 years old');

    //如果属性名一样，就可以直接使用
    const printInfo2 = function ({name, age}) {
      return `${name} is ${age} years old`;
    };
    expect(printInfo2(sam)).toEqual('Sam is 2 years old');
  });

  it('extracting into existing variable', function () {
    const sam = {
      name: 'Sam',
      age: 2
    };

    let theName = 'A';
    // {name: theName} = sam; //doesn't work
    ({name: theName} = sam);
    expect(theName).toEqual('Sam');
  });

});