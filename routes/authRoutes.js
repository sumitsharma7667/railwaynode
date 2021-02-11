const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const Project =mongoose.model('project')
const cors = require('cors');

// for multer
multer = require('multer')
multer({
    limits: { fieldSize: 2 * 1024 * 1024 }
  })
router.use(cors({ origin: true }));
//code for images
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({ storage: storage })
// end multer
//end code for images
// Railway project
router.post('/createproject',upload.single('image'), async (req, res) => {
    console.log(req.files)
    const { projectname,owner,latitude,longitude,description,location,estimatedbudget,approvedbudget,utilzedbudget,remainingbudget} = req.body;
    const image = req.file.path
    try {
        const project = new Project({ projectname,owner,latitude,longitude,description,location,estimatedbudget,approvedbudget,utilzedbudget,remainingbudget,image })
        await project.save();
        if (project) {
        console.log("data is store")
        }
        else {
            console.log("data is not stored")
        }
        res.send(project)
    } catch (err) {
        console.log(err)
        return res.status(422).send(err.message)     
    }
    })
    router.get('/getproject', async (req, res) => {
        try {
            const data = await Project.find()
            if (data) {
                console.log(data[0])
            }
            console.log(data[0])
            res.send(data)
        }
        catch (err) {
            return res.status(422).send({ error: "error for fetching food data" })
        }
    })
// end railway project
module.exports = router

