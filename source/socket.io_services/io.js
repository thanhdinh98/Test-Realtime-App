const dbMessage = require(`./db_communication/dbMessage`)();
const translate = require(`google-translate-api`);

module.exports = (io)=>{

    const users = [];

    io.on(`connection`, (socket)=>{

        //chat___________________________________________________________

        socket.on(`newUser`, (data)=>{
            users.push(data);
            socket.username = data;
            updateUser();
        });

        socket.on(`message`, (data)=>{
            io.emit(`message`, {
                message: data.message, 
                user_name: data.user_name, 
                from_user_id: data.user_id
            });
        });

        socket.on(`saveMessage`, (data)=>{
            dbMessage.save_message(data);
        });

        
        function updateUser(){ 
            io.emit(`newUser`, users);
        }

        socket.on(`typing`, (data)=>{
            socket.broadcast.emit(`typing`, data);
        });

        //Translate___________________________________________________________

        socket.on(`translate`, (data)=>{
            translate(data, {from: `en`, to: `vi`})
            .then(res =>{
                io.emit(`translate`, {text: data, trans_text: res.text});
            }).catch(err =>{
                console.log(err);
            });
        });
    
        //Canvas____________________________________________________________


        socket.on(`canvas`, (data)=>{
            socket.broadcast.emit(`canvas`, data);
        });

        socket.on(`clear`, (data)=>{
            io.emit(`clear`, data);
        });

        //disconnect__________________________________________________________

        socket.on(`disconnect`, ()=>{
            users.splice(users.indexOf(socket.username), 1);
            updateUser();
        });

    });
}