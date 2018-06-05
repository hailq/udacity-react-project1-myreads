import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {
  state = {
    query: '',
    books: []
  }

  searchWithCurrentQuery = (event) => {
    this.setState({query: event.target.value})
    if (this.state.query) {
      BooksAPI.search(this.state.query)
        .then((books) => {
          if (!books.error) {
            this.setState(() => ({
              books
            }))
          }
        })
    }
  }

  getShelfOfBook = (id) => {
    const shelves = this.props.shelves
    for (var shelf in shelves) {
      for (var i = 0; i < shelves[shelf].length; i++) {
        if (id === shelves[shelf][i].id) {
          console.log(shelves[shelf][i].title + " " + shelves[shelf][i].authors)
          return shelf
        }
      }
    }
    return 'none'
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a 
            className="close-search" 
            onClick={() => this.props.openOrCloseSearchPage()}
          >Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.searchWithCurrentQuery}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books && (
              this.state.books.map((book, index) => (
                <li key={index}>
                  <Book
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    backgroundImage={book.imageLinks.smallThumbnail}
                    shelf={this.getShelfOfBook(book.id)}
                    updateShelves={this.props.updateShelves}
                    updateState={this.props.updateState}
                  />
                </li>
              )
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage