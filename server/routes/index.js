const express = require('express');
const cors = require('cors');
const db = require('./../database')

const shortid = require('shortid');
const ShortUrl = require('./../models/urlModel');
const validateUrl = require('./../utils/utils.js');

function init(app, port) {
    app.use(cors());
    app.use(express.json());

    app.get('/', async(req, res) => {
        const data = await ShortUrl.find();
        res.write(JSON.stringify(data));
        res.end();
    })

    app.get('/delete-history', async(req, res) => {
         await ShortUrl.deleteMany({});
        res.end();
    }) 

    app.get('/:shortUrl', async(req, res) => {
        const short = await ShortUrl.findOne({short: req.params.shortUrl});
        if(!short){
            res.sendStatus(404);
            return;
        }
        res.redirect(fullUrl);
    })
    

    app.post('/url-shortener',async (req, res) => { 
        if(!validateUrl.validateUrl(req.body.url)){
            res.status(400).send(`Ivalid Url Link!`);
            res.end();
            return;
        }         
        try{
            const urlObj = await ShortUrl.create({url: req.body.url});
            res.write(JSON.stringify(urlObj));
            res.status(201);
            res.end();
            return ;
        }
        catch(error){
            if(error.code === 11000){
                res.status(409).send(`Url Link already exists.`);
                res.end();
                return;
            }
            res.status(500);
            res.end();
            return;
        }     
    })

    app.listen(port, () => {           
        console.log(`Now listening on port ${port}`); 
    });

}

module.exports = { init }