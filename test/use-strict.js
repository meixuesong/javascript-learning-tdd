// 'use strict';

/**
 * node test/use-strict.js 可以看到在strict模式下会报错
 */

const oops = function () {
  haha = 2;
  console.log(haha);
};

oops();
console.log(haha);