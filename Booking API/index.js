require('dotenv').config();
const express = require('express');
const routes = require('./routes/bookingRouter')

const app = express();
const port = process.env.PORT || 3005

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(process.env.URL_BASE, routes);

app.listen(port, () => {
    console.log(`Listening server in port ${port}`)
});