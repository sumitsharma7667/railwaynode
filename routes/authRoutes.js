const express = require('express')
const { Router } = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../keys');
const { json } = require('body-parser');
const router = express.Router()
const User = mongoose.model('user')
const category = mongoose.model('category')
const manufacturer = mongoose.model('manufacturer')
const Project =mongoose.model('project')
// const AddOn = mongoose.model('AddOn')
 const Order= mongoose.model('orders')
// const Points= mongoose.model('points')


const cors = require('cors');
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
//end code for images
router.post('/signup', async (req, res) => {  
    console.log(req.body)
    const {password, role,mobile,fullname} = req.body;
    try {
        const user = new User({ password, role,mobile,fullname})
        await user.save();
        const token = jwt.sign({userId:user.id }, jwtkey)
        res.send({ token: token, userid: user.id, user,  })
        // console.log(token)
    } catch (err) {
        return res.status(422).send(err.message)
    }
})
router.post('/signin', async (req, res) => {
    const { mobile, password,} = req.body
    console.log(req.body)
    console.log(mobile, password)
    if (!mobile || !password) {
        return res.status(422).send({ error: "must provide email or password2" })
    }
    const user = await User.findOne({ mobile ,password})
    console.log(user)
    if (!user) {
        return res.status(422).send({ error: "must provide email or password3" })
    }
    try {
        // await user.comparePassword(password);
        const token = jwt.sign({ userId: user.id }, jwtkey)
        console.log(user.id)
        res.send({ token: token, userid: user.id, user})
    }
    catch (err) {
        return res.status(422).send({ error: "must provide email or password4" })
    }
})

// category routes
    router.post('/catogory', upload.single('image'), async (req, res) => {
    console.log(req.file)
    console.log(req.body)
    const { name,s_name, s_description,description } = req.body;
    const image = req.file.path
    try {
        const catogory = new category({ name,s_name, s_description,description,image })
        await catogory.save();
        if (catogory) {
            console.log("catogory")
        }
        else {
            console.log("data is not stored")
        }
        console.log(catogory);
        res.send(catogory)
    } catch (err) {
        return res.status(422).send(err.message)
     
    }
})
router.delete('/deleteCategory', (req, res) => {
    const { _id } = req.body
    console.log(_id)
    category.findByIdAndRemove(_id).exec();
    res.send({ res: "Deleted Sucessfully" })
})

router.get('/getCategories', async (req, res) => {
    
    try {
        const data = await category.find()
        if (data) {
            console.log(data[0])
        }
        console.log(data[0])
        res.send(data)
    }
    catch (err) {
        return res.status(422).send({ error: "error for fetching profile data" })
    }
})
router.put('/updateCategory', upload.single('image') ,async (req, res) => {
    const { _id,name,s_name, s_description,description } = req.body;
    const image = req.file.path
    category.findByIdAndUpdate({_id},{  name,s_name, s_description,description,image }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }

    })
})
// end category routes
// Manufacturere Routes
router.post('/addmanufacturer', upload.single('image'), async (req, res) => {
    console.log(req.file)
    console.log(req.body)
    const { name,description } = req.body;
    const image = req.file.path
    try {
        const Manufacturer = new manufacturer({ name,description,image })
        await Manufacturer.save();
        if (Manufacturer) {
            console.log("Manufacturer")
        }
        else {
            console.log("data is not stored")
        }
        console.log(Manufacturer);
        res.send(Manufacturer)
    } catch (err) {
        return res.status(422).send(err.message)
     
    }
})
router.get('/getManufacturer', async (req, res) => {
    try {
        const data = await manufacturer.find()
        if (data) {
            console.log(data[0])
        }
        console.log(data[0])
        res.send(data)
    }
    catch (err) {
    return res.status(422).send({ error: "error for fetching profile data" })
    }
})
// End Manufacturer Routes
// start order
router.post('/order', async (req,res) => {   
    const {userid,order,address,mobile,status,totalamount,instruction,addresstype,deliverytype,username,othermobile,orderfor,paymentid}=req.body 
    // var order_no = 1    
    try {
        const orders = new Order({ userid,order,address,mobile,status,totalamount,instruction,addresstype,deliverytype,username,othermobile,orderfor,paymentid})
        await orders.save();
        if (orders) {
            console.log("data is store")
        }
        else {
            console.log("data is not stored")
        }
        res.send(orders)
    } catch (err) {
        console.log(err)
    return res.status(422).send(err.message)     
    }
}) 

router.patch('/updateorder',async (req, res) => {  
    console.log(req.body)  
    const { _id,status,paymentid } = req.body;
    try{
        Order.findByIdAndUpdate({_id},{status,paymentid }, function(err, result){
            if(err){
                res.send(err)
            }
            else{
                res.send(result)
            }
        })
    }
    catch(err){
        console.log(err)
    }    
})
router.post('/orderbyid',async (req,res) => {    
    const {userid}=req.body
    console.log(userid)
    try {
        const data = await Order.find( {userid} )        
        if (data) {
        console.log("data is store")
        }
        else {
            console.log("data is not stored")
        }
        res.send(data)
    } catch (err) {
        console.log(err)
        return res.status(422).send(err.message)
     
    }
})
// End order



// Railway project
router.post('/createproject',upload.single('image'), async (req, res) => {
    console.log(req.body)
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
// end railway project
module.exports = router

