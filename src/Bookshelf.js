import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI'

class Bookshelf extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    const books = this.props.books
    console.log(books)
    for (var i = 0; i < books.length; i++) {
      BooksAPI.get(books[i])
        .then((response) => {
          console.log('response', response)
          this.setState((prevState) => ({
            books: [...prevState.books, response]
          }))
        })
    }
  }

  render() {
    console.log(this.props.books)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book, key) => (
              <li key={key}>
                <Book
                  id={book.id}
                  title={book.title}
                  authors={book.authors}
                  backgroundImage={book.imageLinks}
                  updateShelves={this.props.updateShelves}
                />
              </li>
            ))

            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf