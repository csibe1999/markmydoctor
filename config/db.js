const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://my:destreater@cluster0-i0u7z.mongodb.net/test',{ useNewUrlParser: true });
module.exports = mongoose;