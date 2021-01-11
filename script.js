const image = document.querySelector('img');
const title = document.querySelector('#title');
const author = document.querySelector('#artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress')
const durationEl = document.getElementById('duration');
const currentTimeEl = document.getElementById('current-time');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const playBtn = document.querySelector('#play');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electronic Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
]

var isPlaying = false;

function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
})

let songIndex = 0;

function nextSong() {
    if(songIndex < 3) {
        songIndex++;
    }else{
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    if(songIndex > 0 ) {
        songIndex--;
    }else{
        songIndex = 3;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function loadSong(song){
    title.textContent = song.displayName;
    author.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//on Load - Select first song
loadSong(songs[songIndex])

// Update Progress Bar & Time
function updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        const progressPercent = currentTime / duration * 100;
        progress.style.width = `${progressPercent}%`;

        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        let currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);

        if(currentTimeSeconds < 10){
            currentTimeSeconds = `0${currentTimeSeconds}`
        }
        if(currentTimeSeconds){
            currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
        }
    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const progressPercent = clickX / width * 100;
    progress.style.width = `${progressPercent}%`;
    const {duration} = music
    music.currentTime = duration * progressPercent /100;
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click', setProgressBar);