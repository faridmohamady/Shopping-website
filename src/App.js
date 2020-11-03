import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from './pages/homepage/Homepage.component'
import ShopPage from './pages/shop/shop.component';

function App() {
  return (
    <div>
      <Switch>
        <Route exact component={HomePage} path='/' />
        <Route exact component={ShopPage} path='/shop'/>
      </Switch>
    </div>
  );
}

export default App;
