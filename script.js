const audio=document.getElementById("audio");
const panel=document.getElementById("audioPanel");
const button=document.getElementById("audioButton");
const close=document.getElementById("closeAudio");
const play=document.getElementById("play");
const seek=document.getElementById("seek");
const mute=document.getElementById("mute");
const status=document.getElementById("status");

button.onclick=()=>{panel.classList.add("open");panel.setAttribute("aria-hidden","false")};
close.onclick=()=>{panel.classList.remove("open");panel.setAttribute("aria-hidden","true")};

play.onclick=async()=>{
  if(audio.paused){
    try{await audio.play();status.textContent="PLAYING • KHAABON KE PARINDAY";}
    catch(e){status.textContent="PRESS PLAY AGAIN";}
  }else{audio.pause();}
};
audio.addEventListener("play",()=>{play.textContent="Ⅱ";status.textContent="PLAYING • KHAABON KE PARINDAY"});
audio.addEventListener("pause",()=>{play.textContent="▶";status.textContent="PAUSED"});
audio.addEventListener("ended",()=>{play.textContent="▶";status.textContent="SONG FINISHED"});
audio.addEventListener("loadedmetadata",()=>duration.textContent=format(audio.duration));
audio.addEventListener("timeupdate",()=>{
  if(audio.duration){seek.value=audio.currentTime/audio.duration*100;current.textContent=format(audio.currentTime)}
});
seek.oninput=()=>{if(audio.duration)audio.currentTime=seek.value/100*audio.duration};
mute.onclick=()=>{audio.muted=!audio.muted;mute.textContent=audio.muted?"🔇":"🔊"};
function format(s){if(!Number.isFinite(s))return"0:00";return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`}

document.addEventListener("keydown",e=>{
  if(e.code==="Space"){e.preventDefault();play.click()}
});
