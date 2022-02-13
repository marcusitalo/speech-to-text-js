var notes = getAllNotes();
renderNotes(notes);

document
  .getElementById("save-note-btn")
  .addEventListener("click", function (e) {
    recognition.stop();

    if (!noteTextarea.value.length) {
      instructions.innerText =
        "Não foi possível salvar a anotações vazia. Por favor, adicione uma mensagem à sua anotação.";
    } else {
      saveNote(new Date().toLocaleString(), noteTextarea.value);

      noteContent = "";
      renderNotes(getAllNotes());
      noteTextarea.value = "";
      instructions.innerText = "Anotação salva com sucesso.";
    }
  });

function renderNotes(notes) {
  var html = "";
  if (notes.length) {
    notes.forEach(function (note) {
      html += `<li class="note">
        <p class="header">
          <span class="date">${note.date}</span>
          <a href="#" ><i class="fas fa-play listen-note" title="Ouvir anotação"></i></a>
          <a href="#" ><i class="fas fa-trash-alt delete-note" title="Apagar anotação"></i></a>
        </p>
        <p class="content">${note.content}</p>
      </li>`;
    });
  } else {
    html = '<li><p class="content">Você ainda não tem anotações.</p></li>';
  }
  notesList.innerHTML = html;
}

function saveNote(dateTime, content) {
  localStorage.setItem("note-" + dateTime, content);
}

function getAllNotes() {
  var notes = [];
  var key;
  for (var i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);

    if (key.substring(0, 5) == "note-") {
      notes.push({
        date: key.replace("note-", ""),
        content: localStorage.getItem(localStorage.key(i)),
      });
    }
  }
  return notes;
}

function deleteNote(dateTime) {
  localStorage.removeItem("note-" + dateTime);
}
