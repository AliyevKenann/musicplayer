const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Медина',
        cover: 'assets/1.jpg',
        artist: 'Jah khalib'
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Karusel',
        cover: 'assets/2.jpg',
        artist: 'Orxan Zeynalli ft Miri Yusif',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Где ты теперь и с кем',
        cover: 'assets/3.jpg',
        artist: 'Баста, HammAli & Navai',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Cедая ночь',
        cover: 'assets/4.jpg',
        artist: 'Юрий Шатунов',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Shape Of My Heart',
        cover: 'assets/5.jpg',
        artist: 'Sting',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Доля воровская',
        cover: 'assets/6.jpg',
        artist: 'Бока',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Papanin gul balasi',
        cover: 'assets/7.jpg',
        artist: 'Namiq qaracuxurlu',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Небо над землёй',
        cover: 'assets/8.jpg',
        artist: 'Тимур Темиров',
    },
    {
        path: 'assets/9.mp3',
        displayName: 'Где Ты Была?',
        cover: 'assets/9.jpg',
        artist: 'HammAli & Navai',
    },
    {
        path: 'assets/10.mp3',
        displayName: 'Принцесса и нищий',
        cover: 'assets/10.jpg',
        artist: 'Jah Khalib',
    },
];

let musicIntex = 0; // 'musicInter' düzeltilmiş
let isPlaying = false;

function togglePlay(){
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic(){
    isPlaying = true
    // Oynat düğmesi ikonunu değiştir
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play(); // 'music.pause()' yerine 'music.play()' kullanıldı
}

function pauseMusic(){
    isPlaying = false
    // Duraklat düğmesi ikonunu değiştir
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIntex = (musicIntex + direction + songs.length) % songs.length; // 'musicInter' düzeltilmiş
    loadMusic(songs[musicIntex]);
    playMusic(); // 'music.pause()' yerine 'playMusic()' kullanıldı
}

function updateProgressBar(){
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIntex]); // 'musicIntex' düzeltilmiş
