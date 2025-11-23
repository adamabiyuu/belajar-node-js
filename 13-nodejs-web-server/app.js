const http = require('http');
const fs = require('fs');
const path = require('path');

const renderHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.write("Error: file not found");
      } else {
        res.write(data);
      }
      res.end();
    });
}

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    const url = req.url;
    switch (url) {
        case './about.html':
            renderHTML("./about.html", res); 
            break;
        case './contact.html':
            renderHTML("./contact.html", res); 
            break;
        default:
            renderHTML('./index.html', res)
            break;
    }
    // if( url === '/about'){
    //     renderHTML('./about.html', res);
    // } else if (url === '/contact'){
    //     renderHTML("./contact.html", res);
    // } else {
    //     // res.write('<h1>Hello world</h1>')
    //     renderHTML("./index.html", res);
    }
).listen(3000, () => {
    console.log('Server is listening on port 3000');
})