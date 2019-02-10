const socket = new io();
const userId = success.getAttribute(`data-id`);
const userName = success.innerHTML;

(function interact(){

    sendMessage.onclick = ()=>{
        if(message.value == ``){
        }else{
            const data = {
                message: message.value,
                user_name: userName,
                user_id: userId
            };
            socket.emit(`message`, data);
            message.value = ``;
        }
    }

    message.onkeypress = (event)=>{
        if(message.value == ``){
        }else{
            if(event.key === `Enter` && !event.shiftKey){
                const data = {
                    message: message.value,
                    user_name: userName,
                    user_id: userId
                };
                socket.emit(`message`, data);
                message.value = ``;
                event.preventDefault();
            }else{
            }
        }
    }

    message.onkeydown = ()=>{
        socket.emit(`typing`, userName);
    }

    transBtn.onclick = ()=>{
        socket.emit(`translate`, transInput.value);
    }
})();

(function implement(){

    socket.emit(`newUser`, userName);

    socket.on(`newUser`, (users)=>{
        online.innerHTML = ``;
        for(let i = 0; i < users.length; ++i){
            online.innerHTML += `<li class="list-group-item">${users[i]} is online</li>`;
        }
    });

    socket.on(`message`, (data)=>{
        chatbox.innerHTML += `<div id="user-message" class="card">
                                <div id="user-name" class="card-header text-center">${data.user_name}</div>
                                <div id="text" class="card-text">${data.message}</div>
                            </div>`
        chatbox.scrollTop = chatbox.scrollHeight;

        socket.emit(`saveMessage`, {
            message: data.message, 
            user_id: userId, 
            from_user_id: data.from_user_id, 
            from_user_name: data.user_name
        });
    });

    socket.on(`typing`, (user)=>{
        typing.innerHTML = `${user} is typing...`;

        setTimeout(()=>{
            typing.innerHTML = ``;
        }, 3000);
    });

    socket.on(`translate`, (data)=>{
        transInput.value = data.text;
        output.innerHTML = data.trans_text;
    });
})();