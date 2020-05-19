import axios from "axios";

const apiKey = "AIzaSyCfacTMg_IOhzvg5LV0ZXYShRDEA514klw";
const resultLimit = "10";

export default {
  // Gets books from the Google API
  getBooks: function(q) {
    return axios.get("api/google", { params: { q: "title:" + q } });
  },
  
  // Gets the saved books from the database (Library)
  getSavedBooks: function() {
    axios.get("/api/books");
  },
  
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },

  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};