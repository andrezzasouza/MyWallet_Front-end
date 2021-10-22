import './assets/styles/styles.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import UserContext from './contexts/UserContext';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Income from './pages/Income';
import Expense from './pages/Expense';

function App() {

  const [userData, setUserData] = useState("");
  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/income" component={Income} />
          <Route exact path="/expense" component={Expense} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
