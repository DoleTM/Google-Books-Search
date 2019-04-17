import axios from "axios";

const apiKey = "AIzaSyCfacTMg_IOhzvg5LV0ZXYShRDEA514klw";
const resultLimit = "10";

export default {
  // Gets the saved books from the database (Library)
  getLibrary: function() {
    axios.get("/api/books")
  },
  
  // Gets the book with the given id
  searchBook: function(title) {
    const joinTitle = title.split(" ").join("+");
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${joinTitle}+intitle&maxResults=${resultLimit}&key=${apiKey}`);
  },
  
  // Deletes the book with the given id
  deleteBook: function(id) {
    axios.delete(`/api/books/${id}`);
  },

  // Saves a book to the database
  saveBook: function(title, author, description, img_url, bookId) {
    const bookData = {
      title: title,
      author: author,
      description: description,
      img_url: img_url,
      bookId: bookId
    }
    return axios.post("/api/books", bookData);
  }
};