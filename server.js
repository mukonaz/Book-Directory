// Import Express
const express = require('express');
const app = express();

// Middleware to parse JSON data
app.use(express.json());
// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// GET all books
app.get('/books', (req, res) => {
    res.json(books);  // Send back the books array as JSON
  });
  
  // GET book by ISBN
app.get('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = books.find(b => b.isbn === isbn);
  
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
  
    res.json(book);
  });

  // POST a new book
  app.post('/books', (req, res) => {
    const { title, author, publisher, publishedDate, isbn } = req.body;
  
    // Validation for required fields
    if (!title || !author || !isbn) {
      return res.status(400).json({ message: 'Missing required fields: title, author, and isbn are required' });
    }
  
    // ISBN format validation (simple check for length)
    if (isbn.length !== 13) {
      return res.status(400).json({ message: 'Invalid ISBN format. ISBN must be 13 characters long.' });
    }
  
    // Published Date validation (basic check for date format)
    const isValidDate = Date.parse(publishedDate);
    if (isNaN(isValidDate)) {
      return res.status(400).json({ message: 'Invalid Published Date format. Use YYYY-MM-DD.' });
    }
  
    // Create the new book object
    const newBook = { title, author, publisher, publishedDate, isbn };
  
    // Add the new book to the books array
    books.push(newBook);
  
    // Send the new book back with a 201 Created status
    res.status(201).json(newBook);
  });
  

  // PUT to update a book by ISBN
  app.put('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const { title, author, publisher, publishedDate } = req.body;
  
    const bookIndex = books.findIndex(b => b.isbn === isbn);
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }
  
    // Validation for required fields
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required to update the book' });
    }
  
    // ISBN format validation (simple check for length)
    if (isbn.length !== 13) {
      return res.status(400).json({ message: 'Invalid ISBN format. ISBN must be 13 characters long.' });
    }
  
    // Published Date validation (basic check for date format)
    const isValidDate = Date.parse(publishedDate);
    if (isNaN(isValidDate)) {
      return res.status(400).json({ message: 'Invalid Published Date format. Use YYYY-MM-DD.' });
    }
  
    // Update the book details
    books[bookIndex] = { ...books[bookIndex], title, author, publisher, publishedDate };
  
    res.json(books[bookIndex]);
  });
  
  
  // DELETE a book by ISBN
app.delete('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const bookIndex = books.findIndex(b => b.isbn === isbn);
  
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }
  
    // Remove the book from the array
    books.splice(bookIndex, 1);
  
    res.status(204).send();  // No content
  });
  
  app.get('/books/:isbn', (req, res) => {
    try {
      const { isbn } = req.params;
      const book = books.find(b => b.isbn === isbn);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
// Define the port
const PORT = process.env.PORT || 3000;


  

// Basic endpoint for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Book Directory API');
});

let books = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publisher: "Charles Scribner's Sons",
      publishedDate: "1925-04-10",
      isbn: "9780743273565"
    },
    {
      title: "1984",
      author: "George Orwell",
      publisher: "Secker & Warburg",
      publishedDate: "1949-06-08",
      isbn: "9780451524935"
    }
  ];
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
