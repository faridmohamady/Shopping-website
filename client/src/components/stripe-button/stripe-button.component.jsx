import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51HnU7OKxaScOfD6LhK8v7OibbzCSt4nXGr9OvAGqeaLyOcrCeEIW4Ara99vAve505SJwPi9bCrrO200GLYqzqILx00Ils3iQUY';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data:{
        amount:priceForStripe,
        token
      }
    }).then(response => {
      alert('payment succesful')
    }).catch(error => {
      console.log('Payment error: ', JSON.parse(error))
      alert("There was an issue with your payment. Please make sure you're using the provided credit card")
    })
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name="Farid's Clothing"
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;