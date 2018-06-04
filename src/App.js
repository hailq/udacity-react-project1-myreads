import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'

import BookList from './BookList'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
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

  updateShelves = (event) => {
    const selectedValue = event.target.value
    console.log(selectedValue)
    console.log(this.props.id)
    BooksAPI.update({id: this.props.id}, selectedValue)
      .then((response) => {
        console.log(response)
        this.setState(() => ({
          shelves: response
        }))
      })
  }

  updateState = () => {
    BooksAPI.getAll()
      .then((response) => {
        this.setState(() => ({
          books: response
        }))
        console.log('this.state.books', this.state.books)
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
            updateShelves={this.updateState}
            openOrCloseSearchPage={this.openOrCloseSearchPage}
          />
        : 
          <BookList
            books={this.state.books}
            updateShelves={this.updateState}
            openOrCloseSearchPage={this.openOrCloseSearchPage}
            shelves={this.state.shelves}  
          />
        }
      </div>
    )
  }
}

export default BooksApp
