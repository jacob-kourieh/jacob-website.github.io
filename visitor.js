// const visitorTotal = document.getElementById("visitor-total");
// const visitorTotalWrapper = document.getElementById("visitor-total-wrapper");

// async function getVisitorIPInfo() {
//     try {
//         const response = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=05c4ab68beed48fa9e37b6797efe30ab");
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(error);
//     }
// }


// async function saveVisitorCount(countryCode) {
//     try {
//         const response = await fetch("http://localhost:5000/api/saveVisitorCounts", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ countryCode }),
//         });

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function fetchVisitorCounts() {
//     try {
//         const response = await fetch("http://localhost:5000/api/getVisitorCounts");
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function fetchAllCountries() {
//     try {
//         const response = await fetch("https://restcountries.com/v3.1/all");
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function updateVisitorCount() {
//     const ipInfo = await getVisitorIPInfo();

//     const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');

//     if (!hasVisitedBefore) {
//         await saveVisitorCount(ipInfo.country_code2);
//         localStorage.setItem('hasVisitedBefore', 'true');
//     }


//     const visitorCounts = await fetchVisitorCounts();
//     const allCountries = await fetchAllCountries();

//     visitorTotal.textContent = visitorCounts.total;
//     displayTopCountries(visitorCounts, allCountries);
// }


// function displayTopCountries(visitorCounts, allCountries) {
//     const topCountriesList = document.getElementById("top-countries");

//     while (topCountriesList.firstChild) {
//         topCountriesList.removeChild(topCountriesList.firstChild);
//     }

//     const countryCounts = Object.entries(visitorCounts)
//         .filter(([key]) => key !== "total")
//         .sort((a, b) => b[1] - a[1]);

//     for (const [countryCode, count] of countryCounts) {
//         const country = allCountries.find(c => c.cca2 === countryCode);
//         const listItem = document.createElement("li");
//         if (country) {
//             const flagImage = document.createElement("img");
//             flagImage.src = country.flags.png;
//             flagImage.alt = `${country.name.common} flag`;
//             flagImage.width = 30;
//             flagImage.height = 30;
//             flagImage.style.borderRadius = "50%";

//             listItem.appendChild(flagImage);
//             listItem.append(`  ${count}`);
//         } else {
//             listItem.textContent = `${countryCode}: ${count}`;
//         }
//         topCountriesList.appendChild(listItem);
//     }
// }

// function animateCounting(element, targetCount) {
//     let currentCount = 0;
//     const step = Math.ceil(targetCount / 100);

//     const updateCount = () => {
//         currentCount += step;
//         if (currentCount >= targetCount) {
//             element.textContent = targetCount;
//             return;
//         }

//         element.textContent = currentCount;
//         requestAnimationFrame(updateCount);
//     };

//     updateCount();
// }

// const observer = new IntersectionObserver(
//     (entries) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 animateCounting(visitorTotal, parseInt(visitorTotal.textContent));
//             }
//         });
//     },
//     { threshold: 0.5 }
// );

// observer.observe(visitorTotalWrapper);

// updateVisitorCount();

// let isCountryListVisible = false;

// function toggleCountryList() {
//     const chevronIcon = document.querySelector(".chevron-icon path");
//     const countryList = document.getElementById("country-list");
//     const contentWrapper = document.querySelector(".visitor-container");

//     if (isCountryListVisible) {
//         chevronIcon.setAttribute("d", "M4.5 15.75l7.5-7.5 7.5 7.5");
//         countryList.style.display = "none";
//         contentWrapper.style.bottom = "0";
//     } else {
//         chevronIcon.setAttribute("d", "M19.5 8.25l-7.5 7.5-7.5-7.5");
//         countryList.style.display = "block";
//         contentWrapper.style.bottom = "100%";
//     }

//     isCountryListVisible = !isCountryListVisible;
// }
