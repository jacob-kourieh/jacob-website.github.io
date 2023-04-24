
document.addEventListener("DOMContentLoaded", initSong);

async function initSong() {
    await loadGenres();
    setupEventListenersSong();
    updateGetRandomSongButton();
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

    genreSelect.addEventListener("change", updateGetRandomSongButton);
}

function updateGetRandomSongButton() {
    const genreSelect = document.getElementById("genre-select");
    const getRandomSongBtn = document.getElementById("get-random-song");

    if (genreSelect.value === "") {
        getRandomSongBtn.disabled = true;
        getRandomSongBtn.classList.add("disabled");
    } else {
        getRandomSongBtn.disabled = false;
        getRandomSongBtn.classList.remove("disabled");
    }
}


function searchSongOnSpotify(songTitle, artistName) {
    const searchQuery = encodeURIComponent(`${songTitle} ${artistName}`);
    const searchUrl = `https://open.spotify.com/search/${searchQuery}`;
    window.open(searchUrl, "_blank");
}


function setupEventListenersSong() {
    const arrowBtnSong = document.getElementById("arrowBtnSong");
    arrowBtnSong.addEventListener("click", () => {
        toggleDropdownSong();
        if (document.getElementById("dropdownContainerSong").style.display === "none") {
            resetDropdownSong();
        }
    });

    const tryAgainBtnSong = document.getElementById("try-again-song");
    tryAgainBtnSong.addEventListener("click", fetchRandomSong);

    const getRandomSongBtn = document.getElementById("get-random-song");
    getRandomSongBtn.addEventListener("click", fetchRandomSong);

    const playerControls = document.querySelector(".player-controls");
    playerControls.addEventListener("click", togglePlayback);

    const findSpotifyBtn = document.getElementById("find-spotify-song");
    findSpotifyBtn.addEventListener("click", () => {
        const songTitle = document.querySelector("#song-info h3").textContent;
        const artistName = document.querySelector("#song-info h5").textContent;
        searchSongOnSpotify(songTitle, artistName);
    });

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

    showLoadingAnimation();
    resetPlayer();

    const corsProxy = "https://api.allorigins.win/raw?url=";

    try {
        const response = await fetch(`${corsProxy}https://api.deezer.com/genre/${genreId}/artists`);
        const data = await response.json();
        const artists = data.data;

        if (artists.length === 0) {
            throw new Error("No artists found.");
        }

        const randomArtist = artists[Math.floor(Math.random() * artists.length)];
        const artistResponse = await fetch(`${corsProxy}https://api.deezer.com/artist/${randomArtist.id}/top?limit=5`);
        const artistData = await artistResponse.json();
        const songs = artistData.data;

        if (songs.length === 0) {
            throw new Error("No songs found.");
        }

        const randomSong = songs[Math.floor(Math.random() * songs.length)];

        if (randomSong) {
            const songInfoElement = document.getElementById("song-info");
            const tryAgainBtnSong = document.getElementById("try-again-song");
            const findSpotify = document.getElementById("find-spotify-song");

            player.src = randomSong.preview;
            player.load();

            songInfoElement.innerHTML = `<h3>${randomSong.title}</h3><h5>${randomSong.artist.name}</h5>`;
            tryAgainBtnSong.style.display = "block";
            findSpotify.style.display = "block";

            hideLoadingAnimation();
            displayPlayerControls();
        }
    } catch (error) {
        hideLoadingAnimation();
        displayErrorMessage(error.message);
    }
}

function displayErrorMessage(message) {
    const player = document.getElementById("player");
    const songInfoElement = document.getElementById("song-info");

    player.style.display = "none";
    songInfoElement.innerHTML = `<p class="error-message">${message}</p>`;
    songInfoElement.style.display = "block";
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

function showLoadingAnimation() {
    const loadingAnimation = document.getElementById("loading-animation");
    loadingAnimation.style.display = "block";
}

function hideLoadingAnimation() {
    const loadingAnimation = document.getElementById("loading-animation");
    loadingAnimation.style.display = "none";
}

function displayPlayerControls() {
    const playerControls = document.querySelector(".player-controls");
    playerControls.style.display = "block";
}

function resetDropdownSong() {
    const tryAgainBtnSong = document.getElementById("try-again-song");
    const player = document.getElementById("player");
    const playerControls = document.querySelector(".player-controls");
    const songInfoElement = document.getElementById("song-info");
    const genreSelect = document.getElementById("genre-select");
    const getRandomSongBtn = document.getElementById("get-random-song");
    const findSpotify = document.getElementById("find-spotify-song");

    player.pause();
    player.src = "";
    playerControls.classList.remove("playing");
    playerControls.style.display = "none";
    songInfoElement.innerHTML = "";
    tryAgainBtnSong.style.display = "none";
    findSpotify.style.display = "none";
    genreSelect.value = "";
    getRandomSongBtn.disabled = true;
    updateGetRandomSongButton();
}

function resetPlayer() {
    const playerControls = document.querySelector(".player-controls");
    playerControls.style.display = "none";
    playerControls.classList.remove("playing");
}

function showPlayerAndInfo() {
    const player = document.getElementById("player");
    const songInfoElement = document.getElementById("song-info");
    const tryAgainBtnSong = document.getElementById("try-again-song");
    const findSpotify = document.getElementById("find-spotify-song");

    player.style.display = "block";
    songInfoElement.style.display = "block";
    tryAgainBtnSong.style.display = "block";
    findSpotify.style.display = "block";
}
