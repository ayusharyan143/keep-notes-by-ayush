

// Get references to the button and app elements
const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");




// Retrieve notes from localStorage and render them
getNotes().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);
});




// Function to create a new note element
function createNoteEl(id, content)
{
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;




  // Add event listener for double-click to delete a note
  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, element);
    }
  });




  // Add event listener for input to update a note
  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });



  return element;


}



// Function to delete a note
function deleteNote(id, element)
{

    // Filter out the note with the specified ID
  const notes = getNotes().filter((note) => note.id != id);

  // Save the updated notes to localStorage
  saveNote(notes);

  // Remove the note element from the DOM
  appEl.removeChild(element);


}



// Function to update a note
function updateNote(id, content)
{

    const notes = getNotes();

    // Find the note with the specified ID
  const target = notes.filter((note) => note.id == id)[0];

  // Update the content of the note
  target.content = content;

  // Save the updated notes to localStorage
  saveNote(notes);


}




// Function to add a new note
function addNote()
{
  const notes = getNotes();

  // Generate a random ID for the new note
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  
  // Create a new note element
  const noteEl = createNoteEl(noteObj.id, noteObj.content);


  // Insert the new note element before the button
  appEl.insertBefore(noteEl, btnEl);
  
  // Add the new note to the list of notes
  notes.push(noteObj);
  
  
  // Save the updated notes to localStorage
  saveNote(notes);


}



// Function to save notes to localStorage
function saveNote(notes)
{

  localStorage.setItem("note-app", JSON.stringify(notes));

}




// Function to retrieve notes from localStorage
function getNotes()
{

  return JSON.parse(localStorage.getItem("note-app") || "[]");

}




// Add event listener for button click to add a new note
btnEl.addEventListener("click", addNote);
