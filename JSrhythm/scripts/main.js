import config from './apikey'

let keys = ['a','s','d',' ','j','k','l'];
const tileBtns = document.querySelectorAll('.tileBtn')
const tileLines = document.querySelectorAll('.tileLine')
window.addEventListener('keydown', (e)=>{
    keys.forEach((item, index) => {
       if(item === e.key){
        tileBtns[index].style.background = 'rgb(255,255,255) radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(254,255,0,1) 50%, rgba(250,151,2,1) 100%)'
        tileBtns[index].style.boxShadow = '0px 0px 100px yellow'
        tileBtns[index].style.transition = '0.1s'
       } 
    });
})
window.addEventListener('keyup', (e)=>{
    keys.forEach((item, index) => {
       if(item === e.key){
        tileBtns[index].style.background = 'rgb(255,255,255)'
        tileBtns[index].style.boxShadow = 'none'
        tileBtns[index].style.transition = 'none'
       } 
    });
})

const youtube = document.getElementById('youtube');
window.addEventListener('load', ()=>{
    console.log('hello')
    youtube.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
})
onYouTubeIframeAPIReady();