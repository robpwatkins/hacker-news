import React from 'react';

class SearchForm extends React.Component {
  state = {
    query: '',
    author: '',
    date: '',
    querySubmitted: false,
    dropDown: '--choose--',
  }

  updateQuery = event => {
    this.setState({ 
      [event.target.name]: event.target.value
    });
  }

  submitQuery = event => {
    event.preventDefault();
    this.setState({ 
      [event.target.name]: event.target.value,
      querySubmitted: true
    });
    if (!this.props.querySubmitted) {
      this.props.fetchdata(this.state.query);
    } else {
      this.props.fetchdata(this.state.author);
    }
    this.setState({ 
      query: '',
      author: ''
    });
  }
  
  handleChange = event => {
    this.setState({ dropDown: event.target.value })
  }

  render () {
    return (
      <div>
        { !this.state.querySubmitted &&
        <form>
          <input name="query" onChange={event => this.updateQuery(event)} value={this.state.query}></input>
          <button onClick={event => this.submitQuery(event)}>Submit</button>
        </form>
        }
        {
          this.state.querySubmitted &&
        <form>
          <input name={this.state.dropDown} onChange={event => this.updateQuery(event)} placeholder={
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