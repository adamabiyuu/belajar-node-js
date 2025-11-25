const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact } = require('./utils/contacts')

const app = express(); 
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
// Third-party Middleware
app.use(expressLayouts);
// Built-in middleware buat gambar diizinin terlihat di kasus ini
app.use(express.static('public'))
// Built-in middleware buat data yang dikirim harus diparsing dulu
app.use(express.urlencoded())


app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: 'abi',
      email: 'abi@gmail.com'
    },
    {
      nama: 'budi',
      email: 'budi@gmail.com'
    },
    {
      nama: 'cuci',
      email: 'cuci@gmail.com'
    },
  ]
  res.render("index", {
    layout: "layouts/main-layout",
    nama: "adam abiyuu",
    title: "Halaman Home",
    mahasiswa,
  });
});
app.get("/about", (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About'
  })
});
app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts
  });
});

// halaman form tambah data kontak
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Kontak',
    layout: 'layouts/main-layout'
  })
})

// Proses Data Kontak
app.post('/contact', (req, res) => {
  addContact(req.body);
  // ini bakal ke contact yang method nya get
  res.redirect('/contact')
})

// halaman detail kontak
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Halaman Detail Contact",
    contact
  });
});


// diakhir karna nanti kalo pertama nanti apapun yang ditulis
// bakal diambil semua sama si use dibawah ini
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

