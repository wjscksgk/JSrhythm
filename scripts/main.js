let keys = ["a", "s", "d", " ", "j", "k", "l"];
const tileBtns = document.querySelectorAll(".tileBtn");
const tileLines = document.querySelectorAll(".tileLine");
const video = document.getElementById('youtube')
const verdict = document.querySelector('.verdict h3')
let isOnce = false
const keyMap = {
  "a": {
    "idx" : 0,
    "isOnce" : false
  },
  "s": {
    "idx" : 1,
    "isOnce" : false
  },
  "d": {
    "idx" : 2,
    "isOnce" : false
  },
  " ": {
    "idx" : 3,
    "isOnce" : false
  },
  "j": {
    "idx" : 4,
    "isOnce" : false
  },
  "k": {
    "idx" : 5,
    "isOnce" : false
  },
  "l": {
    "idx" : 6,
    "isOnce" : false
  },
};

drum = [
  new Audio('./sounds/킥.wav'),
  new Audio('./sounds/스네어.wav'),
  new Audio('./sounds/하이햇.wav'),
  new Audio('./sounds/크레쉬 심벌.wav'),
];

piano = [
  // new Audio('./sounds/도.mp3'),
  // new Audio('./sounds/레.mp3'),
  // new Audio('./sounds/미.mp3'),
  // new Audio('./sounds/파.mp3'),
  // new Audio('./sounds/솔.mp3'),
  // new Audio('./sounds/라.mp3'),
  // new Audio('./sounds/시.mp3'),
];
// piano.forEach((item,idx) =>{
//   piano[idx].volume = 1.0;
// })

drum.forEach((item,idx) =>{
  drum[idx].volume = 1.0;
})

video.volume = 0

let bitmap;
const fetchData = () => fetch("../scripts/song.json").then((response) => response.json());

async function start(){
  bitmap = await fetchData();
  
  bitmap.forEach((item, index) => {
    setTimeout(() => tileAnim(item.lineNum, item.time), (item.time - 1)*1000)
  });
}
video.addEventListener('loadeddata', start);


const keyDownAnim = (idx) => {
  tileBtns[idx].style.background ="rgb(255,255,255) radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(254,255,0,1) 50%, rgba(250,151,2,1) 100%)";
  tileBtns[idx].style.boxShadow = "0px 0px 100px yellow";
  tileBtns[idx].style.transition = "0.1s";

  tileLines[idx].style.background = "rgba(247, 133, 0, 0.3)";
  tileLines[idx].style.boxShadow = "0px 0px 100px rgba(0,0,0,0.5)";
  tileLines[idx].style.transition = "0s";
  soundManager(drum[idx]);
};

const KeyUpAnim = (idx) => {
  tileBtns[idx].style.background = "rgb(255,255,255)";
  tileBtns[idx].style.boxShadow = "none";
  tileBtns[idx].style.transition = "none";
  
  tileLines[idx].style.background = "none"
  tileLines[idx].style.boxShadow = "none";
  tileLines[idx].style.transition = "0.6s";
};

window.addEventListener("keydown", ({ key }) => {
  if(keys.includes(key)){
    const idx = keyMap[key].idx;
    !isNaN(idx) && keyDownAnim(idx);
    keyMap[key].isOnce = true;
  }
  
});
window.addEventListener("keyup", ({ key }) => {
  if(keys.includes(key)){
    const idx = keyMap[key].idx;
    KeyUpAnim(idx);
    keyMap[key].isOnce = false;
  }
});

const tileAnim = (idx,time,type) => {
  const tile = document.createElement('div')
  tile.className = 'tile'
  tileLines[idx].append(tile)
  let yPos = 100
  const startTime = performance.now()
  let rhythem = false

  const anim = (timestamp)=>{
    const progress = (timestamp - startTime) / 1000
    tile.style.bottom = `${yPos}%`
    yPos = 100 - Math.min(progress * 100)
    const firstTile = tileLines[idx].children[0];
    document.addEventListener('keydown', ({key}) => {
      let isChecked = false; 
      if(keys.includes(key)){
        isChecked = !rhythem && !keyMap[key].isOnce && idx === keyMap[key].idx;
      }
      if (isChecked) {
        if (3 <= yPos && yPos <= 20) {
          verdict.textContent = "Perfect";
          rhythem = true; 
        } else if(2 <= yPos && yPos <= 30){
          verdict.textContent = "Great";
          rhythem = true; 
        } else if(0 < yPos && yPos <= 40){
          verdict.textContent = "Good";
          rhythem = true; 
        } else if(0 <= yPos && yPos <= 50){
          verdict.textContent = "Miss";
          rhythem = true;
        }
        if (0 <= yPos && yPos <= 50) {
          firstTile.remove();
        }
      }
    })
    if(yPos > 0){
      requestAnimationFrame(anim)
    } 
    else {
      if(!rhythem){
        verdict.textContent = "Miss";
        console.log("내가 범인임 ㅇㅇ")
      }
      tile.remove();
      rhythem = true;
    } 
  }
  requestAnimationFrame(anim)
}

const soundManager = (inputSound) => {
  inputSound.play();
}
