const http = require('http')
const mongoose = require("mongoose")

const app = require('./app');

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB Connection Ready')
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

async function startApp() {
    await mongoose.connect('mongodb://localhost/mydatabase')
    server.listen(8000, () => {
        console.log('Listening to PORT: 8000');
    })
}
startApp();
