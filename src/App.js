import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'

import BookList from './BookList'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    this.updateState()
  }

  updateShelves = (shelfName, value) => {
    this.setState((prevState) => ({
      shelves: {
        ...prevState.shelves,
        [shelfName]: value
      }
    }))
  }

  updateState = () => {
    BooksAPI.getAll()
      .then((response) => {
        this.setState(() => ({
          books: response
        }))
      })
  }

  openOrCloseSearchPage = () => {
    this.setState((prevState) => ({ 
      showSearchPage: !prevState.showSearchPage }))
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? 
          <SearchPage
            shelves={this.state.shelves}
            updateState={this.updateState}
            updateShelves={this.updateShelves}
            openOrCloseSearchPage={this.openOrCloseSearchPage}
          />
        : 
          <BookList
            books={this.state.books}
            updateState={this.updateState}
            openOrCloseSearchPage={this.openOrCloseSearchPage}
            shelves={this.state.shelves}  
            updateShelves={this.updateShelves}
          />
        }
      </div>
    )
  }
}

export default BooksApp
