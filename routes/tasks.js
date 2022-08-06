const Task = require("../models/task");
const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const ensureToken = (req,res,next)=>{

    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken  = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

router.post("/",ensureToken, async (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET,async (err,data)=>{

        if(err){
            res.sendStatus(403);
        }else{
            try {
                const task = await new Task(req.body).save();
                res.json({
                    text:"Task Added Successfully!!",
                    task,
                });
                
            } catch (error) {
                res.json({
                    text:"Some error occurred!!",
                    task,
                });
                console.log(error)
            }
        }
    })
});

router.get("/",ensureToken, async (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET,async (err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            try {
                const tasks = await Task.find();              
                res.send(tasks);
            } catch (error) {
                res.json({
                    text:"Some error occurred!!",
                });
                console.log(error)
            }
        }
    })
});

router.put("/:id",ensureToken, async (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET,async (err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            try {
                const task = await Task.findOneAndUpdate(
                    { _id: req.params.id },
                    req.body
                );
                res.json({
                    text:"Task Updated Successfully!!",
                    task,
                });
                
            } catch (error) {
                res.json({
                    text:"Some error occurred!!",
                    task,
                });
                console.log(error)
            }
        }
    })
    
});

router.delete("/:id",ensureToken, async (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET,async (err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            try {
                const task = await Task.findByIdAndDelete(req.params.id);
                res.json({
                    text:"Task Deleted Successfully!!",
                    task,
                });
                
            } catch (error) {
                res.json({
                    text:"Some error occurred!!",
                    task,
                });
                console.log(error)
            }
        }
    })
});



module.exports = router;