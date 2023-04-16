//Dark mode toggling based on the calculated sunset time by use an IP-based geolocation API to get the user's approximate location.

function enableDarkMode() {
    document.body.classList.add('darkmode');
}

function disableDarkMode() {
    document.body.classList.remove('darkmode');
}

function applyDarkModeBasedOnSunset(latitude, longitude) {
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() / 60;
    const dayOfYear = getDayOfYear(date);
    const sunsetTime = getSunsetTime(latitude, longitude, timezoneOffset, dayOfYear);

    if (date > sunsetTime) {
        enableDarkMode();
        darkmodeToggles.forEach((toggle) => {
            toggle.checked = true;
        });
        localStorage.setItem("darkmode", true);
    } else {
        disableDarkMode();
        darkmodeToggles.forEach((toggle) => {
            toggle.checked = false;
        });
        localStorage.setItem("darkmode", false);
    }
}

function getDayOfYear(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function getSunsetTime(latitude, longitude, timezoneOffset, dayOfYear) {
    const gamma = -0.10471975512;
    const dayAngle = 0.01720212481 * dayOfYear - 1.73324438;
    const solarNoon = 12 + (longitude / 15) - timezoneOffset;
    const solarTime = solarNoon + (gamma * Math.sin(dayAngle));
    const solarDeclination = 0.40910517667 * Math.sin(dayAngle - 1.40524108);
    const hourAngle = Math.acos(-Math.tan(latitude) * Math.tan(solarDeclination));
    const sunsetTime = solarTime + (4 * hourAngle / 60);

    return new Date().setHours(sunsetTime, 0, 0, 0);
}

// Get the user's location based on their IP address
async function getIpAddress() {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
}

async function getLocationByIp(ipAddress) {
    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
    const data = await response.json();
    return {
        latitude: data.latitude,
        longitude: data.longitude,
    };
}

// Call the functions to apply dark mode based on sunset time
getIpAddress()
    .then(getLocationByIp)
    .then((location) => {
        applyDarkModeBasedOnSunset(location.latitude, location.longitude);
    });

// --- Dark Mode toggling ---
const darkmodeToggles = document.querySelectorAll(".darkmode-toggle");

function handleDarkmodeToggle() {
    if (this.checked) {
        enableDarkMode();
        localStorage.setItem("darkmode", true);
    } else {
        disableDarkMode();
        localStorage.setItem("darkmode", false);
    }

    darkmodeToggles.forEach((toggle) => {
        if (toggle !== this) {
            toggle.checked = this.checked;
        }
    });
}

darkmodeToggles.forEach((toggle) => {
    toggle.addEventListener("change", handleDarkmodeToggle);
});

