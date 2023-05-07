document.addEventListener("DOMContentLoaded", initPopupSong);

async function initPopupSong() {
    await loadGenresPopup();
    setupEventListenersPopupSong();
    updateGetRandomSongButtonPopup();
    checkForShowPopupParameter();
    const player = document.getElementById("player");
    player.addEventListener("ended", handlePlaybackEnd)
}

function handlePlaybackEnd() {
    const playerControls = document.querySelector(".player-controls-popup");
    playerControls.classList.remove("playing");
}

async function loadGenresPopup() {
    const response = await fetch("random-song/genre.json");
    const genres = await response.json();
    populateGenreDropdownPopup(genres);
}

function populateGenreDropdownPopup(genres) {
    const genreSelectPopup = document.getElementById("genre-select-popup");

    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelectPopup.appendChild(option);
    });

    genreSelectPopup.addEventListener("change", updateGetRandomSongButtonPopup);
}

function updateGetRandomSongButtonPopup() {
    const genreSelectPopup = document.getElementById("genre-select-popup");
    const getRandomSongBtnPopup = document.getElementById("get-random-song-popup");

    if (genreSelectPopup.value === "") {
        getRandomSongBtnPopup.disabled = true;
        getRandomSongBtnPopup.classList.add("disabled");
    } else {
        getRandomSongBtnPopup.disabled = false;
        getRandomSongBtnPopup.classList.remove("disabled");
    }
}

function searchSongOnSpotifyPopup(songTitle, artistName) {
    const searchQuery = encodeURIComponent(`${songTitle} ${artistName}`);
    const searchUrl = `https://open.spotify.com/search/${searchQuery}`;
    window.open(searchUrl, "_blank");
}

function setupEventListenersPopupSong() {

    const tryAgainBtnSongPopup = document.getElementById("try-again-song-popup");
    tryAgainBtnSongPopup.addEventListener("click", fetchRandomSongPopup);

    const getRandomSongBtnPopup = document.getElementById("get-random-song-popup");
    getRandomSongBtnPopup.addEventListener("click", fetchRandomSongPopup);

    const playerControlsPopup = document.querySelector(".player-controls-popup");
    playerControlsPopup.addEventListener("click", togglePlaybackPopup);

    const findSpotifyBtnPopup = document.getElementById("find-spotify-song-popup");
    findSpotifyBtnPopup.addEventListener("click", () => {
        const songTitle = document.querySelector("#song-info-popup h3").textContent;
        const artistName = document.querySelector("#song-info-popup h5").textContent;
        searchSongOnSpotifyPopup(songTitle, artistName);
    });
}

async function fetchRandomSongPopup() {
    const genreId = document.getElementById("genre-select-popup").value;
    if (!genreId) {
        return;
    }

    showLoadingAnimationPopup();
    resetPlayerPopup();

    const corsProxy = "https://jacob-website-jacob-kourieh.vercel.app/api/cors-proxy?url=";

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
            const songInfoElement = document.getElementById("song-info-popup");
            const tryAgainBtnSong = document.getElementById("try-again-song-popup");
            const findSpotify = document.getElementById("find-spotify-song-popup");
            const player = document.getElementById("player");

            player.src = randomSong.preview;
            player.load();

            songInfoElement.innerHTML = `<h3>${randomSong.title}</h3><h5>${randomSong.artist.name}</h5>`;
            tryAgainBtnSong.style.display = "block";
            findSpotify.style.display = "block";

            hideLoadingAnimationPopup();
            displayPlayerControlsPopup();
        }
    } catch (error) {
        hideLoadingAnimationPopup();
        displayErrorPopup(error.message);
    }
}

function displayErrorPopup(message) {
    const playerPopup = document.getElementById("player");
    const songInfoElement = document.getElementById("song-info-popup");

    playerPopup.style.display = "none";
    songInfoElement.innerHTML = `<p class="error-message">${message}</p>`;
    songInfoElement.style.display = "block";
}

function togglePlaybackPopup() {
    const player = document.getElementById("player");
    const playerControls = document.querySelector(".player-controls-popup");

    if (player.paused) {
        player.play();
        playerControls.classList.add("playing");
    } else {
        player.pause();
        playerControls.classList.remove("playing");
    }
}

function showLoadingAnimationPopup() {
    const loadingAnimation = document.getElementById("loading-container-popup");
    loadingAnimation.style.display = "block";
}

function hideLoadingAnimationPopup() {
    const loadingAnimation = document.getElementById("loading-container-popup");
    loadingAnimation.style.display = "none";
}

function displayPlayerControlsPopup() {
    const playerControls = document.querySelector(".player-controls-popup");
    playerControls.style.display = "block";
}

function resetDropdownSongPpoup() {
    const tryAgainBtnSong = document.getElementById("try-again-song-popup");
    const player = document.getElementById("player");
    const playerControls = document.querySelector(".player-controls-popup");
    const songInfoElement = document.getElementById("song-info-popup");
    const genreSelect = document.getElementById("genre-select-popup");
    const getRandomSongBtn = document.getElementById("get-random-song-popup");
    const findSpotify = document.getElementById("find-spotify-song-popup");

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

function resetPlayerPopup() {
    const playerControls = document.querySelector(".player-controls-popup");
    playerControls.style.display = "none";
    playerControls.classList.remove("playing");
}

function showPlayerAndInfoPopup() {
    const player = document.getElementById("player");
    const songInfoElement = document.getElementById("song-info-popup");
    const tryAgainBtnSong = document.getElementById("try-again-song-popup");
    const findSpotify = document.getElementById("find-spotify-song-popup");

    player.style.display = "block";
    songInfoElement.style.display = "block";
    tryAgainBtnSong.style.display = "block";
    findSpotify.style.display = "block";
}


const goToPopupSongBtn = document.getElementById("goToPopupSongBtn");
goToPopupSongBtn.addEventListener("click", () => {
    const popupBgSong = document.getElementById("popupBg");
    const popupSong = document.getElementById("popupSong");
    popupBgSong.style.display = "block";
    popupSong.style.display = "block";
    resetDropdownSongPpoup();
    resetPlayerPopup();
});


const closeBtnSongPopup = document.getElementById("closeBtnSong");
closeBtnSongPopup.addEventListener("click", () => {
    const popupBgSong = document.getElementById("popupBg");
    const popupSong = document.getElementById("popupSong");
    const player = document.getElementById("player");

    popupBgSong.style.display = "none";
    popupSong.style.display = "none";
    player.pause();
    player.src = "";
    player.load();
    resetDropdownSongPpoup();
    resetPlayerPopup();
    history.pushState(null, "", location.pathname);
});


function checkForShowPopupParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const showPopup = urlParams.get("showsong");

    if (showPopup === "true") {
        openPopup();
    }
}

function openPopup() {
    document.getElementById("popupBg").style.display = "block";
    document.getElementById("popupSong").style.display = "block";
}

function closePopup() {
    document.getElementById("popupBg").style.display = "none";
    document.getElementById("popupSong").style.display = "none";
}

document.getElementById("closeBtnSong").addEventListener("click", closePopup);

