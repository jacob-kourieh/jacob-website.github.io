import translations from "./modules/translations.js";

//Navigation bar effects on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle('sticky', window.scrollY > 0);
});

//Responsive navigation sidebar menu
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const navigationItems = document.querySelectorAll(".navigation a")

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navigation.classList.toggle("active");
});

navigationItems.forEach((navigationItem) => {
  navigationItem.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navigation.classList.remove("active");
  });
});

//Scroll to top button
const scrollBtn = document.querySelector(".scrollToTop-btn");
window.addEventListener("scroll", function () {
  scrollBtn.classList.toggle("active", window.scrollY > 500);
});


//Scroll back to top on click scroll-to-top button
scrollBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});


//Reveal website elements on scroll
window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 50;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
}

//Multi Language
const btn = document.getElementById('button');
const form = document.getElementById('form');

//Function to get the current language
const getCurrentLanguage = () => localStorage.getItem("lang") || "en";

//Function to clear the input fields
const clearInputFields = () => {
  document.getElementById("from_name").value = "";
  document.getElementById("reply_to").value = "";
  document.getElementById("message").value = "";
};


form.addEventListener('submit', function (event) {
  event.preventDefault();

  const currentLanguage = getCurrentLanguage();
  btn.value = translations[currentLanguage].sending;

  const serviceID = 'default_service';
  const templateID = 'template_5cw4bqv';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = translations[currentLanguage].send;

      alert(translations[currentLanguage].sent);
      clearInputFields();
    })
    .catch((err) => {
      btn.value = translations[currentLanguage].send;
      alert(JSON.stringify(err));
    });
});


const languageSelector = document.querySelector("select");
languageSelector.addEventListener("change", (event) => {
  const selectedLanguage = event.target.value;
  localStorage.setItem("lang", selectedLanguage);
  setLanguage(selectedLanguage);
  clearInputFields();
});


const setLanguage = (language) => {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const translationKey = element.getAttribute("data-i18n");
    element.innerHTML = translations[language][translationKey];
  });


  document.getElementById("from_name").placeholder = translations[language].placeholderName;
  document.getElementById("reply_to").placeholder = translations[language].placeholderEmail;
  document.getElementById("message").placeholder = translations[language].placeholderMessage;
  document.getElementById("button").value = translations[language].send;
  document.body.classList.remove("hide-content");
};

// Get the language from the URL parameter, or use the stored language, or the default language
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const initialLanguage = getUrlParameter('lang') || getCurrentLanguage();
localStorage.setItem("lang", initialLanguage);
setLanguage(initialLanguage);
languageSelector.value = initialLanguage;


function updateQueryString(key, value) {
  const currentUrl = new URL(window.location.href);
  const urlSearchParams = new URLSearchParams(currentUrl.search);
  urlSearchParams.set(key, value);
  currentUrl.search = urlSearchParams.toString();

}

updateQueryString("lang", "en");


//The website created by © Jacob Kourieh. All rights reserved.

