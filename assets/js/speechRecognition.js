try {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  window.recognition = new SpeechRecognition();
} catch (e) {
  document.getElementById("no-browser-support").style.display = "block";
  document.getElementById("app").style.display = "none";
}
window.notesList = document.getElementById("notes");
var noteTextarea = document.getElementById("note-textarea");
var instructions = document.getElementById("recording-instructions");

var noteContent = "";

recognition.continuous = true;

recognition.onresult = function (event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  var mobileRepeatBug =
    current == 1 && transcript == event.results[0][0].transcript;

  if (!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.value = noteContent;
  }
};

recognition.onstart = function () {
  instructions.innerText =
    "Reconhecimento de voz ativado. Tente falar no microfone.";
};

recognition.onspeechend = function () {
  instructions.innerText;
  ("Você ficou inativo por um tempo, então o reconhecimento de voz foi encerrado.");
};

recognition.onerror = function (event) {
  if (event.error == "no-speech") {
    instructions.innerText = "Nenhuma fala foi detectada. Tente novamente.";
  }
};

document
  .getElementById("start-record-btn")
  .addEventListener("click", function (e) {
    if (noteContent.length) {
      noteContent += " ";
    }
    recognition.start();
  });

document
  .getElementById("pause-record-btn")
  .addEventListener("click", function (e) {
    recognition.stop();
    instructions.innerText = "Reconhecimento de voz pausado.";
  });

notesList.addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    var target = e.target;
    if (target.classList.contains("listen-note")) {
      var content = target
        .closest(".note")
        .getElementsByClassName("content")[0].innerText;
      readOutLoud(content);
    }

    if (target.classList.contains("delete-note")) {
      var dateTime = target
        .closest(".note")
        .getElementsByClassName("date")[0].innerText;
      deleteNote(dateTime);
      target.closest(".note").remove();
    }
  },
  false
);
