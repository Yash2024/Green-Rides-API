const mongoose = require('mongoose');

const userSchema = {
    _id : mongoose.Schema.Types.ObjectId,
    email : {
        type: String, 
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    name: {type: String},
    rollno: {type : String},
    branch: {type: String},
    cycleid: {type: String},
    role: {type: String}
}

module.exports = mongoose.model('User', userSchema);