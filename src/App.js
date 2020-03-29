import React from 'react';
import './App.css';
import SearchForm from './SearchForm';
import Articles from './Articles';

class App extends React.Component {
  state = {
    list: [],
    querySubmitted: false
  }
  
  fetchData = props => {
    this.setState({ querySubmitted: true })
    const query = props;
    const author = props;
    console.log(author);
    const queryURL = `http://hn.algolia.com/api/v1/search?query=${query}`;
    const authorURL = `${queryURL}&tags=author_${author}`;
    // const dateURL = `http://hn.algolia.com/api/v1/search_by_date?query=${query}`;
    let url;
    if (!this.state.querySubmitted) {
      url = queryURL;
    } else {
      url = authorURL;
    }
    fetch(url).then(response => response.json())
    .then(json => {
      this.setState({ list: [...json.hits] })
    })
  }
  
  render() {
    return (
      <div className="App">
        <SearchForm fetchdata={this.fetchData} />
        <Articles list={this.state.list}/>
      </div>
    );
  }
}

export default App;
