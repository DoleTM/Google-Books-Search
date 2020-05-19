import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import Form from "../components/Form";
import Jumbotron from "../components/Jumbotron";
import Book from "../components/Book";
import Card from "../components/Card";
import Footer from "../components/Footer";
import API from "../utils/API";

class Home extends Component {
  state = {
    book: {}
  };
  
    // Declare the state
    state = {
      books: "",
      q: ""
    }
   
    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
  
    // READ METHOD
    getBooks = () => {
      //const bookIds = res.data.map(book => book.bookIds);
      API.getBooks(this.state.q)
      .then(res => this.setState({ books: res.data }))
      .catch(() => this.setState({ books: [], message: "No Books Found"}));
    };

    handleFormSubmit = event => {
      event.preventDefault();
      this.getBooks();
    };

    handleBookSave = id => {
      const book = this.state.book.find(book => book.id === id);
      API.saveBook({
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors,
        synopsis: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks,
        googleId: book.id
      }).then(() => this.getBooks());
    }

    render() {
      return (
        <Container>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1 className="text-center">
                  <strong>(React) Google Books Search</strong>
                </h1>
                <h2 className="text-center">Search for and Save Books of Interest.</h2>
              </Jumbotron>
            </Col>
            <Col size="md-12">
              <Card title="Book Search" icon="far fa-book">
                <Form
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  q={this.state.q}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <Card title="Results">
                {this.state.books.length ? (
                  <List>
                    {this.state.books.map(book => (
                      <Book
                        key={book.id}
                        title={book.volumeInfo.title}
                        subtitle={book.volumeInfo.subtitle}
                        link={book.volumeInfo.infoLink}
                        authors={book.volumeInfo.authors.join(", ")}
                        description={book.volumeInfo.description}
                        image={book.volumeInfo.imageLinks.thumbnail}
                        Button={() => (
                          <button
                            onClick={() => this.handleBookSave(book.id)}
                            className="btn btn-primary ml-2"
                          >
                            Save
                          </button>
                        )}
                      />
                    ))}
                  </List>
                ) : (
                  <h2 className="text-center">{this.state.message}</h2>
                )}
              </Card>
            </Col>
          </Row>
          <Footer />
        </Container>
      );
    }
  }

export default Home;
