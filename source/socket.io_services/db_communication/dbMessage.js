const Message = require(`../../models/message`);

const dbMessage = ()=>{

    function saveMessage(data){
        Message.findOne({user: data.user_id}, (err, foundMessage)=>{
            if(err){
                console.log(err);
            }if(foundMessage === null){

                const message = new Message();
                message.user = data.user_id;
                const userMessage = {
                    from_user_id: data.from_user_id,
                    from_user_name: data.from_user_name,
                    text: data.message
                };

                message.messages.push(userMessage);

                message.save((err, message)=>{
                    if(err){
                        console.log(err);
                    }
                });      

            }else{
                const userMessage = {
                    from_user_id: data.from_user_id,
                    from_user_name: data.from_user_name,
                    text: data.message
                };

                foundMessage.messages.push(userMessage);
                
                foundMessage.save((err, addMessage)=>{
                    if(err){
                        console.log(err);
                    }
                });
            }
        });
    }   

    return {
        save_message: saveMessage
    }
}

module.exports = dbMessage;