// PostTask 
const router = require('express').Router()
router.post('/addtask', async (req, res) => {
    const newTask = new Task()
    newTask.Name_task = req.body.title
    newTask.Description = req.body.description
    newTask.Status = req.body.status
    newTask.Due_date = req.body.Due_date
    newTask.name_user = req.body.name_user
    newTask.type_task = req.body.type_task
    await newTask.save()
    res.send("new task added successfully")
}) ;
// import models
const TaskSchema = require('../modules/SchemaTask.js')

// GetTask
router.get('/gettasks', async (req, res) => {
    const data_task = await TaskSchema.find()
    res.json(data_task)
}) ;

// DeleteTask
router.delete(`/deletetasks_id=:_id`, async (req, res) => {
    const deletedTask = await TaskSchema.findByIdAndDelete(req.params._id)
    res.send("delete_task", deletedTask)
}) ;

// UpdateTask
router.put(`/updatetasks_id=:_id`, async (req, res) => {
    const updatedTask = await TaskSchema.findByIdAndUpdate(req.params._id, {
        Name_task: req.body.title,
        Description: req.body.description,
        Status: req.body.status,
        Due_date: req.body.Due_date,
        name_user: req.body.name_user,
        type_task: req.body.type_task
    })
    res.json(updatedTask)
}) ;

// GetTaskById
router.get(`/gettasks_id=:_id`, async (req, res) => {
    const data_task = await TaskSchema.findById(req.params._id)
    res.json(data_task)
}) ;

module.exports = router