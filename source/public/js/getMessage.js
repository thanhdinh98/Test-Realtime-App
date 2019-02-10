
(function getMessages(){

    const ajax = new XMLHttpRequest();

    ajax.open(`POST`, `/home/`, false);
    ajax.send();

    const data = JSON.parse(ajax.responseText);

    for(let i = 0; i < data.messages.length; ++i){
        chatbox.innerHTML += `<div id="user-message" class="card">
                                <div id="user-name" class="card-header text-center">${data.messages[i].from_user_name}</div>
                                <div id="text" class="card-text">${data.messages[i].text}</div>
                            </div>`
        chatbox.scrollTop = chatbox.scrollHeight;
    }

})();
