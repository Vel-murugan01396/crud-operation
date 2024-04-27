const mongoose = require('mongoose');
const phdSchema = new mongoose.Schema({

coursename: {
    type: String,
    required: true
},
 
      duration: {
            type: String,
            require: true
        }
});
const PhdModel = mongoose.model('Phd', phdSchema);
module.exports = PhdModel;