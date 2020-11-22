import React, {Component, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/Homepage.component';
import CheckoutPage from './pages/checkout/checkout.component'
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signin-signup/signin-signup.component'

import { selectCurrentUser } from './redux/user/user.selectors';
import { GlobalStyle } from './global.styles';
import { checkUserSession } from './redux/user/user.actions';
const App = ({checkUserSession, currentUser}) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div>
      <GlobalStyle/>
      <Header />
      <Switch>
        <Route exact component={HomePage} path='/' />
        <Route component={ShopPage} path='/shop'/>
        <Route exact component={CheckoutPage} path='/checkout'/>
        <Route exact render={()=> 
          currentUser ? (
            <Redirect to='/'/> 
          ) : (
            <SignInAndSignUpPage/>
            )
        }  path='/signin'/>
        </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
