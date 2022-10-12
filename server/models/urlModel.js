const mongoose = require('mongoose');
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
  url: {
    required: true,
    type: String,
    index: true,
    unique: true
    },
    shortUrl: {
      required: true,
        type: String,
        index: true,
        unique: true,
        default: shortid.generate
      }
});

module.exports = mongoose.model('ShortUrl', urlSchema)
