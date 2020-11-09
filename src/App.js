import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from './pages/homepage/Homepage.component';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signin-signup/signin-signup.component'
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
class App extends Component {

  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })

      }else{
        setCurrentUser({userAuth})
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact component={HomePage} path='/' />
          <Route exact component={ShopPage} path='/shop'/>
          <Route exact component={SignInAndSignUpPage} path='/signin'/>
          </Switch>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);
