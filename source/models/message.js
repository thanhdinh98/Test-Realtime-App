const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, 
        ref: `User`
    },
    messages: [{
        from_user_id:{
            type: Schema.Types.ObjectId,
            ref: `User`
        },
        from_user_name: String,
        text: String
    }]
});

module.exports = mongoose.model(`Message`, messageSchema);