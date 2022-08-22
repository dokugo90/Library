
const close = document.querySelector('.close') // Close button
const add = document.querySelector('.add') // New book button
const formbody = document.querySelector('#wrap') // Popup Form
const form = document.querySelector('#form') // The actual Form
const bookshelf = document.querySelector('.bookshelf') // New Book 
const overlay = document.querySelector('.overlay') // Overlay
const library = document.querySelector('.library') // Library heading text
const contain = document.querySelector('.container') // Example Book
let books = JSON.parse(localStorage.getItem("books")) || [];
let formOpen = false
// Styling 

class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  }
  
  function formOpenOrClosed() {
    if (formOpen) {
      formbody.style.transform = "scale(0)";
      add.style.transform = "rotate(0)";
      form.reset();
      overlay.style.opacity = 0;
      formOpen = false;
    } else {
        formbody.style.display = "grid"
      formbody.style.transform = "scale(1)";
      add.style.transform = "rotate(45deg)";
      overlay.style.opacity = 1;
      formOpen = true;
    }
  }
  
  // close modal
  function closeModal() {
    formbody.style.transform = "scale(0)";
    overlay.style.opacity = 0;
    add.style.transform = "rotate(0)";
    form.reset();
    formOpen = false;
  }
  
  function addBook(i) {
    let bookNode = document.createElement("div");
    bookNode.classList.add("book");
    bookNode.setAttribute("data-index", `${i}`);
  
    const title = document.getElementById("userTitle").value;
    let titleNode = document.createElement("h2");
    titleNode.innerHTML = `Title: ${title}`;
    
    const author = document.getElementById("userAuthor").value;
    let authorNode = document.createElement("h3");
    authorNode.innerHTML = `Author: ${author}`;
  
    const pages = document.getElementById("pages").value;
    let pageNode = document.createElement("h3");
    pageNode.innerHTML = `Pages: ${pages}`;
  
    const read = document.getElementById("read").value;
    let readNode = document.createElement("h3");
    readNode.innerHTML = `Read? ${read}${read === "Yes" ? "😃" : "😢"}`;
  
    let updateNode = document.createElement("button");
    updateNode.classList = "update";
    updateNode.innerHTML = `Update <i class="fas fa-pen"></i>`;
  
    let trashNode = document.createElement("button");
    trashNode.classList = "clear";
    trashNode.innerHTML = `Delete <i class="fas fa-trash-alt">`;
  
    const book = new Book(title, author, pages, read);
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pageNode);
    bookNode.appendChild(readNode);
    bookNode.appendChild(updateNode);
    bookNode.appendChild(trashNode);
    bookshelf.appendChild(bookNode);
    formOpenOrClosed();
    form.reset();
  
    // update book status
    updateNode.addEventListener("click", () => {
      if (readNode.innerHTML === "Read? No😢") {
        readNode.innerHTML = "Read? Yes😃";
        book.read = "Yes";
        localStorage.setItem("books", JSON.stringify(books));
      } else {
        readNode.innerHTML = "Read? No😢";
        book.read = "No";
        localStorage.setItem("books", JSON.stringify(books));
      }
    });
    // delete book
    trashNode.addEventListener("click", () => {
      bookshelf.removeChild(bookNode);
      books.splice(bookNode, 1);
      localStorage.setItem("books", JSON.stringify(books));
    });
  }
  
  function getBooks() {
    books.forEach(function (book, i) {
      let bookNode = document.createElement("div");
      bookNode.classList.add("book");
      bookNode.setAttribute("data-index", `${i}`);
  
      const title = document.getElementById("userTitle").value;
      let titleNode = document.createElement("h2");
      titleNode.innerHTML = `Title: ${book.title}`;
  
      const author = document.getElementById("userAuthor").value;
      let authorNode = document.createElement("h3");
      authorNode.innerHTML = `Author: ${book.author}`;
  
      const pages = document.getElementById("pages").value;
      let pageNode = document.createElement("h3");
      pageNode.innerHTML = `Pages: ${book.pages}`;
  
      const read = document.getElementById("read").value;
      let readNode = document.createElement("h3");
      readNode.innerHTML = `Read? ${book.read}${
        book.read === "Yes" ? "😃" : "😢"
      }`;
  
      let updateNode = document.createElement("button");
      updateNode.classList = "update";
      updateNode.innerHTML = `Update <i class="fas fa-pen"></i>`;
  
      let trashNode = document.createElement("button");
      trashNode.classList = "clear";
      trashNode.innerHTML = `Delete <i class="fas fa-trash-alt">`;
  
      bookNode.appendChild(titleNode);
      bookNode.appendChild(authorNode);
      bookNode.appendChild(pageNode);
      bookNode.appendChild(readNode);
      bookNode.appendChild(updateNode);
      bookNode.appendChild(trashNode);
      bookshelf.appendChild(bookNode);
  
      // update book status
      updateNode.addEventListener("click", () => {
        if (readNode.innerHTML === "Read? No😢") {
          readNode.innerHTML = "Read? Yes😃";
          book.read = "Yes";
          localStorage.setItem("books", JSON.stringify(books));
        } else {
          readNode.innerHTML = "Read? No😢";
          book.read = "No";
          localStorage.setItem("books", JSON.stringify(books));
        }
      });
      // delete book
      trashNode.addEventListener("click", () => {
        bookshelf.removeChild(bookNode);
        books.splice(bookNode, 1);
        localStorage.setItem("books", JSON.stringify(books));
      });
    });
  }
  
  window.addEventListener("load", getBooks);
  add.addEventListener("click", formOpenOrClosed);
  close.addEventListener("click", closeModal);
  form.addEventListener("submit", (e, i) => {
    e.preventDefault();
    addBook(i);
  });