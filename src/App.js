import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from './pages/homepage/Homepage.component'
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact component={HomePage} path='/' />
        <Route exact component={ShopPage} path='/shop'/>
      </Switch>
    </div>
  );
}

export default App;
