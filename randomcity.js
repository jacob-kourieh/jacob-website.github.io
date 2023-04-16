//random city
const arrowBtn = document.getElementById("arrowBtn");
const dropdownContainer = document.getElementById("dropdownContainer");
const randomCityBtn = document.getElementById("randomCityBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const googleLink = document.getElementById("googleLink");
const loading = document.getElementById("loading");
const cityInfo = document.getElementById("cityInfo");

const url = "https://backend-city-be57nqltj-jacob-kourieh.vercel.app/cities.json";
let cities = [];

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        cities = data;
    });

function getRandomCity() {
    if (cities.length === 0) return;
    const randomIndex = Math.floor(Math.random() * cities.length);
    const randomCity = cities[randomIndex];
    return randomCity;
}

function displayCity(city) {
    cityInfo.innerHTML = `
    <h2>${city.city}</h2>
    <img src="${city.img}" alt="${city.city}" />
    <h4><span>Country:</span> ${city.country}</h4>
    <h5><span>Language:</span> ${city.language}</h5>
  `;
}


function toggleDropdown() {
    if (dropdownContainer.style.display === "none") {
        dropdownContainer.style.display = "block";
        arrowBtn.src = "/images/up-arrow.svg";
    } else {
        dropdownContainer.style.display = "none";
        arrowBtn.src = "/images/down-arrow.svg";
    }
}

arrowBtn.addEventListener("click", () => {
    toggleDropdown();
    if (dropdownContainer.style.display === "none") {
        resetDropdown();
    }
});

function resetDropdown() {
    randomCityBtn.style.display = "inline-block";
    document.querySelector("#dropdownContainer > p").style.display = "block";
    loading.style.display = "none";
    cityInfo.style.display = "none";
    tryAgainBtn.style.display = "none";
    googleLink.style.display = "none";
}

randomCityBtn.addEventListener("click", () => {
    randomCityBtn.style.display = "none";
    document.querySelector("#dropdownContainer > p").style.display = "none";
    getAndDisplayCity();
});

tryAgainBtn.addEventListener("click", () => {
    getAndDisplayCity();
});

function getAndDisplayCity() {
    loading.style.display = "flex";
    cityInfo.style.display = "none";
    tryAgainBtn.style.display = "none";
    googleLink.style.display = "none";
    setTimeout(() => {
        const randomCity = getRandomCity();
        displayCity(randomCity);
        loading.style.display = "none";
        cityInfo.style.display = "block";
        tryAgainBtn.style.display = "inline-block";
        googleLink.style.display = "inline-block";
        googleLink.href = `https://www.google.com/search?q=${randomCity.city}`;
    }, 3000);
}
