// Automatically enable dark mode during sunset and normal mode during sunrise based on the user's location.

function activateDarkMode() {
    document.body.classList.add('darkmode');
}

function deactivateDarkMode() {
    document.body.classList.remove('darkmode');
}

async function setDarkModeBySunriseSunset(latitude, longitude) {
    const currentDate = new Date();
    const cacheKey = `sunriseSunsetCache-${latitude}-${longitude}`;
    let sunriseTimestamp, sunsetTimestamp;

    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        const cache = JSON.parse(cachedData);
        sunriseTimestamp = new Date(cache.sunriseTimestamp);
        sunsetTimestamp = new Date(cache.sunsetTimestamp);
    } else {
        const times = await fetchSunriseSunsetTime(latitude, longitude);
        sunriseTimestamp = times.sunriseTimestamp;
        sunsetTimestamp = times.sunsetTimestamp;

        localStorage.setItem(cacheKey, JSON.stringify({
            sunriseTimestamp: sunriseTimestamp.toISOString(),
            sunsetTimestamp: sunsetTimestamp.toISOString()
        }));
    }

    if (currentDate > sunsetTimestamp || currentDate < sunriseTimestamp) {
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

function applyInitialDarkMode() {
    const hours = new Date().getHours();
    const isNightTime = hours < 6 || hours >= 21;

    if (isNightTime) {
        requestAnimationFrame(() => {
            activateDarkMode();
            darkModeToggles.forEach((toggle) => {
                toggle.checked = true;
            });
        });
    } else {
        requestAnimationFrame(() => {
            deactivateDarkMode();
            darkModeToggles.forEach((toggle) => {
                toggle.checked = false;
            });
        });
    }
}

applyInitialDarkMode();


async function fetchSunriseSunsetTime(latitude, longitude) {
    const response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today&formatted=0`

    );

    const data = await response.json();

    const sunriseTimestamp = new Date(data.results.sunrise);
    const sunsetTimestamp = new Date(data.results.sunset);

    return { sunriseTimestamp, sunsetTimestamp };

}


async function fetchIpAddress() {
    const response = await fetch("https://api.ipify.org/?format=json");
    const data = await response.json();
    return data.ip;
}

async function fetchLocationByIp(ipAddress) {
    const response = await fetch(``);
    const data = await response.json();
    return {
        latitude: data.latitude,
        longitude: data.longitude,
    };
};


fetchIpAddress()
    .then(fetchLocationByIp)
    .then(async (location) => {
        const { latitude, longitude } = location;
        await setDarkModeBySunriseSunset(latitude, longitude);
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
