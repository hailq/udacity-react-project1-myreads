import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'

import BookList from './BookList'
import SearchPage from './SearchPage'

// const CURRENTLY_READING = "Currently Reading"
// const WANT_TO_READ = "Want To Read"
// const READ = "READ"

class BooksApp extends React.Component {
  state = {
    // shelves: {
    //   currentlyReading: [],
    //   wantToRead: [],
    //   read: []
    // },
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
    BooksAPI.getAll()
      .then((response) => {
        this.setState(() => ({
          books: response
        }))
      })
  }

  updateShelves = (event) => {
    const selectedValue = event.target.value
    console.log(selectedValue)
    BooksAPI.update({id: this.props.id}, selectedValue)
      .then((response) => {
        this.setState(() => ({
          shelves: response
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
            updateShelves={this.updateShelves}
            openOrCloseSearchPage={this.openOrCloseSearchPage}
          />
        : 
          <BookList
            books={this.state.books}
            updateShelves={this.updateShelves}
            openOrCloseSearchPage={this.openOrCloseSearchPage}
            shelves={this.state.shelves}  
          />
        }
      </div>
    )
  }
}

export default BooksApp
