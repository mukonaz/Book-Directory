const apiUrl = 'http://localhost:3000/books'; // The API URL

// DOM Elements
const bookList = document.getElementById('bookList');
const addBookForm = document.getElementById('addBookForm');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const publisherInput = document.getElementById('publisher');
const publishedDateInput = document.getElementById('publishedDate');
const isbnInput = document.getElementById('isbn');

// Fetch the list of books and display them
function fetchBooks() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      bookList.innerHTML = ''; // Clear current list
      data.forEach(book => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${book.title}</strong> by ${book.author} (ISBN: ${book.isbn})
          <button onclick="deleteBook('${book.isbn}')">Delete</button>
        `;
        bookList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching books:', error));
}

// Add a new book
addBookForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const newBook = {
    title: titleInput.value,
    author: authorInput.value,
    publisher: publisherInput.value,
    publishedDate: publishedDateInput.value,
    isbn: isbnInput.value
  };

  // Send POST request to add new book
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': 'your-api-key-here'  // Include the API key for authorization
    },
    body: JSON.stringify(newBook)
  })
    .then(response => response.json())
    .then(data => {
      // Clear the form and reload the book list
      addBookForm.reset();
      fetchBooks();
    })
    .catch(error => console.error('Error adding book:', error));
});

// Delete a book by ISBN
function deleteBook(isbn) {
  fetch(`${apiUrl}/${isbn}`, {
    method: 'DELETE',
    headers: {
      'api-key': 'your-api-key-here' // Include the API key for authorization
    }
  })
    .then(response => {
      if (response.ok) {
        fetchBooks(); // Refresh the book list after deletion
      } else {
        alert('Failed to delete the book');
      }
    })
    .catch(error => console.error('Error deleting book:', error));
}

// Initialize the app
fetchBooks();
