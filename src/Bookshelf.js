import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI'

class Bookshelf extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.update({}, this.props.shelfValue)
      .then((response) => {
        const bookIDs = response[this.props.shelfValue]
        this.setState(() => ({
          books: this.props.books.filter((book) => {
            return bookIDs.indexOf(book.id) !== -1
          })
        }))
      })
  }

  render() {
    console.log(this.props.books)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.books.map((book, key) => (
              <li key={key}>
                <Book
                  id={book.id}
                  title={book.title}
                  authors={book.authors}
                  backgroundImage={book.imageLinks.thumbnail}
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