import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from './pages/homepage/Homepage.component'

function App() {
  return (
    <div>
      <Switch>
        <Route exact component={HomePage} path='/' />
      </Switch>
    </div>
  );
}

export default App;
