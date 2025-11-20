// const fs = require('fs');

// try{

//     fs.writeFileSync('data/text.txt', 'ini make write synchronous');
// } catch(e){
//     console.log(e)
// }

// fs.writeFile('data/text.txt', 'ini write make asynchronous', (e)=> {
//     console.log(e)
// })

// const data = fs.readFileSync('data/text.txt', 'utf-8');
// console.log(data);

// fs.readFile('data/text.txt', 'utf-8', (e, data) => {
//     if(e) throw e;
//     console.log(data)
// })
const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question('nama kamu? ', (nama) => {
    rl.question('rumah? ', (rumah) => {
        const contact = {nama, rumah};
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);

        contacts.push(contact)

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        console.log('makasi dah diisi hehe')
        rl.close()
    })
})
