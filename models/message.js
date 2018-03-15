const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, 
        ref: `User`
    },
    messages: [{
        from_user:{
            type: Schema.Types.ObjectId,
            ref: `User`
        },
        text: String
    }]
});

module.exports = mongoose.model(`Message`, messageSchema);