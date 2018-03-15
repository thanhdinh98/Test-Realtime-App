const socket = new io();

(function interact(){

    const user = success.innerHTML;

    sendMessage.onclick = ()=>{
        if(message.value == ``){
        }else{
            const data = {
                message: message.value,
                user: user
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
                    user: user
                };
                socket.emit(`message`, data);
                message.value = ``;
                event.preventDefault();
            }else{
            }
        }
    }

    message.onkeydown = ()=>{
        socket.emit(`typing`, user);
    }
})();

(function implement(){

    const user_id = success.getAttribute(`data-id`);

    socket.on(`message`, (data)=>{
        const message = document.createElement(`div`);
        const userName = document.createElement(`div`);
        const text = document.createElement(`div`);
        message.id = `user-message`;
        message.className = `card`;
        userName.id = `user-name`;
        userName.classList.add(`card-header`, `text-center`);
        userName.innerHTML = data.user;
        text.id = `text`;
        text.className = `card-text`;
        text.innerHTML = data.message;
        message.appendChild(userName);
        message.appendChild(text);
        chatbox.appendChild(message);
        chatbox.scrollTop = chatbox.scrollHeight;

        socket.emit(`saveMessage`, {message: data.message, id: user_id});
    });

    socket.on(`typing`, (user)=>{
        typing.innerHTML = `${user} is typing...`;

        setTimeout(()=>{
            typing.innerHTML = ``;
        }, 3000);
    })
})();