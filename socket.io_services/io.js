const dbMessage = require(`./db_communication/dbMessage`)();

module.exports = (io)=>{

    io.on(`connection`, (socket)=>{
        console.log(`There is user on site`);

        socket.on(`message`, (data)=>{
            io.emit(`message`, {message: data.message, user: data.user});
        });

        socket.on(`saveMessage`, (data)=>{
            dbMessage.save_message(data);
        });
    
        socket.on(`canvas`, (data)=>{
            socket.broadcast.emit(`canvas`, {x1: data.x1, y1: data.y1, x2: data.x2, y2: data.y2});
        });

        socket.on(`clear`, (data)=>{
            io.emit(`clear`, {is_clear: data.is_clear});
        });
    
        socket.on(`typing`, (user)=>{
            socket.broadcast.emit(`typing`, user);
        });

        socket.on(`disconnect`, ()=>{
            console.log(`A user has out the site`);
        });
    });
}