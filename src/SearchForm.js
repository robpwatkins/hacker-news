import React from 'react';

function SearchForm (props) {
  return (
    <div>
      <form>
        <input onChange={event => props.updatequery(event)} value={props.query}></input>
        <button onClick={event => props.submitquery(event)}>Submit</button>
      </form>
      <form>
        <input name={props.dropdown} onChange={event => props.updatequery(event)} placeholder={
          props.dropdown === '--choose--'
          ? 'Search articles by' : `Enter ${props.dropdown}`
          } value={ props.author }>
          </input>
          <select onChange={event => props.handlechange(event)} >
            <option>--choose--</option>
            <option>author</option>
            <option>date</option>
          </select>
          <button onClick={event => this.onSubmit(event)}>Submit</button>
      </form>
    </div>
  )
}

export default SearchForm;