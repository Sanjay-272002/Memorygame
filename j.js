const moves= document.getElementById("moves-count");
const timeValue=document.getElementById("time");
const startButton=document.getElementById("start");
const stopButton=document.getElementById("stop");
const gameContainer =document.querySelector(".game-container");
const result=document.getElementById("result");
const controls=document.querySelector("controls-container");
const wrap=document.querySelector(".wrapper")
const movee=document.getElementById("move");
const logg=document.querySelector(".logoo")
const res=document.querySelector(".result")
let cards;
let interval;
let firstCard=false;
let lastCard=false;

// items arrayyy
const getData = ()=> [
{name:"Dhoni",imgSrc:"images/dhoni.jpg"},
{name:"Kholi",imgSrc:"images/kholi.jpg"},
{name:"Jadeja",imgSrc:"images/jadeja.jpg"},
{name:"Ashwin",imgSrc:"images/ashwinn.jpg"},
{name:"Hardhik",imgSrc:"images/hardhik.jpg"},
{name:"Rahul",imgSrc:"images/klrahul.jpg"},
{name:"ROhit",imgSrc:"images/rohit.jpg"},
{name:"Bhuvi",imgSrc:"images/bhuvii.jpg"},
{name:"Dhoni",imgSrc:"images/dhoni.jpg"},
{name:"Kholi",imgSrc:"images/kholi.jpg"},
{name:"Jadeja",imgSrc:"images/jadeja.jpg"},
{name:"Ashwin",imgSrc:"images/ashwinn.jpg"},
{name:"Hardhik",imgSrc:"images/hardhik.jpg"},
{name:"Rahul",imgSrc:"images/klrahul.jpg"},
{name:"ROhit",imgSrc:"images/rohit.jpg"},
{name:"Bhuvi",imgSrc:"images/bhuvii.jpg"}
];

//getting data and randamizing
const randomize = ()=>{
    const cardData =getData();
    cardData.sort(()=>Math.random()-0.5);
    return cardData;
  };
const backk={imgSrc:"images/logoo.jpeg"};
//card generator function
const cardGenerator =()=>{
    const cardData=randomize();
    //geneate the HTML
  
    cardData.forEach((item)=>{
        
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("img");
        card.classList='card';
        face.classList='face';
        back.classList='back';
        //attaching the image
        face.src=item.imgSrc;
        back.src=backk.imgSrc;
        card.setAttribute("name",item.name);
        //attch the cards
        gameContainer.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click",(e)=>{
            card.classList.toggle('toggle');
            checkCards(e);
        });
    });
    // timeGenerator();
};

//checkingcards
const checkCards=(e)=>{
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    //game logic
    if(flippedCards.length===2){
        if(flippedCards[0].getAttribute("name")===flippedCards[1].getAttribute("name")){
            flippedCards.forEach((card) =>{
                card.classList.remove("flipped");
                card.style.pointerEvents="none";
            })
            movesgenerate();
            
        }
        else{
            flippedCards.forEach((card) =>{
                card.classList.remove("flipped");
                setTimeout(()=>card.classList.remove("toggle"),1000);
            })
            
        }

    };

};

const restart = ()=>{
    let cardData=randomize();
    let faces=document.querySelectorAll(".face");
    let cards=document.querySelectorAll(".card");
    gameContainer.style.pointerEvents="none"

    cardData.forEach((item,index)=>{
      cards[index].classList.remove("toggle");
      setTimeout(()=>{
        cards[index].style.pointerEvents="all";
        faces[index].src=item.imgSrc;
        cards[index].setAttribute("name",item.name);
        gameContainer.style.pointerEvents="all";     },1000);
      
    });
    movesCount=0;
    seconds=30;
};
cardGenerator();

stopButton.addEventListener("click",restart);





//initial time
let seconds = 0,
    minutes=0;

let movesCount=0,
    winCount=0;
//For time calculation
const timeGenerator = ()=>{
    seconds-=1;
    let cardData=randomize();
    

     if((seconds>0)&&(movesCount==(cardData.length/2)))
     {
        wrap.classList.remove("active");
        logg.classList.remove("active");
        res.classList.add("active");
        clearInterval(interval);
        timeValue.innerHTML=30;
        result.innerHTML="You won";
        startButton.innerHTML="Play Again"
     }   
    else if((seconds==0)&&(movesCount!=(cardData.length/2)))
      {  wrap.classList.remove("active");
         logg.classList.remove("active");
         res.classList.add("active");
        clearInterval(interval);
        timeValue.innerHTML=30;
        result.innerHTML="You lost";
        movee.innerHTML="Moves:"+movesCount;
        startButton.innerHTML="Play Again";
    }
let secondsValue = seconds<10? "0"+seconds:seconds;
// let minutesValue=minutes<10?"0"+minutes:minutes;
timeValue.innerHTML="TIME:"+secondsValue;
}

const movesgenerate = ()=>{
    movesCount+=1;
    moves.innerHTML="Moves:"+movesCount;

}

startButton.addEventListener("click",()=>{
  seconds = 5;
  wrap.classList.add("active");
  logg.classList.add("active");
  res.classList.remove("active");
  moves.innerHTML="Moves:"+movesCount;
  timeValue.innerHTML="TIME:"+seconds;
  interval = setInterval(timeGenerator, 1000);
  
});
