const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;


const TestResultsSchema = new Schema({
    results: Object,
    user: { type: SchemaTypes.ObjectId, ref: 'User' }
});

TestResultsSchema.options.toJSON = {
    transform: (doc, {_id, __v, ...rest}, options) => {
        return rest;
    }
};


module.exports = mongoose.model('TestResults', TestResultsSchema);
