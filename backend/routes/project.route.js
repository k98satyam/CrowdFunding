const router = require('express').Router()
const Project = require('../models/project.model')

//return all project
router.get('/', (req,res) => {
    Project.find().sort({ createdAt : -1 })
        .then((result) => {
            //console.log(result)
            res.json(result)
        })
        .catch(err => res.status(400).json("Err :" + err))
})

//return single project
router.get('/:id', (req,res) => {
    Project.findById(req.params.id)
        .then((result) => {
            res.json(result)
        })
        .catch(err => res.status(400).json("Err :" + err))
})

//create a project
router.post('/create', (req,res) => {
    const project = new Project({
        projectTitle: req.body.title,
        authorName: req.body.authorName,
        authorID: req.body.authorID,
        category: req.body.category,
        description: req.body.description,
        goal: req.body.goal,
        recived: 0
    })
    project.save()
        .then((result) => {
            res.json("Project Added")
        })  
        .catch(err => res.status(400).json("Err :" + err))  
})

//update amount of money a project recived
router.post('/updateRecived', (req,res) => {
    // console.log(req.body)
    Project.findById(req.body.id)
        .then(response => {
            const newAmount = +response.recived + +req.body.newDonatedAmount
            Project.updateOne(
                { _id: req.body.id },
                { $set: { recived: Number(newAmount) } },
                (err,response) => {
                    if (err) res.status(400).json("Err :" + err)
                    else res.json(response)
                }
            )
        })
})

module.exports = router