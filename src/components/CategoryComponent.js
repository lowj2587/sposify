// React
import React, { Component } from 'react';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export default class CategoryComponent extends Component {
  render() {
    const { categorySlug, categoryName, categoryEndpoints } = this.props;

    const codeString = '(num) => num + 1';
    
    return (
      <div className="apiCategory">
        <h1 id={categorySlug}><a href={"#" + categorySlug}>{categoryName} API</a></h1>

        {categoryEndpoints.map(endpoint => (
          <div className="apiCategoryEndpoint">
            <h2>{endpoint.name}</h2>

            <p>{JSON.stringify(endpoint)}</p>
          </div>
        ))}
      </div>
    )
  }
}