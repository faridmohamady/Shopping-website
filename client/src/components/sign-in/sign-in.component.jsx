import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCredentials, setCredentials] = useState({email: '', password:''})

    const handleChange = event =>{
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name]: value })
    }

    const {email, password} = userCredentials

    const handleSubmit = async event =>{
        event.preventDefault();
        emailSignInStart(email, password)
    }

    return(
        <div className='sign-in'>
            <h2 >I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                name='email'
                type='email' 
                label='Email'
                required 
                value={email} 
                handleChange={handleChange} 
                />
                <FormInput 
                name='password' 
                type='password' 
                label='Password'
                required 
                value={password} 
                handleChange={handleChange} 
                />
                <div className='buttons'>
                <CustomButton type='submit'>Sign In</CustomButton>
                <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn
                >Sign In with google</CustomButton>  
                </div>
            </form>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);