// dashti patrastum
let configs  = {
    spped:300
};

let candys = ['mouse1','mouse2','mouse3'];

function randomCandy(){
    let index = Math.floor(Math.random()* candys.length);
    return candys[index];
}


let field = document.createElement('div');

field.classList.add('field');
document.body.appendChild(field);

for(let i = 1;i<=100;i++){
    let excel = document.createElement('div');
    excel.classList.add('excel');
    field.appendChild(excel)
}


let excel = document.getElementsByClassName('excel');
let x = 1,y = 10;

for(let i = 0;i<excel.length;i++){
    if(x>10){
        x = 1;
        y--;
    }
    excel[i].setAttribute('posx',x);
    excel[i].setAttribute('posy',y);
    x++;
}
// dashti patrastum end

// gener atesnake

function generateSnake(){
    let posX = Math.floor(Math.random() * ( 10 - 3) + 3 );
    let posY = Math.floor(Math.random() * ( 10 - 1) + 1 );
    return [posX,posY]
}

let cordinates = generateSnake();
let snakeBody = [
                    document.querySelector(`[posx="${cordinates[0]}"][posy="${cordinates[1]}"]`),
                    document.querySelector(`[posx="${cordinates[0] - 1}"][posy="${cordinates[1]}"]`),
                    document.querySelector(`[posx="${cordinates[0] - 2}"][posy="${cordinates[1]}"]`)
                ];

for(let i = 0;i<snakeBody.length;i++){
    if(i == 0){
        snakeBody[i].classList.add('head');
        snakeBody[i].classList.add('snakeBody');
    }else{
        snakeBody[i].classList.add('snakeBody');
    }
}

// generate snake

// create Mouse
let mouse;
let candy = randomCandy();
function createMouse(){
    function generateMouse(){
        let posX = Math.floor(Math.random() * ( 10 - 3) + 3 );
        let posY = Math.floor(Math.random() * ( 10 - 1) + 1 );
        return [posX,posY]
    }
    
    let mouseCordinates = generateMouse();
    mouse = document.querySelector(`[posx="${mouseCordinates[0]}"][posy="${mouseCordinates[1]}"]`);

    while(mouse.classList.contains('snakeBody')){
        mouseCordinates = generateMouse();
        mouse = document.querySelector(`[posx="${mouseCordinates[0]}"][posy="${mouseCordinates[1]}"]`);
    }
    
    mouse.classList.add(candy);

}

createMouse()

// create Mouse
let direction = 'right';
let steps = false;

// achok
let input = document.createElement('input');
input.classList.add('score');
document.body.appendChild(input)

let score = 0;

input.value = "Score: "+ score;
// achok


function move(){
    // glxi koprdinatner
    let snakeCordinates = [snakeBody[0].getAttribute('posx'),snakeBody[0].getAttribute('posy')];
    // glxi koprdinatner

    snakeBody[0].classList.remove('head');
    // pochi kordinatner pochi jnjvel@
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();
    // pochi kordinatner

    if(direction == 'right'){
        if(snakeCordinates[0] < 10){
            snakeBody.unshift(document.querySelector(`[posx="${+snakeCordinates[0] + 1}"][posy="${snakeCordinates[1]}"]`));
        }else{
            snakeBody.unshift(document.querySelector(`[posx="1"][posy="${snakeCordinates[1]}"]`));
        }
    }else if(direction == 'left'){
        if(snakeCordinates[0] > 1){
            snakeBody.unshift(document.querySelector(`[posx="${+snakeCordinates[0] - 1}"][posy="${snakeCordinates[1]}"]`));
        }else{
            snakeBody.unshift(document.querySelector(`[posx="10"][posy="${snakeCordinates[1]}"]`));
        }
    }else if(direction == 'up'){
        if(snakeCordinates[1] < 10){
            snakeBody.unshift(document.querySelector(`[posx="${snakeCordinates[0]}"][posy="${+snakeCordinates[1] + 1}"]`));
        }else{
            snakeBody.unshift(document.querySelector(`[posx="${snakeCordinates[0]}"][posy="1"]`));
        }
    }else if(direction == 'down'){
        if(snakeCordinates[1] > 1){
            snakeBody.unshift(document.querySelector(`[posx="${snakeCordinates[0]}"][posy="${+snakeCordinates[1] - 1}"]`));
        }else{
            snakeBody.unshift(document.querySelector(`[posx="${snakeCordinates[0]}"][posy="10"]`));
        }
    }


    // muk utel@
    if(snakeBody[0].getAttribute('posx') == mouse.getAttribute('posx') && snakeBody[0].getAttribute('posy') == mouse.getAttribute('posy')){
        mouse.classList.remove(candy);
        input.value = "Score: "+ ++score;
        let a = snakeBody[snakeBody.length - 1].getAttribute('posx');
        let b = snakeBody[snakeBody.length - 1].getAttribute('posy');
        snakeBody.push(document.querySelector(`[posx="${a}"][posy="${b}"]`))
        createMouse();
    }
    // muk utel@

    // ira pocjin kpnel@
    if(snakeBody[0].classList.contains('snakeBody')){
        clearInterval(interval);
        snakeBody[0].style.background = 'linear-gradient(45deg, #70594a, #9a826e 100px)';
        setTimeout(alert,100,"End!!! | Score : " + score)
    }
    // ira pocjin kpnel@
    
    snakeBody[0].classList.add('head');
    for(let i = 0 ;i<snakeBody.length;i++){
        snakeBody[i].classList.add('snakeBody');
    }
    steps = true;
}

let interval = setInterval(move,configs.spped);

window.addEventListener('keydown',function(e){
    if(steps == true){
        if(e.keyCode == 37 && direction != 'right'){
            direction = 'left';
            steps = false; 
            console.log(direction);
        }else if(e.keyCode == 38 && direction != 'down'){
            direction = 'up';
            steps = false; 
            console.log(direction);
        }else if(e.keyCode == 39 && direction != 'left'){
            direction = 'right';
            steps = false; 
            console.log(direction);
        }else if(e.keyCode == 40 &&  direction != 'up'){
            direction = 'down';
            steps = false; 
            console.log(direction);
        }
    }
})