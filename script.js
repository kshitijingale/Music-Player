const musicContainer = document.getElementById('music-container');
const title = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');

const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

// Songs
const songs = ['hey', 'summer', 'ukulele'];

// Song
let songIndex = 2;

function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play');
    play.querySelector('i').classList.remove('fa-play');
    play.querySelector('i').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    play.querySelector('i').classList.remove('fa-pause');
    play.querySelector('i').classList.add('fa-play');

    audio.pause();
}

function playNext() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();

}

function playPrev() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();

}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;

    const progressPer = (currentTime / duration) * 100;
    progress.style.width = `${progressPer}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;

    audio.currentTime = (clickX / width) * audio.duration;
}

// Event Listener
play.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

next.addEventListener('click', playNext);
prev.addEventListener('click', playPrev);

// Progress Bar
audio.addEventListener('timeupdate', updateProgress)

// Set Progress
progressContainer.addEventListener('click', setProgress)

// Song End
audio.addEventListener('ended', playNext);

loadSong(songs[songIndex]);

