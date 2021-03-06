const mongoose = require('mongoose');
mongoose.Promise = Promise;


const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL);

db.once('open',  () => {
  console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

db.on('error', (err) => {
  console.error(`Database error:\n${err}`);
})
