const HANDPICKED_SHADES = ['9c', 'bf', 'e6', '42', '86', 'f4'];
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
  id: number;
  name: string;
  color: string;
  gender: string;
  age: number;

  // constructor(id?: number, name: string, age: number, color?: string) {
  //   this.id = id;
  constructor(name: string, age: number, color?: string) {
    this.name = name || 'unicorn'.concat(' ' + Math.floor(Math.random() * 100));
    this.age = age || Math.round(Math.random() * 100);
    this.gender = randomPick(GENDERS);
    this.color = color || generateHexColor();
  }
}

// example: granny & child
// const uni_1 = new Unicorn('first', 70);
// const uni_2 = new Unicorn('second', 20);
// console.log(uni_1, uni_2);
