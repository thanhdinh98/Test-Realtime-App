const Message = require(`../../models/message`);

const dbMessage = ()=>{

    function saveMessage(data){
        Message.findOne({user: data.id}, (err, foundMessage)=>{
            if(err){
                console.log(err);
            }if(foundMessage === null){

                const message = new Message();
                message.user = data.id;
                message.messages.push({text: data.message});

                message.save((err, message)=>{
                    if(err){
                        console.log(err);
                    }
                });      

            }else{

                foundMessage.messages.push({text: data.message});
                
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