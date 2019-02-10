let isErase = false;
let isRed = false;

function setup(){
    const myCanvas = createCanvas(document.querySelector('#canvas').offsetWidth-12, window.innerHeight);
    myCanvas.parent("canvas");
    background('rgba(100, 105, 112, 0.5)');
}

function windowResized(){
    resizeCanvas(document.querySelector('#canvas').offsetWidth-12, window.innerHeight);
    background('rgba(100, 105, 112, 0.5)');
}

function mouseDragged(){

    if(isErase){
        fill('rgba(100, 105, 112, 0.5)');
        strokeWeight(0);
        stroke(0);
        ellipse(mouseX, mouseY, 50);
        socket.emit(`canvas`, {x: mouseX, y: mouseY, is_erase: true});
    }else if(isRed){
        strokeWeight(5)
        stroke(`red`);
        line(mouseX, mouseY, pmouseX, pmouseY);
        socket.emit(`canvas`, {x1: mouseX, y1: mouseY, x2: pmouseX, y2: pmouseY, is_red: true});  
    }else{
        strokeWeight(5)
        stroke(0);
        line(mouseX, mouseY, pmouseX, pmouseY);
        socket.emit(`canvas`, {x1: mouseX, y1: mouseY, x2: pmouseX, y2: pmouseY}); 
    }
}

(function implement(){
    socket.on(`canvas`, (data)=>{

        if(data.is_erase){
            fill('rgba(100, 105, 112, 0.5)');
            strokeWeight(0);
            stroke(0);
            ellipse(data.x, data.y, 50);
        }else if(data.is_red){
            strokeWeight(5)
            stroke(`red`);
            line(data.x1, data.y1, data.x2, data.y2);
        }else{
            strokeWeight(5)
            stroke(0);
            line(data.x1, data.y1, data.x2, data.y2);
        }
    });

    socket.on(`clear`, (data)=>{
        if(data.is_clear){
            clear();
            background('rgba(100, 105, 112, 0.5)');
        }
    });

})();

(function interact(){
    clearScreen.onclick = () => {
        socket.emit(`clear`, {is_clear: true});
    }

    redColor.onclick = ()=>{
        redColor.setAttribute(`style`, `display: none;`);
        blackColor.removeAttribute(`style`);

        isRed = true;
    }

    blackColor.onclick = ()=>{
        blackColor.setAttribute(`style`, `display: none;`);
        redColor.removeAttribute(`style`);

        isRed = false;
    }

    erase.onclick = ()=>{
        erase.setAttribute(`style`, `display: none;`);
        unErase.removeAttribute(`style`);
        
        isErase= true;
    }

    unErase.onclick = ()=>{
        unErase.setAttribute(`style`, `display: none;`);
        erase.removeAttribute(`style`);

        isErase = false
    }
    
})();