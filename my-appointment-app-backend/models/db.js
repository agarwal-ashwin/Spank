const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('our db is connected');
  })
  .catch(err => console.log(err.message));
