const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    projectname:{
        type:String,        
        required:true
    },
    owner:{
        type:String,        
        // required:true
    },
    latitude:{
        type:String,        
        // required:true
    },
    longitude:{
        type:String,        
        // required:true
    },
    description:{
        type:String,        
        // required:true
    },
    location:{
        type:String,        
        // required:true
    },
    estimatedbudget:{
        type:String,        

    },
    approvedbudget:{
        type:String,        

    },
    utilzedbudget:{
        type:String,        

    },
    remainingbudget:{
        type:String,        

    },
    image:{
        type:String,
        required:true
    }
},{timestamps: true}
)

mongoose.model('project',projectSchema);
