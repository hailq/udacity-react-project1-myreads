import React, { Component } from 'react';
import Bookshelf from './Bookshelf';


class BookList extends Component {
  render() {
    return (
      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  books={this.props.books}
                  shelfValue="currentlyReading"
                  shelfName="Currently Reading"
                  updateState={this.props.updateState}
                  updateShelves={this.props.updateShelves}
                />
                <Bookshelf
                  books={this.props.books}
                  shelfValue="wantToRead"
                  shelfName="Want To Read"
                  updateState={this.props.updateState}
                  updateShelves={this.props.updateShelves}
                />
                <Bookshelf
                  books={this.props.books}
                  shelfValue="read"
                  shelfName="Read"
                  updateState={this.props.updateState}
                  updateShelves={this.props.updateShelves}
                />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.props.openOrCloseSearchPage()}>Add a book</a>
            </div>
          </div>
    )
  }
}

export default BookList