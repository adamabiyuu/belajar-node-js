const express = require("express");
const app = express();
const port = 3000;


app.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.json({
  //   nama: 'adam abiyu',
  //   email: 'adam@gmail.com',
  //   noHP: '0813588518'
  // })
  res.sendFile('./index.html', { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
  // res.send("Ini adalah halaman about");
});
app.get("/contact", (req, res) => {
  res.sendFile("./contact.html", { root: __dirname });
  // res.send("Ini adalah halaman contact");
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

// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data) => {
//       if (err) {
//         res.writeHead(404);
//         res.write("Error: file not found");
//       } else {
//         res.write(data);
//       }
//       res.end();
//     });
// }

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     })
//     const url = req.url;
//     switch (url) {
//         case './about.html':
//             renderHTML("./about.html", res);
//             break;
//         case './contact.html':
//             renderHTML("./contact.html", res);
//             break;
//         default:
//             renderHTML('./index.html', res)
//             break;
//     }
//     // if( url === '/about'){
//     //     renderHTML('./about.html', res);
//     // } else if (url === '/contact'){
//     //     renderHTML("./contact.html", res);
//     // } else {
//     //     // res.write('<h1>Hello world</h1>')
//     //     renderHTML("./index.html", res);
//     }
// ).listen(3000, () => {
//     console.log('Server is listening on port 3000');
// })
