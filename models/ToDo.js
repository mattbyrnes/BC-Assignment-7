const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  
  itemID: {
    type: String,
    // unique: true,
    required: "You Must Include a To DO"
  }

//   completed: {
//     type: Boolean,
//     default: false
//    }

});

var ToDo = mongoose.model('ToDo', ToDoSchema);

module.exports = ToDo;
