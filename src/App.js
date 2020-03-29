import React from 'react';
import './App.css';
import SearchForm from './SearchForm';
import Articles from './Articles';

class App extends React.Component {
  state = {
    query: '',
    author: '',
    querySubmitted: '',
    dropDown: '--choose--',
    list: [],
  }

  updateQuery = props => {
    this.setState({ query: props.target.value });
    // console.log(this.state.query);
  }

  
  fetchData = props => {
    const query = this.state.query;
    const author = this.state.author;
    const queryURL = `http://hn.algolia.com/api/v1/search?query=${query}`;
    const authorURL = `${queryURL}&tags=author_${author}`;
    const dateURL = `http://hn.algolia.com/api/v1/search_by_date?query=${query}`;
    let url = queryURL;
    fetch(url).then(response => response.json())
    .then(json => {
      this.setState({ list: [...json.hits] })
    })
  }
  
  submitQuery = props => {
    props.preventDefault();
    this.setState({ query: props.target.value });
    this.fetchData();
    this.setState({ query: '' });
  }

  render() {
    return (
      <div className="App">
        <SearchForm updatequery={this.updateQuery} submitquery={this.submitQuery} query={this.state.query}/>
        <Articles list={this.state.list}/>
      </div>
    );
  }
}

export default App;
