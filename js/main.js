var vid, playbtn, seekslider, currentTimeText, durationTimeText, mutebtn, volumeslider, bwbtn, fwbtn, imgplay;

function initializePlayer(){
    // Initialise les objets
    vid = document.getElementById('my_video');
    playbtn = document.getElementById('playPauseButton');
    seekslider = document.getElementById('seekslider');
    currentTimeText = document.getElementById('currentTimeText');
    durationTimeText = document.getElementById('durationTimeText');
    mutebtn = document.getElementById('mutebtn');
    volumeslider = document.getElementById('volumeslider');
    bwbtn = document.getElementById('backward');
    fwbtn = document.getElementById('forward');
    imgplay = document.getElementById('imgplaypause');

    // Ajout Click Event
    playbtn.addEventListener("click",playPause,false);
    seekslider.addEventListener("change",vidSeek,false);
    vid.addEventListener("timeupdate",seektimeupdate,false);
    mutebtn.addEventListener("click",vidmute,false);
    volumeslider.addEventListener("change",setvolume,false);
    bwbtn.addEventListener("click",bw,false);
    fwbtn.addEventListener("click",fw,false);

}


window.onload = initializePlayer;

function playPause(){
    if (vid.paused){
        vid.play();
        imgplay.setAttribute('src','icons/pause.png');
    } else {
        vid.pause();
        imgplay.setAttribute('src','icons/play.png')
    }
}

function bw(){
    vid.currentTime -= 3;
}

function fw(){
    vid.currentTime += 3;
    if(vid.currentTime >= vid.duration) {
      vid.pause();
      vid.currentTime = 0;
      playbtn.innerHTML = "Play";
    }
}

function vidSeek(){
    var seekto = vid.duration * (seekslider.value / 100);
    vid.currentTime = seekto;
}

function seektimeupdate(){
    var newTime = vid.currentTime * (100 / vid.duration);
    seekslider.value = newTime;
    var curmins = Math.floor(vid.currentTime / 60);
	var cursecs = Math.floor(vid.currentTime - curmins * 60);
	var durmins = Math.floor(vid.duration / 60);
	var dursecs = Math.floor(vid.duration - durmins * 60);
    if(cursecs < 10){
        cursecs = "0"+cursecs; 
    }
	if(dursecs < 10){
        dursecs = "0"+dursecs; 
    }
	if(curmins < 10){
        curmins = "0"+curmins; 
    }
	if(durmins < 10){
        durmins = "0"+durmins; 
    }
	currentTimeText.innerHTML = curmins+":"+cursecs;
	durationTimeText.innerHTML = durmins+":"+dursecs;
}

function vidmute(){
    if (vid.muted){
        vid.muted = false;
        mutebtn.innerHTML = "Mute";
        volumeslider.value = 100;
    } else {
        vid.muted = true;
        mutebtn.innerHTML = "Unmute";
        volumeslider.value = 0;
    }
}

function setvolume(){
    vid.volume = volumeslider.value / 100;
}