import React, {Component} from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils'

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = event =>{
        const {value, name} = event.target;
        this.setState({ [name]: value })

    }
    handleSubmit = async event =>{
        event.preventDefault();
        const {email, password} = this.state
        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email:'', password:''})
        }
        catch(error){
            console.log(error)
        }
    }

    render(){
        return(
            <div className='sign-in'>
                <h2 >I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name='email'
                    type='email' 
                    label='Email'
                    required 
                    value={this.state.email} 
                    handleChange={this.handleChange} 
                    />
                    <FormInput 
                    name='password' 
                    type='password' 
                    label='Password'
                    required 
                    value={this.state.password} 
                    handleChange={this.handleChange} 
                    />
                    <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn
                    >Sign In with google</CustomButton>  
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;