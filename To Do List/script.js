//new note elements
let newNote = document.getElementById("add-item")
let newNoteButton= document.getElementById("add-item-button")

//icon elements
 let noteError= document.getElementsByClassName("empty-items")
 let  noNotes= document.getElementsByClassName("zero-notes")

 //todo list elements
let todoUl = document.getElementsByClassName('todo')
let todoLi = document.createElement('item-list')


newNoteButton.addEventListener('click', (e) => {
    e.preventDefault();

    // newNoteItem = ''


   
    todoLi.appendChild(document.createTextNode("Four"));
    todoUl.appendChild(todoLi);
 
    console.log(newNoteItem)
    console.log('hello there')
}
)
