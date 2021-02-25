const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

var Atlas_uri='mongodb://localhost:27017/DB'
const uri = Atlas_uri ;



mongoose.connect(
    uri,
  
    {
      useMongoClient: true
    }
  );



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

const userRouter = require('./api/routes/memes');

app.use('/memes', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});