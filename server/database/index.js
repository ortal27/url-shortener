const mongoose = require('mongoose');

async function initConnection(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

}

module.exports = { initConnection }