const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const { body, check, query, validationResult, Result } = require("express-validator");
const methodOverride = require('method-override')


const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require('./utils/db')
const Contact = require('./model/contact')

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride('_method'));

// setup ejs
app.set('view engine', 'ejs');
// Third-party Middleware
app.use(expressLayouts);
// Built-in middleware buat gambar diizinin terlihat di kasus ini
app.use(express.static('public'))
// Built-in middleware buat data yang dikirim harus diparsing dulu
app.use(express.urlencoded( { extended: true }))

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
  cookie: { maxAge: 6000 },
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());


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
app.get("/contact", async (req, res) => {
  
  const contacts = await Contact.find();

  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

// halaman form tambah data kontak
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Kontak',
    layout: 'layouts/main-layout'
  })
})

// Proses tambah Data Kontak
app.post('/contact', [
  body('nama').custom( async (value) => {
    const duplikat = await Contact.findOne({ nama: value });
    if(duplikat){
      throw new Error('Nama contact has already used')
    }
    return true;
  }),
  check('email', 'Email tidak valid').isEmail(),
  check('nohp', 'No Hp tidak valid').isMobilePhone('id-ID')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    // return res.status(400).json({errors: errors.array()});
    res.render('add-contact', {
      title: 'Form tambah data contact',
      layout: 'layouts/main-layout',
      errors: errors.array(),
    })
  } else {
    Contact.insertMany(req.body, (error, Result) => {
      // kirimkan flash message
      req.flash('msg', 'Data Contact berhasil ditambahkan!')
      // ini bakal ke contact yang method nya get
      res.redirect('/contact')
    })
  }
})

// proses delete contact
// app.get('/contact/delete/:nama', (req, res) => {
//   const contact = Contact.findOne({ nama: req.params.nama });

//   // jika kontak tidak ada
//   if(!contact){
//     res.status(404)
//     res.send('<h1>404</h1>')
//   } else {
//     Contact.deleteOne({ _id : contact._id}).then((result) => {
//       // kirimkan flash message
//       req.flash("msg", "Data Contact berhasil dihapus!");
//       // ini bakal ke contact yang method nya get
//       res.redirect("/contact");
//     });
//   }
// })

app.delete('/contact', (req, res) => {
  Contact.deleteOne({ nama : req.body.nama }).then((result) => {
      // kirimkan flash message
      req.flash("msg", "Data Contact berhasil dihapus!");
      // ini bakal ke contact yang method nya get
      res.redirect("/contact");
        })
})

// halaman form ubah data kontak
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama }) ;

  res.render('edit-contact', {
    title: 'Form Tambah Data Kontak',
    layout: 'layouts/main-layout',
    contact
  })
})

// proses ubah data
app.put(
  "/contact",
  [
    body("nama").custom( async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama contact has already used");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "No Hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form ubah data contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id},
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          }
        }
      ).then((result) => {
        // kirimkan flash message
        req.flash("msg", "Data Contact berhasil diubah!");
        // ini bakal ke contact yang method nya get
        res.redirect("/contact");
      })
    }
  }
);

// halaman detail kontak
app.get("/contact/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Halaman Detail Contact",
    contact
  });
});

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
})