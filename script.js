const $=s=>document.querySelector(s);
const audio=$("#audio"), play=$("#play"), start=$("#start"), status=$("#status"), seek=$("#seek");
const memories=[
  '"Windows down. Music up. Nobody asks where we\'re going."',
  '"One more song. Then we\'ll stop."',
  '"The best plans were the ones we never made."',
  '"Same friends. Different city. Same road-trip nonsense."',
  '"Somewhere between the highway and the sunset, everything felt right."'
];
const songs=[
 {title:"Khaabon Ke Parinday",artist:"Mohit Chauhan · Alyssa Mendonsa",mood:"ROAD TRIP",file:"./assets/khaabon-ke-parinday.mp3"},
 {title:"The Long Way",artist:"Road Wala Radio",mood:"MEMORY",file:"./assets/khaabon-ke-parinday.mp3"},
 {title:"Windows Down",artist:"Road Wala Radio",mood:"SUNSET",file:"./assets/khaabon-ke-parinday.mp3"}
];
let index=0,started=false;

function setTrack(){
 const s=songs[index];
 $("#title").textContent=s.title;$("#artist").textContent=s.artist;$("#mood").textContent=s.mood;
 audio.src=s.file;audio.load();
}
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1700)}
function playAudio(){
 audio.play().then(()=>{
   started=true;document.body.classList.add("playing");play.textContent="Ⅱ";status.textContent="PLAYING";toast("Road Radio is on.");
 }).catch(()=>toast("Tap the main ▶ button again to start."));
}
start.onclick=()=>{playAudio();document.querySelector(".radio")?.scrollIntoView({behavior:"smooth",block:"center"});};
play.onclick=()=>audio.paused?playAudio():audio.pause();
audio.addEventListener("play",()=>{document.body.classList.add("playing");play.textContent="Ⅱ";status.textContent="PLAYING"});
audio.addEventListener("pause",()=>{document.body.classList.remove("playing");play.textContent="▶";status.textContent="PAUSED"});
audio.addEventListener("ended",()=>{document.body.classList.remove("playing");play.textContent="▶";status.textContent="END OF SIDE A"});
audio.addEventListener("loadedmetadata",()=>{$("#duration").textContent=format(audio.duration)});
audio.addEventListener("timeupdate",()=>{
 if(audio.duration){seek.value=audio.currentTime/audio.duration*100;$("#current").textContent=format(audio.currentTime)}
});
audio.addEventListener("error",()=>{status.textContent="AUDIO ERROR";toast("Check the MP3 inside /assets/.")});
seek.oninput=()=>{if(audio.duration)audio.currentTime=seek.value/100*audio.duration};
$("#prev").onclick=()=>{index=(index-1+songs.length)%songs.length;setTrack();toast("Previous memory.")};
$("#next").onclick=()=>{index=(index+1)%songs.length;setTrack();toast("Next memory.")};
$("#shuffle").onclick=()=>{
 index=Math.floor(Math.random()*songs.length);setTrack();
 $("#memory").textContent=memories[Math.floor(Math.random()*memories.length)];
 toast("The road picked a song.");
};
$("#mute").onclick=()=>{
 audio.muted=!audio.muted;$("#mute").textContent=audio.muted?"SOUND OFF":"SOUND ON";toast(audio.muted?"Radio muted":"Radio unmuted");
};
$("#rideAgain").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
function format(sec){if(!Number.isFinite(sec))return"0:00";return `${Math.floor(sec/60)}:${String(Math.floor(sec%60)).padStart(2,"0")}`}
setTrack();
