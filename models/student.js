var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.set('debug', true);

var student = new Schema({
  name: String,
  regno: String,
  submitted: String,
  course: String,
  date: String
  
},

  {
    collection: 'students'
  }
);
module.exports = mongoose.model('Student', student)