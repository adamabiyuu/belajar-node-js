const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);


app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next()
})
app.use((req, res, next) => {
  console.log('ini middleware yang ketiga')
  next()
})

app.get("/", (req, res) => {
  // res.sendFile('./index.html', { root: __dirname });
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
  // res.sendFile("./about.html", { root: __dirname });
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About'
  })
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
  });
  // res.sendFile("./contact.html", { root: __dirname });
});

app.get('/product/:id', (req, res) => {
  res.send(`Product ID :   ${req.params.id} <br> Category ID : ${req.query.category} `)
})

// diakhir karna nanti kalo pertama nanti apapun yang ditulis
// bakal diambil semua sama si use dibawah ini
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

