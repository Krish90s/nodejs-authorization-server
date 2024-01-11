const express = require('express')
const mongoose = require('mongoose');
const { User } = require('./models/userModel');
const bodyParser = require("body-parser");
const app = express()
const port = 3000


const MONGO_URI = 'mongodb://localhost:27017/authorization';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/users/db', async(req, res) => {
  const users  = await User.find()
  res.send(users)
})
app.get('/users/redis', async(req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
