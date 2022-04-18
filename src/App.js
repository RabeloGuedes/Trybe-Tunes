import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import Content from './components/Content';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <Router>
        <h1>TrybeTunes</h1>
        <Header />
        <Content />
      </Router>
    );
  }
}
// App
export default App;
