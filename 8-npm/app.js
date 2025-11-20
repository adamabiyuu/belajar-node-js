const validator = require('validator');
const chalk = require('chalk');
// console.log(validator.isEmail('adam@gmail.com'))
// console.log(validator.isMobilePhone('0812323443', 'id-ID'))
// console.log(chalk.black.bgRed('Hello warna biru'));

const nama = 'adam';
const pesan = chalk`Lorem ipsum, dolor {bgRed.green sit amet} consectetur adipisicing elit. Ex, impedit. Nama saya: ${nama}`;
console.log(pesan)
