const db = require('./database')
const config = require('./config')
const router = require('./routes')
const express = require('express');

db.initConnection(config.dbUrl)
.then(() => router.init(express(), config.port))
.catch(err => {
    console.error(err)
    process.exit(1)
})


