import expect from "expect";
import {sayHello} from "./es6-module.js";

describe('Modules', function () {

  it('commonJS', function () {
    const {sayHello} = require("./commonjs-module.js");
    expect(sayHello("Mei")).toEqual("Hello Mei");
  });

  it('ES6 module', function () {
    expect(sayHello("Mei")).toEqual("Hello Mei");
  });


});
