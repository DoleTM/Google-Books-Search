import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import API from "./utils/API";

class App extends Component {
  // Declare the state
  state = {
    search: "title",
    title: "",
    jsonResult: {},
    saved: []
  }

  componentDidMount() {
    this.getBooks();
  }
 
  handleInputChange = (event) => {
    const userInput = event.target.value;
    return this.setState({ title: userInput });
  }

  // READ METHOD
  getBooks = () => {
    //const bookIds = res.data.map(book => book.bookIds);
    API.getLibrary()
      .then(res => {
        const bookIds = res.data.map(book => book.bookIds);
        return this.setState({ saved: res.data, bookIds: bookIds })
      }).catch(err => console.log(err));
  }

  // Use google books api to search books
  searchQuery = (event) => {
    event.preventDefault();
    API.searchBook(this.state.title)
      .then(res => {
        const bookIds = res.data.items.map(book => bookIds.book);
        this.setState({ jsonResult: res.data })
      }).catch(err => console.log(err));
  }

  // Saves books to the clients 'library'
  saveQuery = (event) => {
    event.preventDefault();
    const { title, author, description, img, bookid } = event.target.dataset;
    API.saveBook(title, author, description, img, bookid)
      .then(res => {
        this.getLibrary()
      }).catch(err => console.log(err));
  }

  // DELETE METHOD
  deleteBook = (event) => {
    event.preventDefault();
    const id = event.target.dataset.id;
    API.deleteBook(id)
      .then(res => {
        this.getBooks()
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Books} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/books/:id" component={Detail} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
