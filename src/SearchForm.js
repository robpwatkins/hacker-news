import React from 'react';

function SearchForm (props) {
  return (
    <div>
      <form>
        <input onChange={event => props.updatequery(event)} value={props.query}></input>
        <button onClick={event => props.submitquery(event)}>Submit</button>
      </form>
    </div>
  )
}

export default SearchForm;