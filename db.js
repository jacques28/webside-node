const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/websitedb',{ useNewUrlParser: true ,useUnifiedTopology: true});

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {type: String, required: true, unique: true},
	suggestions: String
})

module.exports = mongoose.model('User', userSchema)
