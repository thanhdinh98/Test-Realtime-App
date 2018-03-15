function setup(){
    const myCanvas = createCanvas(document.querySelector('#canvas').offsetWidth-12, window.innerHeight);
    myCanvas.parent("canvas");
    background('rgba(100, 105, 112, 0.5)');
    strokeWeight(5)
    stroke(0);
}

function windowResized(){
    resizeCanvas(document.querySelector('#canvas').offsetWidth-12, window.innerHeight);
    background('rgba(100, 105, 112, 0.5)');
    strokeWeight(5)
    stroke(0);
}

function mouseDragged(){
    line(mouseX, mouseY, pmouseX, pmouseY);
    socket.emit(`canvas`, {x1: mouseX, y1: mouseY, x2: pmouseX, y2: pmouseY});
}

(function implement(){
    socket.on(`canvas`, (data)=>{
        line(data.x1, data.y1, data.x2, data.y2);
    })

    socket.on(`clear`, (data)=>{
        if(data.is_clear){
            clear();
            background('rgba(100, 105, 112, 0.5)');
            strokeWeight(5)
            stroke(0);
        }
    });
})();

(function interact(){
    clearScreen.onclick = () => {
        socket.emit(`clear`, {is_clear: true});
    }
})();