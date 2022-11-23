const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cycle = require('../models/cycle');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth=require('../middleware/checkauth');

router.get('/all', (req,res,next)=>{
    Cycle.find({status: "rented"})
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.post('/add', (req,res,next)=>{
    Cycle.find({cycleid:req.body.cycleid})
    .then(cycle => {
        if(cycle.length>=1)
        {
            res.status(500).json({
                message: "Cycle is already added"
            })
        }
        else
        {
            // console.log(req.body.cycleid);
            const cycle=new Cycle({
                _id: new mongoose.Types.ObjectId(),
                cycleid: req.body.cycleid,
                status: req.body.status,
                stdid: req.body.stdid
            })
            cycle.save()
            .then(result => {
                console.log(result)
                res.status(200).json({
                    message: "Cycle added successfully"
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: "Something went wrong please try again"
                })
            })
        }
    })
})

router.get('/:cycleid' ,(req,res,next) => {
    const id= req.params.cycleid

    Cycle.find({cycleid: id})
    .then(doc =>{
        const t= {
            _id: doc[0]._id,
            cycleid: doc[0].cycleid,
            status: doc[0].status,
            stdid: doc[0].stdid
        }
        console.log(doc);
        res.status(200).json(t);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.patch('/:cycleid',checkAuth, (req,res,next)=>{
    const id = req.params.cycleid;

    Cycle.updateOne(
        {cycleid: id},
        {
            $set:{
                status: req.body.status,
                stdid: req.body.stdid
            }
        })
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:cycleid', (req,res,next)=>{
    const id = req.params.cycleid;

    Cycle.find({cycleid: id})
    .then(doc => {
        Cycle.remove({_id: doc[0]._id})
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "cycle deleted successfully"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;