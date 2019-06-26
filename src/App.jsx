/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import Chat from './screens/Chat';

class App extends React.PureComponent {
  render() {
    return (
      // <Route path=''       component={NotFoundPage} />
      <div className="App">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/chat" component={Chat} />
      </div>
    );
  }
}

export default App;
