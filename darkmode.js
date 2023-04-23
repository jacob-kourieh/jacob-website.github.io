// Automatically enable dark mode during sunset and normal mode during sunrise based on the user's location.

function activateDarkMode() {
    document.body.classList.add('darkmode');
}

function deactivateDarkMode() {
    document.body.classList.remove('darkmode');
}

function setDarkModeBySunset(latitude, longitude) {
    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset() / 60;
    const dayOfYear = getCurrentDayOfYear(currentDate);
    const sunsetTimestamp = calculateSunsetTime(latitude, longitude, timezoneOffset, dayOfYear);

    if (currentDate > sunsetTimestamp) {
        activateDarkMode();
        darkModeToggles.forEach((toggle) => {
            toggle.checked = true;
        });
        localStorage.setItem("darkmode", true);
    } else {
        deactivateDarkMode();
        darkModeToggles.forEach((toggle) => {
            toggle.checked = false;
        });
        localStorage.setItem("darkmode", false);
    }
}

function getCurrentDayOfYear(date) {
    const yearStart = new Date(date.getFullYear(), 0, 0);
    const difference = date - yearStart;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(difference / oneDay);
}

function calculateSunsetTime(latitude, longitude, timezoneOffset, dayOfYear) {
    const gamma = -0.10471975512;
    const dayAngle = 0.01720212481 * dayOfYear - 1.73324438;
    const solarNoon = 12 + (longitude / 15) - timezoneOffset;
    const solarTime = solarNoon + (gamma * Math.sin(dayAngle));
    const solarDeclination = 0.40910517667 * Math.sin(dayAngle - 1.40524108);
    const hourAngle = Math.acos(-Math.tan(latitude) * Math.tan(solarDeclination));
    const sunsetTime = solarTime + (4 * hourAngle / 60);

    return new Date().setHours(sunsetTime, 0, 0, 0);
}

async function fetchIpAddress() {
    const response = await fetch("https://api.ipify.org/?format=json");
    const data = await response.json();
    return data.ip;
}

async function fetchLocationByIp(ipAddress) {
    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
    const data = await response.json();
    return {
        latitude: data.latitude,
        longitude: data.longitude,
    };
}

fetchIpAddress()
    .then(fetchLocationByIp)
    .then((location) => {
        setDarkModeBySunset(location.latitude, location.longitude);
    });

const darkModeToggles = document.querySelectorAll(".darkmode-toggle");

function toggleDarkMode() {
    if (this.checked) {
        activateDarkMode();
        localStorage.setItem("darkmode", true);
    } else {
        deactivateDarkMode();
        localStorage.setItem("darkmode", false);
    }

    darkModeToggles.forEach((toggle) => {
        if (toggle !== this) {
            toggle.checked = this.checked;
        }
    });
}

darkModeToggles.forEach((toggle) => {
    toggle.addEventListener("change", toggleDarkMode);
});