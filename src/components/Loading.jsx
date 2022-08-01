import React from 'react';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <h1>
          Carregando
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h1>
      </div>
    );
  }
}
