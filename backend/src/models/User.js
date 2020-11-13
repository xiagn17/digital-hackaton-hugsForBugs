const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;

// todo перенести в config
const ROLE_USER = 'USER';

const UserSchema = new Schema({
    fullName: SchemaTypes.String,
    groupId: SchemaTypes.String,
    role: { type: String, default: ROLE_USER }
});

UserSchema.options.toJSON = {
    transform: (doc, {_id, __v, ...rest}, options) => {
        return {...rest};
    }
};


module.exports = mongoose.model('User', UserSchema);
