const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;

const UserSchema = new Schema({
    fullName: SchemaTypes.String,
    groupNumber: SchemaTypes.String,
    role: SchemaTypes.String
});

UserSchema.options.toJSON = {
    transform: (doc, {_id, __v, ...rest}, options) => {
        return {...rest};
    }
};


module.exports = mongoose.model('User', UserSchema);
