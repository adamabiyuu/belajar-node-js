const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
// Third-party Middleware
app.use(expressLayouts);
// Built-in middleware buat gambar diizinin terlihat di kasus ini
app.use(express.static('public'))
// Built-in middleware buat data yang dikirim harus diparsing dulu
app.use(express.urlencoded( { extended: true }))


// Halaman Home
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "abi",
      email: "abi@gmail.com",
    },
    {
      nama: "budi",
      email: "budi@gmail.com",
    },
    {
      nama: "cuci",
      email: "cuci@gmail.com",
    },
  ];
  res.render("index", {
    layout: "layouts/main-layout",
    nama: "adam abiyuu",
    mahasiswa,
    title: "Halaman Home",
  });
});

// Halaman about
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

// Halaman contact
app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
})