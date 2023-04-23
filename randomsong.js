// // random music

// // Fetch the genres from the Deezer API and populate the select element
// async function loadGenres() {
//     const corsProxy = "https://api.allorigins.win/raw?url=";
//     const genresUrl = "/images/genre.json";
//     const response = await fetch(`${corsProxy}${genresUrl}`);
//     const data = await response.json();

//     const genreSelect = document.getElementById("genre-select");

//     data.data.forEach(genre => {
//         const option = document.createElement("option");
//         option.value = genre.id;
//         option.textContent = genre.name;
//         genreSelect.appendChild(option);
//     });
// }

// // Function to request a valid song using Deezer API
// async function requestValidSong(genreId = null) {
//     const searchUrl = `https://api.deezer.com/genre/${genreId}/artists`;
//     const corsProxy = "https://api.allorigins.win/raw?url=";

//     const response = await fetch(`${corsProxy}${searchUrl}`);
//     const data = await response.json();

//     if (data.data.length === 0) {
//         return { info: "No songs found", previewUrl: null };
//     }

//     const randomArtist = data.data[Math.floor(Math.random() * data.data.length)];
//     const topTracksUrl = `${corsProxy}${randomArtist.tracklist}`;
//     const topTracksResponse = await fetch(topTracksUrl);
//     const topTracksData = await topTracksResponse.json();

//     if (topTracksData.data.length === 0) {
//         return { info: "No songs found", previewUrl: null };
//     }

//     const randomSong = topTracksData.data[Math.floor(Math.random() * topTracksData.data.length)];
//     const artist = randomSong.artist.name;
//     const song = randomSong.title;

//     return { info: `${artist} - ${song}`, previewUrl: randomSong.preview };
// }

// let audio;

// // Function to create and play an audio element
// function playAudio(previewUrl) {
//     if (audio) {
//         audio.pause();
//     }
//     audio = new Audio(previewUrl);
//     audio.play();
// }

// // Function to toggle the animation of the audio player
// function toggleAnimation() {
//     const mainCover = document.getElementById("main_cover");
//     mainCover.classList.toggle("playing");
// }

// // Initialize the app
// async function init() {
//     await loadGenres();

//     const playButton = document.getElementById("play-button");
//     const genreSelect = document.getElementById("genre-select");
//     const songInfoElement = document.getElementById("song-info");

//     const mainCover = document.getElementById("main_cover");
//     mainCover.addEventListener("click", () => {
//         if (audio) {
//             if (audio.paused) {
//                 audio.play();
//             } else {
//                 audio.pause();
//             }
//         }
//         toggleAnimation();
//     });

//     playButton.addEventListener("click", async () => {
//         playButton.disabled = true;
//         playButton.textContent = "Loading...";

//         const selectedGenre = genreSelect.value;
//         const { info, previewUrl } = await requestValidSong(selectedGenre);

//         // Update the UI to display the selected song
//         songInfoElement.textContent = info;

//         // Play the 30-second preview using an audio element
//         if (previewUrl) {
//             playAudio(previewUrl);
//             toggleAnimation();
//         }
//         playButton.disabled = false;
//         playButton.textContent = "Get a random song";
//     });
// }

// init();



// speed version

// document.addEventListener("DOMContentLoaded", init);

// async function init() {
//     loadGenres();
//     setupEventListeners();
// }

// async function loadGenres() {
//     const response = await fetch("/genre.json");
//     const genres = await response.json();
//     populateGenreDropdown(genres);
// }

// function populateGenreDropdown(genres) {
//     const genreSelect = document.getElementById("genre-select");

//     genres.forEach((genre) => {
//         const option = document.createElement("option");
//         option.value = genre.id;
//         option.textContent = genre.name;
//         genreSelect.appendChild(option);
//     });
// }

// function setupEventListeners() {
//     const genreSelect = document.getElementById("genre-select");
//     const playButton = document.getElementById("play-button");

//     genreSelect.addEventListener("change", () => {
//         fetchRandomSong();
//     });

//     playButton.addEventListener("click", () => {
//         fetchRandomSong();
//     });

//     // Custom player controls
//     const playerControls = document.querySelector(".player-controls");
//     playerControls.addEventListener("click", togglePlayback);
// }

// function showLoadingSpinner() {
//     const loading = document.querySelector(".loading");
//     loading.style.display = "flex";
// }

// function hideLoadingSpinner() {
//     const loading = document.querySelector(".loading");
//     loading.style.display = "none";
// }

// async function fetchRandomSong() {
//     const genreId = document.getElementById("genre-select").value;
//     if (!genreId) {
//         return;
//     }

//     showLoadingSpinner();

//     const corsProxy = "https://api.allorigins.win/raw?url=";
//     const response = await fetch(`${corsProxy}https://api.deezer.com/genre/${genreId}/artists`);
//     const data = await response.json();
//     const artists = data.data;

//     if (artists.length === 0) {
//         hideLoadingSpinner();
//         return;
//     }

//     const randomArtist = artists[Math.floor(Math.random() * artists.length)];
//     const artistResponse = await fetch(`${corsProxy}https://api.deezer.com/artist/${randomArtist.id}/top?limit=5`);
//     const artistData = await artistResponse.json();
//     const songs = artistData.data;

//     if (songs.length === 0) {
//         hideLoadingSpinner();
//         return;
//     }

//     const randomSong = songs[Math.floor(Math.random() * songs.length)];

//     if (randomSong) {
//         const info = `${randomSong.title} by ${randomSong.artist.name}`;
//         const player = document.getElementById("player");
//         const songInfoElement = document.getElementById("song-info");

//         player.src = randomSong.preview;
//         player.load();

//         songInfoElement.textContent = info;

//         hideLoadingSpinner();
//     } else {
//         hideLoadingSpinner();
//     }
// }

// function togglePlayback() {
//     const player = document.getElementById("player");
//     const playerControls = document.querySelector(".player-controls");

//     if (player.paused) {
//         player.play();
//         playerControls.classList.add("playing");
//     } else {
//         player.pause();
//         playerControls.classList.remove("playing");
//     }
// }


document.addEventListener("DOMContentLoaded", initSong);

async function initSong() {
    loadGenres();
    setupEventListenersSong();
}

async function loadGenres() {
    const response = await fetch("/genre.json");
    const genres = await response.json();
    populateGenreDropdown(genres);
}

function populateGenreDropdown(genres) {
    const genreSelect = document.getElementById("genre-select");

    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
}

function setupEventListenersSong() {
    const arrowBtnSong = document.getElementById("arrowBtnSong");
    arrowBtnSong.addEventListener("click", toggleDropdownSong);

    const tryAgainBtnSong = document.getElementById("try-again-song");
    tryAgainBtnSong.addEventListener("click", fetchRandomSong);

    const getRandomSongBtn = document.getElementById("get-random-song");
    getRandomSongBtn.addEventListener("click", () => {
        const genreId = document.getElementById("genre-select").value;
        if (genreId) {
            fetchRandomSong();
        }
    });

    const playerControls = document.querySelector(".player-controls");
    playerControls.addEventListener("click", togglePlayback);
}

function toggleDropdownSong() {
    const arrowBtnSong = document.getElementById("arrowBtnSong");
    const dropdownContainerSong = document.getElementById("dropdownContainerSong");

    if (dropdownContainerSong.style.display === "none") {
        arrowBtnSong.src = "/images/up-arrow.svg";
        dropdownContainerSong.style.display = "block";
    } else {
        arrowBtnSong.src = "/images/down-arrow.svg";
        dropdownContainerSong.style.display = "none";
    }
}

async function fetchRandomSong() {
    const genreId = document.getElementById("genre-select").value;
    if (!genreId) {
        return;
    }

    const corsProxy = "https://api.allorigins.win/raw?url=";
    const response = await fetch(`${corsProxy}https://api.deezer.com/genre/${genreId}/artists`);
    const data = await response.json();
    const artists = data.data;

    if (artists.length === 0) {
        return;
    }

    const randomArtist = artists[Math.floor(Math.random() * artists.length)];
    const artistResponse = await fetch(`${corsProxy}https://api.deezer.com/artist/${randomArtist.id}/top?limit=1`);
    const artistData = await artistResponse.json();
    const songs = artistData.data;

    console.log(artistResponse);

    if (songs.length === 0) {
        return;
    }

    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    if (randomSong) {
        const info = `${randomSong.title} by ${randomSong.artist.name}`;
        const player = document.getElementById("player");
        const songInfoElement = document.getElementById("song-info");
        const tryAgainBtnSong = document.getElementById("try-again-song");

        player.src = randomSong.preview;
        player.load();

        songInfoElement.textContent = info;
        tryAgainBtnSong.style.display = "block";

        togglePlayback();
    }
}

function togglePlayback() {
    const player = document.getElementById("player");
    const playerControls = document.querySelector(".player-controls");

    if (player.paused) {
        player.play();
        playerControls.classList.add("playing");
    } else {
        player.pause();
        playerControls.classList.remove("playing");
    }
}

