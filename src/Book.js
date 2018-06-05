import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  state = {
    selectedValue: this.props.shelf
  }

  handleSelect = (event) => {
    const selectedValue = event.target.value
    BooksAPI.update({id: this.props.id}, selectedValue)
      .then((response) => {
        console.log(response)
        this.props.updateState()
      })
    
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.backgroundImage}")` }}></div>
          <div className="book-shelf-changer">
            <select 
              value={this.state.selectedValue}
              onChange={this.handleSelect}
            >
              <option value="disabled" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">
          {this.props.authors
            ? this.props.authors.join(', ')
            : 'No author'
          }
        </div>
      </div>
    )
  }
}

export default Book