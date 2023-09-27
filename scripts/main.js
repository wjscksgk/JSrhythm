let keys = ["a", "s", "d", " ", "j", "k", "l"];
const tileBtns = document.querySelectorAll(".tileBtn");
const tileLines = document.querySelectorAll(".tileLine");
const video = document.getElementById('youtube')
const keyMap = {
  "a": 0,
  "s": 1,
  "d": 2,
  " ": 3,
  "j": 4,
  "k": 5,
  "l": 6,
};

piano = [
  new Audio('./sounds/도.mp3'),
  new Audio('./sounds/레.mp3'),
  new Audio('./sounds/미.mp3'),
  new Audio('./sounds/파.mp3'),
  new Audio('./sounds/솔.mp3'),
  new Audio('./sounds/라.mp3'),
  new Audio('./sounds/시.mp3'),
];
piano.forEach((item,idx) =>{
  piano[idx].volume = 1.0;
})
video.volume = 1

let soundArr = []

let bitmap;
const fetchData = () => fetch("../scripts/song.json").then((response) => response.json());

async function start(){
  bitmap = await fetchData();
  
  bitmap.forEach((item, index) => {
    setTimeout(() => tileAnim(item.lineNum, item.time), (item.time - 1)*1000)
  });
}
video.addEventListener('loadedmetadata', start);


const keyDownAnim = (idx) => {
  tileBtns[idx].style.background ="rgb(255,255,255) radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(254,255,0,1) 50%, rgba(250,151,2,1) 100%)";
  tileBtns[idx].style.boxShadow = "0px 0px 100px yellow";
  tileBtns[idx].style.transition = "0.1s";

  tileLines[idx].style.background = "rgba(247, 133, 0, 0.3)";
  tileLines[idx].style.boxShadow = "0px 0px 100px rgba(0,0,0,0.5)";
  tileLines[idx].style.transition = "0s";
  soundManager(piano[idx]);
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
  const idx = keyMap[key];
  !isNaN(idx) && keyDownAnim(idx);
  
});
window.addEventListener("keyup", ({ key }) => {
  const idx = keyMap[key];
  keys.includes(key) && KeyUpAnim(idx);
});

const tileAnim = (idx,time,type) => {
  const tile = document.createElement('div')
  tile.className = 'tile'
  tileLines[idx].append(tile)
  let yPos = 100
  const startTime = performance.now()

  const anim = (timestamp)=>{
    const progress = (timestamp - startTime) / 1000
    tile.style.bottom = `${yPos}%`
    yPos = 100 - Math.min(progress * 100)
    if(yPos > 0) requestAnimationFrame(anim)
  }
  requestAnimationFrame(anim)
}

const soundManager = (inputSound) => {
  soundArr.push(inputSound)
  for(let i = 0; i < soundArr.length; i++){
    soundArr[i].play()
  }
}