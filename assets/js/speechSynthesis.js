try {
  if (
    typeof speechSynthesis !== "undefined" &&
    speechSynthesis.onvoiceschanged !== undefined
  ) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
} catch (e) {
  document.getElementById("no-browser-support").css.display = "block";
  document.getElementsByClassName("app").css.display = "none";
}

function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  window.voices = speechSynthesis.getVoices();

  for (var i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += "";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();

function readOutLoud(message) {
  var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
  speech.text = message;
  speech.volume = 1;
  speech.rate = 0.8;
  speech.pitch = 3;

  var selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      speech.voice = voices[i];
      break;
    }
  }

  window.speechSynthesis.speak(speech);
}
