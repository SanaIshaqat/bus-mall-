'use strict';

let imgArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
    'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
    'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'
];

let allArr = [];
let count = 0;
let roundsNo = 25;

const imgSection= document.getElementById('imgSection');
let leftImg =document.getElementById('leftImg');
let centerImg =document.getElementById('centerImg');
let rightImg =document.getElementById('rightImg');



function Display ( name , imgSrc){
    this.name= name;
    this.img= imgSrc;
    this.shown= 0;
    this.clicks=0;

        Display.allArr.push (this );
}

Display.allArr=[];

for( let i=0 ; i<imgArr.length; i++){
    new Display( imgArr[i].split('.')[0], imgArr[i]);
}

console.log(Display.allArr);

function render(){
    let leftRandom= getRandomNumber(0,imgArr.length -1);
    let centerRandom= getRandomNumber(0,imgArr.length -1);
    let rightRandom= getRandomNumber(0,imgArr.length -1);

    leftImg.src='./img/'+ Display.allArr[leftRandom].img;
    centerImg.src='./img/'+ Display.allArr[centerRandom].img;
    rightImg.src='./img/'+ Display.allArr[rightRandom].img;

    Display.allArr[leftRandom].shown ++;
    Display.allArr[centerRandom].shown ++;
    Display.allArr[rightRandom].shown ++;

    Display.allArr[leftRandom].clicks ++;
    Display.allArr[centerRandom].clicks++;
    Display.allArr[rightRandom].clicks ++;

    console.log(Display.allArr);

}

imgSection.addEventListener('click', clickResponse);
function clickResponse(event){
    if ((event.target.id==='leftImg' || event.target.id ==='centerImg' ||event.target.id ==='rightImg')&& count< roundsNo){
    render();
    count++;  
    }
}
function getRandomNumber(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);

}