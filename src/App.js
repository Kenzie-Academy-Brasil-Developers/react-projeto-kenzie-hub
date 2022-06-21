import './App.css';
import {Switch, Route} from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Login />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
    </Switch>
  )
}

export default App;
