const express = require('express');
require('dotenv').config();
require("../src/database/models");
const setRoutes = require('./apis/routes.js');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
});