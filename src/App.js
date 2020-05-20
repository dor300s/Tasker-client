import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home.jsx'
import {NavBar} from './cmps/NavBar.jsx'
import UserDetails from './pages/UserDetails.jsx'
import DashBoard from './pages/DashBoard.jsx';
import Board from './pages/Board.jsx';
import { createBrowserHistory } from 'history'
const history = createBrowserHistory();

function App() {
  return (
    <div>
        <NavBar history={history} />
      <main className="app-main-container">
        <Switch>
          <Route component={Board} path="/board/:boardId/:cardId?" />
          <Route component={UserDetails} path="/user/:userId" />
          <Route component={DashBoard} path="/board" />
          <Route component={Home} path="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
