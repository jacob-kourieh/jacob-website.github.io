// Fetching city data
const url = "https://backend-city-api-git-master-jacob-kourieh.vercel.app/cities.json";
let cities = [];

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        cities = data;
    });

// Functions
function getRandomCity() {
    if (cities.length === 0) return;
    const randomIndex = Math.floor(Math.random() * cities.length);
    const randomCity = cities[randomIndex];
    return randomCity;
}

function displayCity(city, cityInfo) {
    cityInfo.innerHTML = `
    <h2>${city.city}</h2>
    <img src="${city.img}" alt="${city.city}" />
    <h4><span>Country:</span> ${city.country}</h4>
    <h5><span>Language:</span> ${city.language}</h5>
  `;
}

function toggleDropdown(dropdownContainer, arrowBtn) {
    if (dropdownContainer.style.display === "none") {
        dropdownContainer.style.display = "block";
        arrowBtn.src = "/images/up-arrow.svg";
    } else {
        dropdownContainer.style.display = "none";
        arrowBtn.src = "/images/down-arrow.svg";
    }
}

function resetDropdown(randomCityBtn, loading, cityInfo, tryAgainBtn, googleLink, dropdownContainer) {
    randomCityBtn.style.display = "inline-block";
    dropdownContainer.querySelector("p").style.display = "block";
    loading.style.display = "none";
    cityInfo.style.display = "none";
    tryAgainBtn.style.display = "none";
    googleLink.style.display = "none";
}

function getAndDisplayCity(loading, cityInfo, tryAgainBtn, googleLink) {
    loading.style.display = "flex";
    cityInfo.style.display = "none";
    tryAgainBtn.style.display = "none";
    googleLink.style.display = "none";
    setTimeout(() => {
        const randomCity = getRandomCity();
        displayCity(randomCity, cityInfo);
        loading.style.display = "none";
        cityInfo.style.display = "block";
        tryAgainBtn.style.display = "inline-block";
        googleLink.style.display = "inline-block";
        googleLink.href = `https://www.google.com/search?q=${randomCity.city}`;
    }, 2000);
}

function initializeCitySection(citySection) {
    const arrowBtn = citySection.querySelector("#arrowBtn");
    const dropdownContainer = citySection.querySelector("#dropdownContainer");
    const randomCityBtn = citySection.querySelector("#randomCityBtn");
    const tryAgainBtn = citySection.querySelector("#tryAgainBtn");
    const googleLink = citySection.querySelector("#googleLink");
    const loading = citySection.querySelector("#loading");
    const cityInfo = citySection.querySelector("#cityInfo");

    arrowBtn.addEventListener("click", () => {
        toggleDropdown(dropdownContainer, arrowBtn);
        if (dropdownContainer.style.display === "none") {
            resetDropdown(randomCityBtn, loading, cityInfo, tryAgainBtn, googleLink, dropdownContainer);
        }
    });

    randomCityBtn.addEventListener("click", () => {
        randomCityBtn.style.display = "none";
        dropdownContainer.querySelector("p").style.display = "none";
        getAndDisplayCity(loading, cityInfo, tryAgainBtn, googleLink);
    });

    tryAgainBtn.addEventListener("click", () => {
        getAndDisplayCity(loading, cityInfo, tryAgainBtn, googleLink);
    });
}

// Initialize original and popup city sections
const citySection = document.getElementById("city");
const popupCitySection = document.getElementById("popupCity");

initializeCitySection(citySection);
initializeCitySection(popupCitySection);

// Go to Popup City Button
const goToPopupCityBtn = document.getElementById("goToPopupCityBtn");
const popupBg = document.getElementById("popupBg");

goToPopupCityBtn.addEventListener("click", () => {
    popupCitySection.style.display = "block";
    popupBg.style.display = "block";
});

// Close the popup when the close button is clicked
const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => {
    popupCitySection.style.display = "none";
    popupBg.style.display = "none";
    const randomCityBtn = popupCitySection.querySelector("#randomCityBtn");
    const loading = popupCitySection.querySelector("#loading");
    const cityInfo = popupCitySection.querySelector("#cityInfo");
    const tryAgainBtn = popupCitySection.querySelector("#tryAgainBtn");
    const googleLink = popupCitySection.querySelector("#googleLink");
    const dropdownContainer = popupCitySection.querySelector("#dropdownContainer");
    resetDropdown(randomCityBtn, loading, cityInfo, tryAgainBtn, googleLink, dropdownContainer);
});

function openPopupCity() {
    document.getElementById("popupBg").style.display = "block";
    document.getElementById("popupCity").style.display = "block";
}

function closePopupCity() {
    document.getElementById("popupBg").style.display = "none";
    document.getElementById("popupCity").style.display = "none";
    history.pushState(null, "", location.pathname);
}


document.getElementById("closeBtn").addEventListener("click", closePopupCity);

function checkForShowPopupCityParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const showCity = urlParams.get("showcity");

    if (showCity === "true") {
        openPopupCity();
    }
}

checkForShowPopupCityParameter();

// history.pushState(null, "", location.pathname);
