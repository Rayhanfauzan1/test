document.addEventListener('DOMContentLoaded', function () {
    const notesList = document.getElementById('notes-list');
    const addNoteBtn = document.getElementById('add-note-btn');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
  
    // Halaman Utama - Load notes
    if (notesList) {
      loadNotes();
      addNoteBtn.addEventListener('click', function () {
        const noteName = prompt('Masukkan nama catatan baru:');
        if (noteName) {
          createNoteElement(noteName);
          saveNoteName(noteName);
        }
      });
    }
  
    // Halaman Detail - Load note details
    if (noteContent) {
      const noteName = localStorage.getItem('currentNote');
      if (noteName) {
        noteTitle.textContent = noteName;
        noteContent.value = localStorage.getItem(noteName) || '';
      }
    }
  
    // Fungsi untuk menyimpan catatan di halaman detail
    window.saveNote = function () {
      const currentNote = localStorage.getItem('currentNote');
      if (currentNote) {
        localStorage.setItem(currentNote, noteContent.value);
        alert('Catatan disimpan!');
      }
    };
  
    // Fungsi untuk kembali ke halaman utama
    window.goBack = function () {
      window.location.href = 'index.html';
    };
  
    // Load daftar catatan dari localStorage
    function loadNotes() {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.forEach(note => {
        createNoteElement(note);
      });
    }
  
    // Simpan nama catatan baru ke localStorage
    function saveNoteName(name) {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      if (!notes.includes(name)) {
        notes.push(name);
        localStorage.setItem('notes', JSON.stringify(notes));
      }
    }
  
    // Buat elemen catatan baru di halaman utama
    function createNoteElement(name) {
      const listItem = document.createElement('li');
      listItem.textContent = name;
      listItem.classList.add('note-item');
      listItem.addEventListener('click', function () {
        localStorage.setItem('currentNote', name);
        window.location.href = 'detail.html';
      });
      notesList.appendChild(listItem);
    }
  });
  