require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// DB Connection
mongoose
  .connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED...'));

//init middleware
app.use(bodyParser.json());
app.use(cors());

//contact router
app.use('/api/contact', require('./routes/contact'));

//PORT
const PORT = process.env.PORT || 8000;

//Server listen
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
