const play = document.getElementsByClassName("play")[0];
const reset = document.getElementsByClassName("reset")[0];
const lap = document.getElementsByClassName("lap")[0];
const second = document.getElementsByClassName("sec")[0];
const minute = document.getElementsByClassName("min")[0];
const ms = document.getElementsByClassName("ms")[0];
const laps=document.getElementsByClassName("laps")[0];
const lapclr=document.getElementsByClassName("lapclr")[0];

let isplay = false;
let update;
let min = 0;
let sec = 0;
let centisec = 0;
let lapnum=0;

function toggle() {
    if (!isplay) {
        isplay = true;
        play.innerHTML = "Pause";
        update = setInterval(updateTime, 10); 
        lap.classList.remove("hide");
        reset.classList.remove("hide");
    } else {
        isplay = false;
        play.innerHTML = "Play";
        clearInterval(update);
    }
}

function updateTime() {
    centisec++;
    if (centisec === 100) {
        centisec = 0;
        sec++;
    }
    if (sec === 60) {
        sec = 0;
        min++;
    }

    ms.innerHTML = "&nbsp;" + centisec.toString().padStart(2, "0");
    second.innerHTML = "&nbsp;" + sec.toString().padStart(2, "0") + " :";
    minute.innerHTML = min.toString().padStart(2, "0") + " :";
    
}

function resetbt() {
    isplay = false;
    play.innerHTML = "Play";
    clearInterval(update);
    lapclear();
    min = 0;
    sec = 0;
    centisec = 0;
    second.innerHTML = "&nbsp; 00 :";
    minute.innerHTML = "00 :";
    ms.innerHTML = "&nbsp; 00";
    lap.classList.add("hide");
    reset.classList.add("hide");
    lapclr.classList.add("hide");
}

function addlap(){
    const li=document.createElement("li");
    const num=document.createElement("span");
    const tstamp=document.createElement("span");

    li.setAttribute("class","item");
    num.setAttribute("class","num");
    tstamp.setAttribute("class","timestamp");

    tstamp.innerHTML=minute.innerHTML+second.innerHTML+ms.innerHTML;
    lapnum=lapnum+1;
    num.innerHTML = '#' + lapnum;
    li.append(num,tstamp);
    laps.append(li);
    lapclr.classList.remove("hide");
}

function lapclear(){
    while(laps.children.length>0){
        laps.removeChild(laps.firstChild);
    }
    lapnum=0;
    lapclr.classList.add("hide");
}

play.addEventListener("click", toggle);
reset.addEventListener("click", resetbt);
lap.addEventListener("click",addlap);
lapclr.addEventListener("click",lapclear);

