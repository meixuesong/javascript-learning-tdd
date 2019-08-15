import expect from "expect";

describe('Promises', function () {
  it('has 3 state: pending, resolve, reject', async () => {
    const computeSqrtAsync = function (number) {
      if (number < 0) {
        return Promise.reject('no negative number, please.');
      }

      if (number === 0) {
        return Promise.resolve(0);
      }

      return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(Math.sqrt(number)), 100);
      })
    };

    const reportOnPromise = function (promise) {
      promise
        .then(result => console.log(`result is ${result}.`))
        .catch(error => console.log(`Error: ${error}`));
    }

    const forNegativel = computeSqrtAsync(-1);
    console.log(forNegativel);

    const forSixteen = computeSqrtAsync(16);
    console.log(forSixteen);

    // const result = await reportOnPromise(forSixteen);
    const result = await forSixteen;
    expect(result).toBe(4);

  });

  it('promise race', async () => {
    const createPromise = function (timeInMillis) {
      return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(timeInMillis), timeInMillis);
      });
    };

    const createTimeout = function (timeInMillis) {
      return new Promise(function (resolve, reject) {
        setTimeout(() => reject(`timeout after ${timeInMillis} MS`), timeInMillis);
      })
    };

    await Promise.race([createPromise(100), createPromise(200), createTimeout(300)])
      .then(result => console.log(`completed after ${result} MS`))
      .catch(error => console.log(`Error: $(error}`));
  }
)
  ;
});