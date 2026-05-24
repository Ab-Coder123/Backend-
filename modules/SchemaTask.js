const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchemadata = new Schema({
  Name_task: {
    type: String,
    required: true
    },  
    Description: {
    type: String,
    required: true 
    },
    Due_date: {
    type: Date,
    required: true
    },
    name_user: {
    type: String,
    required: true
    },  
    Status: {   
    type: String,
    required: true
    },
    type_task: {
    type: String,
    required: false
    }
});

const TaskSchema = mongoose.model("Task", TaskSchemadata);
module.exports =  TaskSchema
