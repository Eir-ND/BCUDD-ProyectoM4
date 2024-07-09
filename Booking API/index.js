require('dotenv').config();
const express = require('express');


const app = express();
const port = process.env.PORT || 3005

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Listening server in port ${port}`)
});