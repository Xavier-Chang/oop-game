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
        /*
        function randomIntFromInterval(0, 100) { // min and max included 
             return Math.floor(Math.random() * (max - min + 1) + min)
        }  
        */
        this.positionX = 20 - (this.width * 0.5); //centerposition
        this.positionY = 80;

        this.domElement = null; //put it above the method or constructor will excute firstly and no domElement.
        this.createDomElement();
    }

    createDomElement() { 
        this.domElement = document.createElement('div');

        this.domElement.className = "obstacle"; //there're lots of obstacles, use class but not id
        this.domElement.style.width = this.width + "vw"; //view width, need "string"!!
        this.domElement.style.height = this.height + "vh"; //view heigh
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }

    moveDown() {
        if (this.positionY > (0-this.height)){
        this.positionY--; //update the info of positionY
        this.domElement.style.bottom = this.positionY + "vh";} //reflect the changes
        
    }
}

const player = new Player();
//const obstacle1 = new Obstacle(); no need to keep this, just one obstacle

const obstacles = [];//set an array to keep the new obstacles; will hold instances of the class Obstacle



//Attach event listeners
document.addEventListener('keydown', (e) => {
    //const key = e.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    //console.log(e.key); //log what keyboard enter
    if(e.key === "ArrowRight") {
        player.moveRight();
    } else if (e.key === "ArrowLeft") {
        player.moveLeft();
    }
   
});

//How to create more obstacles? --> interval 1000ms
//Where to store them?
setInterval(() => {
    const newObstacle = new Obstacle();
    obstacles.push(newObstacle);
}, 1000)

//Move obstacles
//bonus: start after 3s
setTimeout(()=>{
    setInterval(() => {

        obstacles.forEach((obstacleInstance) => {
            //move current obstacle
            obstacleInstance.moveDown();
            //detect if there's a collision between player and current obstacle
            //obstacles.forEach
            if (
                player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                player.positionX + player.width > obstacleInstance.positionX &&
                player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                player.height + player.positionY > obstacleInstance.positionY
              ){
                //console.log('collision detected!') //we don't expect player open console
                //alert('gameover'); //need to refresh
                setTimeout(()=>{
                    location.href = "gameover.html"//redirect to another page
                },400)
                
              }
        });
        //don't detect outside the loop as just one time collision is ok
        
        
    }, 50);
},3000)


