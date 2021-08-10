'use strict';

let imgArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
    'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
    'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'
];

let allArr = [];
let count = 0;
let roundsNo = 25;
let leftRandom;
let centerRandom;
let rightRandom;




const imgSection = document.getElementById('imgSection');
let leftImg = document.getElementById('leftImg');
let centerImg = document.getElementById('centerImg');
let rightImg = document.getElementById('rightImg');

function Display(name, imgSrc) {
    this.name = name;
    this.img = imgSrc;
    this.shown = 0;
    this.clicks = 0;

    Display.allArr.push(this);
}

Display.allArr = [];
getData();


// for (let i = 0; i < imgArr.length; i++) {
//     new Display(imgArr[i].split('.')[0], imgArr[i]);
// }

console.log(Display.allArr);


let prevRandomArr = [];
function render() {
    

    do {
        leftRandom = getRandomNumber(0, imgArr.length - 1);
        centerRandom = getRandomNumber(0, imgArr.length - 1);
        rightRandom = getRandomNumber(0, imgArr.length - 1);
    }
    while (leftRandom === centerRandom ||
    rightRandom === centerRandom ||
    rightRandom === leftRandom ||
    prevRandomArr.includes(leftRandom) ||
    prevRandomArr.includes(centerRandom) ||
        prevRandomArr.includes(rightRandom)
    );

    prevRandomArr = [leftRandom, centerRandom, rightRandom];

    leftImg.src = './img/' + Display.allArr[leftRandom].img;
    centerImg.src = './img/' + Display.allArr[centerRandom].img;
    rightImg.src = './img/' + Display.allArr[rightRandom].img;

    Display.allArr[leftRandom].shown++;
    Display.allArr[centerRandom].shown++;
    Display.allArr[rightRandom].shown++;

    localStorage.data = JSON.stringify(Display.allArr);
    console.log(Display.allArr);

}
render();
console.log(Display.allArr);




imgSection.addEventListener('click', clickResponse);
function clickResponse(event) {
    if ((event.target.id === 'leftImg' || event.target.id === 'centerImg' || event.target.id === 'rightImg') && count < roundsNo) {

        if (event.target.id = 'leftImg') {
            Display.allArr[leftRandom].clicks++;
        }
        else if (event.target.id = 'centerImg') {
            Display.allArr[centerRandom].clicks++;
        }
        else if (event.target.id = 'rightImg') {
            Display.allArr[rightRandom].clicks++;
        }
        else {
            imgSection.removeEventListener('click', clickResponse);
        }

        render();
        count++;
    }
    else if (count >= roundsNo) {
        results.addEventListener('click', resultResponse);
        function resultResponse(e) {

            
            chartValues();
            renderRes();
        }
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}

function renderRes() {

    let ol1 = document.createElement('ol');
    finalresults.appendChild(ol1);

    for (let i = 0; i < imgArr.length; i++) {

        let li = document.createElement('li');
        li.textContent = `${Display.allArr[i].name} had ${Display.allArr[i].clicks} Votes, and was seen ${Display.allArr[i].shown} times.`;
        ol1.appendChild(li);
    }
}


function chartValues() {
    
let imgNameArr = [];
let clickArr = [];
let shownArr = [];

    for (let i = 0; i < Display.allArr.length; i++) {

        imgNameArr.push(Display.allArr[i].name);
        clickArr.push(Display.allArr[i].clicks);
        shownArr.push(Display.allArr[i].shown);

    }
    console.log(imgNameArr);
    console.log(clickArr);
    console.log(shownArr);


    let ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imgNameArr,
            datasets: [{
                label: 'No. Clicks',
                data: clickArr,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: ['rgba(54, 162, 235, 1)'],
                borderWidth: 2
            },
            {
                label: 'No. Shown times',
                data: shownArr,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: ['rgba(255, 206, 86, 1)'],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    stacked: false,
                    ticks: {
                        min: 0,
                        stepSize: 1,
                    }
                }]
            }
        }
    });
}

function getData(){

if (localStorage.data){
    let data =JSON.parse(localStorage.data);
    for(let i =0 ; i< data.length; i++){
        new Display( data[i].name,data[i].img,data[i].shown,data[i].clicks );    
    }
}
    else{
        for (let i=0 ;i<imgArr.length; i++){
            new Display(imgArr[i].split('.')[0],imgArr[i]);
        } 
    }
}
