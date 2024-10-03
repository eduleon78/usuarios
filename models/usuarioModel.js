var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'EL nombre es Obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'EL email es Obligatorio'],
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'EL password es Obligatorio']
    }
});

usuarioSchema.pre('save', function(next) {
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});