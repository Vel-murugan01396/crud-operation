const mongoose = require('mongoose');


const PgDiplmo = new mongoose.Schema({
 
  PgDipolmaCourseName: {
    type: String
  },
  
   
    Duration: {
      type: String
    }
  
});

const PgDiplmoModel = mongoose.model('PgDipolmaCourse', PgDiplmo);

module.exports = PgDiplmoModel;
