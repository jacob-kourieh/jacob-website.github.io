import translations from "./modules/translations.js";

let timerInterval;
let currentQuestionIndex = 0;
let score = 0;

const quizArrowBtn = document.getElementById("quizArrowBtn");
const quizDropdownContainer = document.getElementById("quizDropdownContainer");
const startQuizBtn = document.getElementById("startQuizBtn");
const quizContainer = document.getElementById("quizContainer");
const quizCategory = document.getElementById("quizCategory");
const timerDisplay = document.createElement('div');
const scoreDisplay = document.createElement('div');

function toggleQuizDropdown() {
    if (quizDropdownContainer.style.display === "none") {
        quizDropdownContainer.style.display = "block";
        quizArrowBtn.src = "/images/up-arrow.svg";
        quizContainer.style.display = "none";
    } else {
        quizDropdownContainer.style.display = "none";
        quizArrowBtn.src = "/images/down-arrow.svg";
    }
}

quizArrowBtn.addEventListener("click", () => {
    toggleQuizDropdown();
    if (quizDropdownContainer.style.display === "none") {
        resetQuiz();
        removeTimerAndScoreDisplay();
        stopAndResetTimer();
    }
});

startQuizBtn.addEventListener("click", () => {
    startQuiz();
});

function resetQuiz() {
    quizContainer.innerHTML = "";
    startQuizBtn.style.display = "inline-block";
    document.getElementById("categoryLabel").style.display = "inline";
    quizCategory.style.display = "inline";
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = "none";
    stopAndResetTimer();
}


async function fetchQuestions() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
}


function getLanguageCode(lang) {
    const languageCodes = {
        en: "eng",
        sv: "swe",
        es: "spa",
    };

    return languageCodes[lang] || "eng";
}


function generateQuizQuestions(countries, category, language) {
    const langCode = getLanguageCode(language);

    countries.sort(() => Math.random() - 0.5);

    const questions = countries.map((country, index) => {
        const alternatives = countries
            .map((_, i) => i)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);

        if (!alternatives.includes(index)) {
            alternatives.pop();
            alternatives.push(index);
        }

        alternatives.sort(() => Math.random() - 0.5);

        const translatedCountryName = country.translations[langCode]
            ? country.translations[langCode].common
            : country.name.common;

        const styledCountryName = `<span class="country-name">${translatedCountryName}</span>`;

        if (category === "flags") {
            return {
                question: `${translate("questionCountries", language)} ${styledCountryName}?`,
                alternatives: alternatives.map((i) => ({
                    flag: countries[i].flags.png,
                    countryName: countries[i].translations[langCode]
                        ? countries[i].translations[langCode].common
                        : countries[i].name.common,
                })),
                correctAnswer: country.flags.png,
            };
        } else if (category === "capitals") {
            return {
                question: `${translate("questionFlags", language)} ${styledCountryName}?`,
                alternatives: alternatives.map((i) =>
                    countries[i].capital && countries[i].capital.length
                        ? countries[i].capital[0]
                        : "N/A"
                ),
                correctAnswer: country.capital && country.capital.length
                    ? country.capital[0]
                    : "N/A",
            };
        }
    });

    return questions.slice(0, 10);
}

const languageSelector = document.getElementById("format");

// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }

async function startQuiz() {
    const selectedLanguage = languageSelector.value;
    startQuizBtn.style.display = "none";
    quizContainer.style.display = "block";
    document.getElementById("categoryLabel").style.display = "none";
    quizCategory.style.display = "none";


    const countries = await fetchQuestions();
    const questions = await generateQuizQuestions(countries, quizCategory.value, selectedLanguage);

    const startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        timerDisplay.innerText = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);

    displayQuestion(questions[currentQuestionIndex], questions);
}


function translate(key, language) {
    language = language || getCurrentLanguage();
    return translations[language][key] || translations["en"][key];
}


function showResults() {
    const selectedLanguage = localStorage.getItem("lang") || "en";
    clearInterval(timerInterval);

    let emoji;
    if (score * 5 == 0) {
        emoji = "😭";
    } else if (score * 5 > 0 && score * 5 <= 15) {
        emoji = "☹️";
    } else if (score * 5 > 15 && score * 5 <= 30) {
        emoji = "🙂";
    } else if (score * 5 > 30 && score * 5 < 50) {
        emoji = "😃";
    } else if (score * 5 == 50) {
        emoji = "🤩";
    }

    const elapsedTime = document.getElementById("timerDisplay").innerText;
    stopAndResetTimer();
    quizContainer.innerHTML = `
    <h2>${translate("quizResults", selectedLanguage)}</h2>
    <div style="font-size: 100px;">${emoji}</div>
    <p>${translate("yourScore", selectedLanguage)}: ${score * 5} ${translate("outOf", selectedLanguage)} ${currentQuestionIndex * 5}</p>
    <p>${translate("timeElapsed", selectedLanguage)}: ${elapsedTime}</p>
    <button id="restartQuizBtn">${translate("restartQuiz", selectedLanguage)}</button>
    <button id="finishQuizResultsBtn">${translate("finishQuiz", selectedLanguage)}</button>
    `;

    const restartQuizBtn = document.getElementById("restartQuizBtn");
    restartQuizBtn.addEventListener("click", async () => {
        currentQuestionIndex = 0;
        score = 0;
        removeTimerAndScoreDisplay();
        startQuiz();
    });

    const finishQuizResultsBtn = document.getElementById("finishQuizResultsBtn");
    finishQuizResultsBtn.addEventListener("click", () => {
        resetQuiz();
        removeTimerAndScoreDisplay();
    });
}


function removeTimerAndScoreDisplay() {
    if (timerDisplay.parentNode === quizContainer) {
        quizContainer.removeChild(timerDisplay);
    }
    if (scoreDisplay.parentNode === quizContainer) {
        quizContainer.removeChild(scoreDisplay);
    }
}

function stopAndResetTimer() {
    clearInterval(timerInterval);
    timerDisplay.innerText = "0:00";
}


function displayQuestion(currentQuestion, questions) {
    scoreDisplay.innerText = `Score: ${score * 5}`;
    if (!currentQuestion) {
        console.error('Invalid current question');
        return;
    }
    const selectedLanguage = localStorage.getItem("lang") || "en";
    let answersHTML = "";
    for (let i = 0; i < currentQuestion.alternatives.length; i++) {
        if (quizCategory.options[quizCategory.selectedIndex].value === "flags") {
            answersHTML += `<li>
                            <input type="radio" name="answer" id="answer${i}" value="${currentQuestion.alternatives[i].flag}">
                            <label for="answer${i}">
                              <img src="${currentQuestion.alternatives[i].flag}" class="flag">
                            </label>
                          </li>`;
        } else if (quizCategory.options[quizCategory.selectedIndex].value === "capitals") {
            answersHTML += `<li>
                            <input type="radio" name="answer" id="answer${i}" value="${currentQuestion.alternatives[i]}">
                            <label for="answer${i}">
                              <span class="capital">${currentQuestion.alternatives[i]}</span>
                            </label>
                          </li>`;
        }
    }

    quizContainer.innerHTML = `
    <h2>${currentQuestion.question}</h2>
    <ul>
      ${answersHTML}
    </ul>
    <button id="submitAnswerBtn">${translate("submit", selectedLanguage)}</button>
    <button id="finishQuizBtn">${translate("finishQuiz", selectedLanguage)}</button>
  `;

    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add('bottom-container');
    quizContainer.appendChild(bottomContainer);

    const madeBy = document.createElement('span');
    madeBy.classList.add('made-by');
    madeBy.innerText = 'Made By Jacob';
    bottomContainer.appendChild(madeBy);

    const timerScoreContainer = document.createElement('div');
    timerScoreContainer.classList.add('timer-score-container');
    bottomContainer.appendChild(timerScoreContainer);

    timerDisplay.id = "timerDisplay";
    timerScoreContainer.appendChild(timerDisplay);
    scoreDisplay.id = "scoreDisplay";
    timerScoreContainer.appendChild(scoreDisplay);

    const submitAnswerBtn = document.getElementById("submitAnswerBtn");
    submitAnswerBtn.addEventListener("click", () => {
        submitAnswerBtn.disabled = true;
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        const flagImages = document.querySelectorAll('.flag');
        const capitalSpans = document.querySelectorAll('.capital');

        if (selectedAnswer) {
            if (quizCategory.options[quizCategory.selectedIndex].value === "flags") {
                for (let i = 0; i < flagImages.length; i++) {
                    const img = flagImages[i];
                    const answerValue = img.getAttribute("src");

                    if (answerValue === selectedAnswer.value) {
                        img.style.border = '8px solid red';
                    }

                    if (answerValue === currentQuestion.correctAnswer) {
                        img.style.border = '8px solid green';
                    }
                }
            } else if (quizCategory.options[quizCategory.selectedIndex].value === "capitals") {
                for (let i = 0; i < capitalSpans.length; i++) {
                    const span = capitalSpans[i];
                    const answerValue = span.textContent;

                    if (answerValue === selectedAnswer.value) {
                        span.style.background = 'red';

                    }

                    if (answerValue === currentQuestion.correctAnswer) {
                        span.style.background = 'green';
                    }
                }
            }

            if (selectedAnswer.value === currentQuestion.correctAnswer) {
                score++;
            }

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    submitAnswerBtn.disabled = false;
                    displayQuestion(questions[currentQuestionIndex], questions);
                } else {
                    showResults();
                }
            }, 1000);
        } else {
            submitAnswerBtn.disabled = false;
        }
    });

    const finishQuizBtn = document.getElementById("finishQuizBtn");
    finishQuizBtn.addEventListener("click", () => {
        resetQuiz();
        removeTimerAndScoreDisplay();
    });
}

//Made by Jacob Kourieh