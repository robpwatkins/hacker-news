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
    this.setState({ 
      author: ''
    });
  }

  fetchData = () => {
    const {query, author, dropDown} = this.state;
    const queryURL = `http://hn.algolia.com/api/v1/search?query=${query}`;
    const authorURL = `${queryURL}&tags=author_${author}`;
    const dateURL = `http://hn.algolia.com/api/v1/search_by_date?query=${query}`;
    let url;
    if (dropDown === '--choose--') {
      url = queryURL;
    } else {
      if (dropDown === 'author') {
        url = authorURL;
      } else {
        url = dateURL;
      }
    }
    fetch(url)
      .then(response => response.json())
      .then(json => this.props.updatelist(json.hits))
  }
  
  handleChange = event => {
    this.setState({ dropDown: event.target.value })
  }

  render () {
    const {query, author, date, querySubmitted, dropDown} = this.state;
    return (
      <div>
        { !querySubmitted &&
          <form>
            <input name="query" onChange={event => this.updateInput(event)} value={query}></input>
            <button onClick={event => this.onSubmit(event)}>Submit</button>
          </form> }
        { querySubmitted &&
          <form>
            <input 
              name={dropDown} 
              onChange={event => this.updateInput(event)} 
              placeholder={dropDown === '--choose--' ? 'Search articles by' : `Enter ${dropDown}`} 
              value={ dropDown === 'author' ? author : date}
            >
            </input>
              <select onChange={event => this.handleChange(event)} >
                <option>--choose--</option>
                <option>author</option>
                <option>date</option>
              </select>
              <button onClick={event => this.onSubmit(event)}>Submit</button>
          </form> }
      </div>
    )
  }
}

export default SearchForm;