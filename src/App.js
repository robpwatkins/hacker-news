import React from 'react';
import './App.css';
import SearchForm from './SearchForm';
import Articles from './Articles';

class App extends React.Component {
  state = {
    list: [],
  }

  updateList = props => {
    this.setState({ list: props });
  }
  
  render() {
    return (
      <div className="App">
        <SearchForm updatelist={this.updateList} />
        <Articles list={this.state.list} />
      </div>
    );
  }
}

export default App;
