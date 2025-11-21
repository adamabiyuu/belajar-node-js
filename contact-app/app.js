const yargs = require('yargs')
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts')
// mengambil argument dari command line
// console.log(process.argv[2])


yargs.command({
  command: 'add',
  describe: 'nambahin contact',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string'
    },
    email:{
      describe: "Email",
      demandOption: false,
      type: 'string'
    },
    noHP: {
      describe: "No Handphone",
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv){
    simpanContact(argv.nama, argv.email, argv.noHP);
  }
}).demandCommand();

// menampilkan daftar semua nama dan no Hp contact
yargs.command({
  command: 'list',
  describe: 'menampilkan semua nama dan no HP contact',
  handler(){
    listContact();
  }
})

// menampilkan detail sebuah contact
yargs.command({
  command: 'detail',
  describe: 'menampilkan detail keseluruhan ',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    detailContact(argv.nama)
  }
})


// menghapus kontak berdasarkan nama
yargs.command({
  command: "delete",
  describe: "menghapus sebuah kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse()
























