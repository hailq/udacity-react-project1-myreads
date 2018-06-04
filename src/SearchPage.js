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

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a 
            className="close-search" 
            onClick={() => this.props.openOrCloseSearchPage()}
          >Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
                    updateShelves={this.props.updateShelves}
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