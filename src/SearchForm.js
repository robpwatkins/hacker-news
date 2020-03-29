import React from 'react';

class SearchForm extends React.Component {
  state = {
    query: '',
    author: '',
    date: '',
    querySubmitted: false,
    dropDown: '--choose--',
  }

  updateInput = event => {
    this.setState({ 
      [event.target.name]: event.target.value
    });
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({ 
      [event.target.name]: event.target.value,
      querySubmitted: true
    });
    this.fetchData();
    console.log(this.state.author);
    this.setState({ 
      author: ''
    });
  }

  fetchData = () => {
    const query = this.state.query;
    const author = this.state.author;
    const queryURL = `http://hn.algolia.com/api/v1/search?query=${query}`;
    const authorURL = `${queryURL}&tags=author_${author}`;
    const dateURL = `http://hn.algolia.com/api/v1/search_by_date?query=${query}`;
    let url;
    if (this.state.dropDown === '--choose--') {
      url = queryURL;
    } else {
      if (this.state.dropDown === 'author') {
        url = authorURL;
      } else {
        url = dateURL;
      }
    }
    fetch(url).then(response => response.json())
    .then(json => {
      this.props.updatelist(json.hits);
    })
  }
  
  handleChange = event => {
    this.setState({ dropDown: event.target.value })
  }

  render () {
    return (
      <div>
        { !this.state.querySubmitted &&
        <form>
          <input name="query" onChange={event => this.updateInput(event)} value={this.state.query}></input>
          <button onClick={event => this.onSubmit(event)}>Submit</button>
        </form>
        }
        {
          this.state.querySubmitted &&
        <form>
          <input name={this.state.dropDown} onChange={event => this.updateInput(event)} placeholder={
            this.state.dropDown === '--choose--'
            ? 'Search articles by' : `Enter ${this.state.dropDown}`
            } value={ this.state.author }>
            </input>
            <select onChange={event => this.handleChange(event)} >
              <option>--choose--</option>
              <option>author</option>
              <option>date</option>
            </select>
            <button onClick={event => this.onSubmit(event)}>Submit</button>
        </form>
        }
      </div>
    )
  }
}

export default SearchForm;