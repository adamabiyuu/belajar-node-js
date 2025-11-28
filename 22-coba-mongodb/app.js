const { MongoClient } = require("mongodb");
 const ObjectId = require("mongodb").ObjectId;

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect((error, client) => {
  if (error) {
    return console.log("Koneksi Gagal");
  }

  // pilih database
  const db = client.db(dbName);

  // menambahkan 1 data ke collection mahasiswa
  //     db.collection('mahasiswa').insertOne(
  //         {
  //             nama: 'wiliam',
  //             email: 'wiliam@gmail.com'
  //     },
  //     (error, result) => {
  //         if(error) {
  //             return console.log('gagal menambahkan data')
  //         }

  //         console.log(result)
  //     }
  // )

  // menambahkan lebih dari 1 data
  // db.collection('mahasiswa').insertMany(
  //     [
  //         {
  //             nama: 'wiliam',
  //             email: 'wiliam@yahoo.com'
  //         },
  //         {
  //             nama: 'Avip',
  //             email: 'avip@gmail.com'
  //         }
  //     ],
  //     (error, result) => {
  //         if( error ){
  //             return console.log('data gagal ditambahkan');
  //         }
  //         console.log(result)
  //     }
  // )

  // // Menampilkan semua data yang ada di collection 'mahasiswa'
  // console.log(db.collection('mahasiswa').find().toArray((error, result) => {
  //     console.log(result)
  // }));

  // Menampilkan data berdasarkan kriteria yang ada di collection 'mahasiswa'
  //   console.log(
  //     db
  //       .collection("mahasiswa")
  //       .find({ _id: ObjectId("69287ac39cd8cd2abc552944") })
  //       .toArray((error, result) => {
  //         console.log(result);
  //       })
  //   );

  // mengubah data berdasarkan id
  // const updatePromise = db.collection("mahasiswa").updateOne({
  //   _id: ObjectId("69287ac39cd8cd2abc552944"),
  // }, {
  //     $set: {
  //         email: 'avip@yahoo.com'
  //     }
  // });
  // updatePromise.then((result) => {
  //     console.log(result)
  // }).catch((error) => {
  //     console.log(error)
  // })

  // Mengubah data lebih dari 1, berdasarkan kriteria
  // db.collection('mahasiswa').updateMany({
  //     nama: 'wiliam'
  // }, {
  //     $set: {
  //         nama: 'wiliam aja'
  //     }
  // })

  // // menghapus 1 data
  // db.collection("mahasiswa").deleteOne({
  //   _id: ObjectId("69287ac39cd8cd2abc552944"),
  // }).then((result) => {
  //     console.log(result)
  // }).catch((error) => {
  //     console.log(error)
  // })

  // menghapus lebih dari 1 data
  db.collection("mahasiswa")
    .deleteMany({
        nama: 'wiliam aja'
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
})