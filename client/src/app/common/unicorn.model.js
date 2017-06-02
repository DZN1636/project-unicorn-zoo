"use strict";
exports.__esModule = true;
var HANDPICKED_SHADES = ['9c', 'bf', 'e6'];
var GENDERS = ['M', 'F', 'O'];
var randomPick = function (pickSource) {
    var randomIndex = Math.floor(Math.random() * pickSource.length);
    return pickSource[randomIndex];
};
var generateHexColor = function () {
    return [1, 2, 3].reduce(function (acc) {
        return acc.concat(randomPick(HANDPICKED_SHADES));
    }, '#');
};
var Unicorn = (function () {
    function Unicorn(name, age) {
        this.name = name || 'unicorn'.concat(' ' + Math.floor(Math.random() * 100));
        this.age = age || Math.round(Math.random() * 100);
        this.gender = randomPick(GENDERS);
        this.color = generateHexColor();
    }
    return Unicorn;
}());
exports.Unicorn = Unicorn;
// test lodash
var _ = require("lodash");
_.map({ 0: '0', 1: '1' }, function (val, key, col) {
    console.log(key);
});
// example: granny & child
// const uni_1 = new Unicorn('first', 70);
// const uni_2 = new Unicorn('second', 20);
// console.log(uni_1, uni_2);
