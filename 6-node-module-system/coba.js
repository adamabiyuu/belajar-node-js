function cetakNama(nama){
    return `nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
    nama: 'adam',
    umur: 24,
    cetakMhs(){
        return `saya ${this.nama}, umur ${this.umur} tahun`
    }
}

class Orang {
    constructor(){
        console.log('objek Orang telah dibuat!')
    }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// module.exports = {
//     cetakNama: cetakNama,
//     PI: PI,
//     mahasiswa: mahasiswa,
//     Orang: Orang
// }

module.exports = { cetakNama, PI, mahasiswa, Orang };