class Game { //game class hold all other class
    constructor(){
        this.player;
        //set an array to keep the new obstacles; 
        //will hold instances of the class Obstacle;
        //detect outside the board - remove from the dom and this array, 
        //shift() - remove the first element: 
        this.obstacles = [];
    }
    start(){ //too long, need to break down

        this.player = new Player();
        //How to create more obstacles? --> interval 1000ms
//Where to store them?
        setInterval(() => {
            const newObstacle = new Obstacle();
            this.obstacles.push(newObstacle);
        }, 2500)

        //Update obstacles
        //bonus: start after 3s
        setTimeout(()=>{
            setInterval(() => {
                this.obstacles.forEach((obstacleInstance) => {
                    //move current obstacle
                    obstacleInstance.moveDown();
                    //detect if there's a collision between player and current obstacle
                    //obstacles.forEach
                    this.detectCollision(obstacleInstance);
                    
                    //check if we nned to remove current obstacle
                    this.removeObstacleIfOutside(obstacleInstance);                   
                });
                //don't detect outside the loop as just one time collision is ok
                
                
            }, 40);
        },2000)
    }

    attachEventListeners() {
        //Attach event listeners
        document.addEventListener('keydown', (e) => {
            //const key = e.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
            //console.log(e.key); //log what keyboard enter
            if (e.key === "ArrowRight") {
                this.player.moveRight();
            } else if (e.key === "ArrowLeft") {
                this.player.moveLeft();
            }
        });
    }

    detectCollision(obstacleInstance) { //dont
        if (
            this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.height + this.player.positionY > obstacleInstance.positionY
        ){
            console.log('collision detected!') //we don't expect player open console
            //alert('gameover'); //need to refresh
            setTimeout(()=>{
                location.href = "gameover.html"//redirect to another page
            },300)
            
        }
    }

    removeObstacleIfOutside(obstacleInstance){
        if(obstacleInstance.positionY <= 0 - obstacleInstance.height){
            //console.log("reove obstables with position", obstacleInstance.positionY);
            //obstacleInstance.domElement.style.backgroundColor = "orange";
            
            //obstacleInstance.shift();
            //console.log(this.obstacles.length);
            obstacleInstance.domElement.remove();
            this.obstacles.shift();//remove from the array;
        };
    }
}

class Player {
    constructor(){
        
        //use width and height as number, for calculation
        this.width = 10 ; //size should set here but not css, otherwise js need to get info from css
        this.height = 5;
        this.positionX = 50 - (this.width * 0.5); //centerposition
        this.positionY = 0;
        this.domElement = null; //put it above the method or constructor will excute firstly and no domElement.
        this.createDomElement();
        //all method can access the domelement
    }

    //set player here but not html
    createDomElement() { 
        // step1: create the element:
        //However, can't put it inside the method as other method can't access it.
        //first set it in constructor
        this.domElement = document.createElement('div');

        // step2: add content or modify (ex. innerHTML...)
            //set size here
        this.domElement.id = "player"; 
        this.domElement.style.width = this.width + "vw"; //view width, need "string"!!
        this.domElement.style.height = this.height + "vh"; //view heigh
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }


    moveLeft(){
        if (this.positionX>0) {
            this.positionX -= 3; //update value, no need to return     
            //update css for the player dom element   
            this.domElement.style.left = this.positionX + "vw";    
        }
        //console.log(`new position...${this.positionX}`);
    }

    moveRight(){
        if (this.positionX<(100-this.width)) {
        this.positionX += 3;
        this.domElement.style.left = this.positionX + "vw";
        }
        //console.log(`new position...${this.positionX}`);
    }
}



//console.log(player.positionX); It's not work as it just excutes one time.

class Obstacle {
    constructor() {
        this.width = 20;
        this.height = 10;
        this.positionX = (this.randomPosition(this.width, 100) - (this.width * 0.5));
        this.positionY = 80;
        //put it above the method or constructor will excute firstly and no domElement.
        //hold reference of each element
        this.domElement = null; 
        this.createDomElement();
    }

    createDomElement() { 
        this.domElement = document.createElement('div');

        this.domElement.className = "obstacle"; //there're lots of obstacles, use class but not id
        this.domElement.style.width = this.width + "vw"; //view width, need "string"!!
        this.domElement.style.height = this.height + "vh"; //view heigh
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = (this.randomPosition(this.width, 100) - (this.width * 0.5)) + "vw";
        

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    //Generate random number between two numbers
    randomPosition (min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    moveDown() {
        //remove this after set detect 
        //if (this.positionY > (0-this.height)){
        this.positionY--; //update the info of positionY
        this.domElement.style.bottom = this.positionY + "vh"; //reflect the changes
    }
}

//const player = new Player();
//const obstacle1 = new Obstacle(); no need to keep this, just one obstacle


//const obstacles = [];

/* set game class can also set start , restart and game over */
const game = new Game();
game.start();
game.attachEventListeners();





