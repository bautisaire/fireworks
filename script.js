const gravity = .8;
const numParticulas = 1;
const minNumChilds = 80;
function start() {
    
    // let particulas = document.getElementsByClassName("particula");
    for (let p = 0; p < numParticulas; p++) {
        let particula = document.createElement("div");
        particula.className = "particula";
        let y = window.innerHeight;
        let x = Math.random() * window.innerWidth;
        particula.style.left = x + "px";
        particula.style.top = y + "px";
        particula.style.background = getRandomColor();
        let velocidadY = -20 - (Math.random() * 10)
        particula.setAttribute("data-velocity-y", velocidadY);
        particula.setAttribute("data-velocity-x", "0");
        particula.setAttribute("data-dad", "true");

        document.getElementsByTagName("body")[0].append(particula);
    }
}
function update() {
    let particulas = document.getElementsByClassName("particula");
    for (let p = 0; p < particulas.length; p++) {

        let particula = particulas[p];
        let velocidadY = parseFloat(particula.getAttribute("data-velocity-y"));
        velocidadY += gravity;
        particula.setAttribute("data-velocity-y", velocidadY);
        let top = particula.style.top ? particula.style.top : "0";
        top = parseFloat(top.replace("px", ""));
        top += velocidadY;
        particula.style.top = top + "px";

        let velocidadX = parseFloat(particula.getAttribute("data-velocity-x"));
        let left = particula.style.left ? particula.style.left : "0";
        left = parseFloat(left.replace("px", ""));
        left += velocidadX;
        particula.style.left = left + "px";

        let padre = particula.getAttribute("data-dad")
        console.log(padre)
        if (velocidadY >= 0 && padre === "true") {
            boom(particula)
        }

        if (top >= window.innerHeight) {
            particula.remove();
        }
    }
    setTimeout(update, 20)
}

function boom(particula) {
    let numChilds = Math.random() * minNumChilds + 10;
    for (c = 0; c < numChilds; c++) {
        let child = document.createElement("div");
        child.className = "particula";
        child.setAttribute("data-dad", false)
        child.style.top = particula.style.top;
        child.style.left = particula.style.left;
        child.style.background = particula.style.background;
        let velocidadY = (Math.random() * 10) - 8; // -8 y 2
        let velocidadX = (Math.random() * 13) - 8; 

        child.setAttribute("data-velocity-y",velocidadY)
        child.setAttribute("data-velocity-x",velocidadX)
        document.getElementsByTagName("body")[0].append(child);

    }
    particula.remove();
}


//tools
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

window.onload = function () {
    document.addEventListener("click",()=>start())
    update();
}
