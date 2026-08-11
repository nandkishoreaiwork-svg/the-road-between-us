const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const state={crew:null,place:"Goa",distance:590,selected:[],song:0,playing:false,mood:"FRIENDSHIP"};
const places={
 Mumbai:{distance:0,line:"The city where the trip begins."},
 Pune:{distance:150,line:"One more chai. Then we go."},
 Gokarna:{distance:520,line:"Wrong turn. Perfect destination."},
 Goa:{distance:590,line:"Beach. Sunset. No return ticket."},
 Manali:{distance:530,line:"Cold roads. Warm company."}
};
const songs=[
 {title:"Dil Chahta Hai",artist:"Road Trip Radio",mood:"FRIENDSHIP"},
 {title:"Koi Kahe Kehta Rahe",artist:"Road Trip Radio",mood:"FULL BANGER"},
 {title:"Woh Ladki Hai Kahan",artist:"Road Trip Radio",mood:"GOA"},
 {title:"Kaisi Hai Ye Rut",artist:"Road Trip Radio",mood:"SUNSET"},
 {title:"Tanhayee",artist:"Road Trip Radio",mood:"HEARTBREAK"},
 {title:"Jaane Kyon",artist:"Road Trip Radio",mood:"ROMANCE"},
 {title:"Akash's Love Theme",artist:"Road Trip Radio",mood:"LATE NIGHT"},
 {title:"Rockin' Goa",artist:"Road Trip Radio",mood:"GOA"},
 {title:"Dil Chahta Hai — Reprise",artist:"Road Trip Radio",mood:"MEMORIES"}
];
const packData=[
 ["📷","CAMERA","Someone's going to document everything."],
 ["🎸","GUITAR","Expect unnecessary roadside concerts."],
 ["🍪","SNACKS","Nobody is allowed to say they're hungry."],
 ["📼","CASSETTE","The playlist has been decided."],
 ["🗺️","MAP","Someone still believes in planning."],
 ["🕶️","SUNGLASSES","Main character energy."],
];
const $screen=id=>document.getElementById(id);
function show(id){
 $$(".screen").forEach(x=>x.classList.remove("active"));
 $screen(id).scrollIntoView({behavior:"smooth"});
}
$$("[data-next]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.next)));
$$(".back").forEach(b=>b.addEventListener("click",()=>show("hero")));
$$(".crew-card").forEach(c=>c.addEventListener("click",()=>{
 $$(".crew-card").forEach(x=>x.classList.remove("selected"));c.classList.add("selected");
 state.crew=c.dataset.crew;$("#crewNext").classList.add("show");
}));
$("#crewNext").onclick=()=>show("destination");
$$(".map-pin").forEach(p=>p.onclick=()=>{
 $$(".map-pin").forEach(x=>x.classList.remove("selected"));p.classList.add("selected");
 state.place=p.dataset.place;state.distance=places[state.place].distance||590;
 $("#destName").textContent=state.place.toUpperCase();$("#destDistance").textContent=state.distance+" KM";$("#destLine").textContent=places[state.place].line;
});
$("#packItems").innerHTML=packData.map((x,i)=>`<button data-item="${i}"><div class="item-icon">${x[0]}</div><strong>${x[1]}</strong><span>${x[2]}</span></button>`).join("");
$$(".items button").forEach(b=>b.onclick=()=>{
 const i=+b.dataset.item;
 if(b.classList.contains("selected")){b.classList.remove("selected");state.selected=state.selected.filter(x=>x!==i)}
 else if(state.selected.length<3){b.classList.add("selected");state.selected.push(i)}
 $("#packCount").textContent=state.selected.length+" / 3 selected";
 $("#engineBtn").classList.toggle("disabled",state.selected.length!==3);
});
$("#packBtn").onclick=()=>show("pack");
$("#engineBtn").onclick=()=>{if(state.selected.length===3){show("drive");startDrive()}};
function updateSong(){
 const s=songs[state.song];$("#trackTitle").textContent=s.title;$("#trackArtist").textContent=s.artist;$("#trackMood").textContent=s.mood;state.mood=s.mood;
}
$("#next").onclick=()=>{state.song=(state.song+1)%songs.length;updateSong();toast("Next banger loaded.");};
$("#prev").onclick=()=>{state.song=(state.song-1+songs.length)%songs.length;updateSong();};
$("#play").onclick=()=>{state.playing=!state.playing;$("#play").textContent=state.playing?"Ⅱ":"▶";toast(state.playing?"ROAD RADIO: ON":"ROAD RADIO: PAUSED")};
$("#moodBtn").onclick=()=>{const moods=["FRIENDSHIP","FULL BANGER","GOA","SUNSET","HEARTBREAK","ROMANCE","LATE NIGHT"];const m=moods[Math.floor(Math.random()*moods.length)];let i=songs.findIndex(s=>s.mood===m);if(i<0)i=0;state.song=i;updateSong();toast("Mood: "+m)};
const detours=[
 ["CHAI STOP","Everyone needs chai."],
 ["BEACH DETOUR","The road suddenly looks less important."],
 ["ROADSIDE DHABA","Best food of the trip?"],
 ["WRONG TURN","Nobody knows where you are."],
 ["RAIN","Windows up. Music louder."],
 ["SUNSET","Stop the car."]
];
$("#detourBtn").onclick=()=>{const d=detours[Math.floor(Math.random()*detours.length)];$("#detourTitle").textContent=d[0];$("#detourText").textContent=d[1];$("#detourModal").classList.add("show")};
$("#closeDetour").onclick=$("#keepDriving").onclick=()=>$("#detourModal").classList.remove("show");
$("#stopHere").onclick=()=>{ $("#detourModal").classList.remove("show"); show("memory"); populateMemory(); };
function startDrive(){
 $("#dashDest").textContent=state.place.toUpperCase();$("#distance").textContent=state.distance;
 let speed=0,dist=state.distance,fuel=100;
 const timer=setInterval(()=>{
   speed=Math.min(92,speed+Math.random()*5);dist=Math.max(0,dist-.7);fuel=Math.max(8,fuel-.03);
   $("#speed").textContent=String(Math.round(speed)).padStart(3,"0");
   $("#distance").textContent=Math.round(dist);$("#fuel").textContent=Math.round(fuel);
   const h=new Date().getHours();$("#driveTime").textContent=(h%12||12)+":"+String(new Date().getMinutes()).padStart(2,"0")+" "+(h>=12?"PM":"AM");
   if(dist<=0)clearInterval(timer);
 },500);
}
function populateMemory(){
 const memories=[
  "Got completely lost. Found the best sunset.",
  "Stopped for chai. Stayed for forty minutes.",
  "Played the same song three times.",
  "Missed the turn. Nobody cared.",
  "Someone said, 'Let's just keep driving.'"
 ];
 $("#photoPlace").textContent=state.place.toUpperCase();
 $("#memoryText").textContent=memories[Math.floor(Math.random()*memories.length)];
 $("#photoTime").textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
}
$("#saveMemory").onclick=()=>toast("Memory saved to your digital roll.");
$("#finishTrip").onclick=()=>show("gallery");
$("#again").onclick=()=>{state.selected=[];$$(".items button").forEach(x=>x.classList.remove("selected"));$("#packCount").textContent="0 / 3 selected";$("#engineBtn").classList.add("disabled");show("hero")};
$("#share").onclick=async()=>{
 const text=`THE ROAD BETWEEN US — ${state.place}. Three friends. One road. Infinite memories.`;
 if(navigator.share){try{await navigator.share({title:"The Road Between Us",text})}catch(e){}}
 else{await navigator.clipboard?.writeText(location.href);toast("Journey link copied.");}
};
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}
updateSong();
window.addEventListener("mousemove",e=>{
 document.documentElement.style.setProperty("--mx",((e.clientX/innerWidth)-.5)*10+"px");
 document.documentElement.style.setProperty("--my",((e.clientY/innerHeight)-.5)*10+"px");
});

const galleryNext=document.getElementById("galleryNext"); if(galleryNext) galleryNext.onclick=()=>show("final");

/* REALISTIC ROAD-TRIP MEMORY FLASH */
const roadMemories = [
  {
    title:"THE LONG WAY",
    text:"Three friends. One coastal road. No rush.",
    image:"./assets/friends-coastal-highway.png"
  },
  {
    title:"WINDOWS DOWN",
    text:"The sea on one side. The playlist on the other.",
    image:"./assets/friends-coastal-highway.png"
  },
  {
    title:"NO PLANS",
    text:"Nobody knew where we were going. Nobody cared.",
    image:"./assets/friends-coastal-highway.png"
  }
];

function showRoadMemory(){
  const flash=document.getElementById("memoryFlash");
  if(!flash) return;
  const m=roadMemories[Math.floor(Math.random()*roadMemories.length)];
  document.getElementById("memoryFlashImage").src=m.image;
  document.getElementById("memoryFlashTitle").textContent=m.title;
  document.getElementById("memoryFlashText").textContent=m.text;
  flash.classList.add("show");
  flash.setAttribute("aria-hidden","false");
  setTimeout(hideRoadMemory,2600);
}
function hideRoadMemory(){
  const flash=document.getElementById("memoryFlash");
  if(!flash) return;
  flash.classList.remove("show");
  flash.setAttribute("aria-hidden","true");
}
document.getElementById("memoryFlash")?.addEventListener("click",hideRoadMemory);

let roadMemoryTimer;
function startRoadMemorySequence(){
  clearInterval(roadMemoryTimer);
  roadMemoryTimer=setInterval(()=>{
    if(document.getElementById("drive")?.classList.contains("active")) showRoadMemory();
  },11000);
}
startRoadMemorySequence();
