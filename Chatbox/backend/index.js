const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const authRouters = require('./routs/user')

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/testdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/api/auth', authRouters)

app.listen(8000, () => {
    console.log("listening... on port 8000");
});
