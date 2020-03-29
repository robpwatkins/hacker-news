import React from 'react';

function Articles ({list}) {
  return (
    <div>
      {list.map((article, i) => {
        return (
          <div className="article" key={i}>
            <h3>{article.title}</h3>
            <h5>Author: {article.author}</h5>
            <a href={article.url}>
              <h6>{article.url}</h6>
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default Articles;