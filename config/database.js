var mongoose = require('mongoose');
mongoose.Promise = Promise;


var db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL);

// database connection event
db.once('open', function () {
  console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

db.on('error', function(err) {
  console.error(`Database error:\n${err}`);
})
