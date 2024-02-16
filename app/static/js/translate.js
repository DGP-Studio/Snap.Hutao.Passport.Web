// translate.js

let languageDict = {};

document.addEventListener('DOMContentLoaded', function () {
  loadLanguageDictionary(function (dict) {
    languageDict = dict;
    setLanguage(getLanguage());
  });

  function loadLanguageDictionary(callback) {
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', 'assets/language.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.send(null);
  }

  function getLanguage() {
    const userLanguage = navigator.language || navigator.userLanguage;
    return userLanguage.toLowerCase();
  }
})

function setLanguage(language) {
  const loginTitle = document.getElementById('login-title');
  const emailLabel = document.getElementById('email-label');
  const passwordLabel = document.getElementById('password-label');
  const loginButton = document.getElementById('login-button');

  if (languageDict.hasOwnProperty(language)) {
    const languageData = languageDict[language];
    loginTitle.textContent = languageData.loginTitle;
    emailLabel.textContent = languageData.emailLabel;
    passwordLabel.textContent = languageData.passwordLabel;
    loginButton.textContent = languageData.loginButton;
  } else {
    // Fallback to default language (English)
    const defaultLanguageData = languageDict['en'];
    loginTitle.textContent = defaultLanguageData.loginTitle;
    emailLabel.textContent = defaultLanguageData.emailLabel;
    passwordLabel.textContent = defaultLanguageData.passwordLabel;
    loginButton.textContent = defaultLanguageData.loginButton;
  }
}
