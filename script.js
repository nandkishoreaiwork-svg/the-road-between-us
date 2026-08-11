const audio=document.getElementById("audio");
const playButton=document.getElementById("playButton");
const playIcon=document.getElementById("playIcon");
const playLabel=document.getElementById("playLabel");
const player=document.getElementById("player");
const progress=document.getElementById("progress");
const time=document.getElementById("time");
const status=document.getElementById("status");
const muteButton=document.getElementById("muteButton");

function formatTime(seconds){
  if(!Number.isFinite(seconds)) return "0:00";
  const m=Math.floor(seconds/60);
  const s=Math.floor(seconds%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

playButton.addEventListener("click", async ()=>{
  player.classList.add("open");
  if(audio.paused){
    try{
      await audio.play();
    }catch(e){
      status.textContent="PRESS PLAY AGAIN";
    }
  }else{
    audio.pause();
  }
});

audio.addEventListener("play",()=>{
  playIcon.textContent="Ⅱ";
  playLabel.textContent="NOW PLAYING";
  status.textContent="KHAABON KE PARINDAY • PLAYING";
});
audio.addEventListener("pause",()=>{
  playIcon.textContent="▶";
  playLabel.textContent="PLAY THE SONG";
  status.textContent="PAUSED";
});
audio.addEventListener("ended",()=>{
  playIcon.textContent="▶";
  playLabel.textContent="PLAY THE SONG";
  status.textContent="SONG FINISHED";
});
audio.addEventListener("loadedmetadata",()=>{
  time.textContent=`0:00 / ${formatTime(audio.duration)}`;
});
audio.addEventListener("timeupdate",()=>{
  if(audio.duration){
    progress.value=(audio.currentTime/audio.duration)*100;
    time.textContent=`${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  }
});
progress.addEventListener("input",()=>{
  if(audio.duration) audio.currentTime=(Number(progress.value)/100)*audio.duration;
});
muteButton.addEventListener("click",()=>{
  audio.muted=!audio.muted;
  muteButton.textContent=audio.muted?"🔇":"🔊";
});
audio.addEventListener("error",()=>{
  status.textContent="AUDIO FILE COULD NOT LOAD";
});
