import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from './pages/homepage/Homepage.component'
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signin-signup/signin-signup.component'
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
class App extends Component {

  constructor(){
    super();
    this.state= {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })

      }else{
        this.setState({currentUser: userAuth})
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact component={HomePage} path='/' />
          <Route exact component={ShopPage} path='/shop'/>
          <Route exact component={SignInAndSignUpPage} path='/signin'/>
          </Switch>
      </div>
    );
  }
}

export default App;
