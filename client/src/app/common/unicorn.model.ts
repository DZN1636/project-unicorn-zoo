const HANDPICKED_SHADES = ['9c', 'bf', 'e6'];
const GENDERS = ['M', 'F', 'O'];

const randomPick = (pickSource: Array<string>) => {
  const randomIndex = Math.floor(Math.random() * pickSource.length);
  return pickSource[randomIndex];
};

const generateHexColor = () => {
  return [1,2,3].reduce((acc: string) => {
    return acc.concat(randomPick(HANDPICKED_SHADES));
  }, '#');
};

export class Unicorn {
  name: string;
  color: string;
  gender: string;
  age: number;

  constructor(name, age) {
    this.name = name || 'unicorn'.concat(' ' + Math.floor(Math.random() * 100));
    this.age = age || Math.round(Math.random() * 100);
    this.gender = randomPick(GENDERS);
    this.color = generateHexColor();
  }
}

// // test lodash
// import * as _ from 'lodash';
// _.map({0: '0', 1: '1'}, (val, key, col) => {
//   console.log(key);
// });

// example: granny & child
// const uni_1 = new Unicorn('first', 70);
// const uni_2 = new Unicorn('second', 20);
// console.log(uni_1, uni_2);
