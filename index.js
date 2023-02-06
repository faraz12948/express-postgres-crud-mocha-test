const express = require('express');
const app = express();
const controller = require('./controller/controller');

app.use(express.json());
app.use('/records', controller);
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

module.exports = app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})