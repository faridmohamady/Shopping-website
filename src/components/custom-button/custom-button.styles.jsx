import styled, {css} from 'styled-components';

const buttonStyles = css`
    background-color: black;
    color: white;
    border: none;
        &:hover {
            background-color: white;
            color: black;
            border: 1px solid black;
            box-shadow: 1px 1px white;
            &:active{
                box-shadow: none;
            }
        }
`

const invertedButtonStyles = css`
    background-color: white;
    color: black;
    border: 1px solid black;
        &:hover{
            background-color: black;
            color: white;
            border: none;
            box-shadow: 1px 1px black;
                &:active{
                    box-shadow: none;
                }
            }
`

const googleSignInStyles = css`
    background-color: #4285f4;
    color: white;
    border: none;
        &:hover{
            background-color: #041f4b;
            border: none;
        }
`

const getButtonStyles = props => {
    if(props.isGoogleSignIn){
        return googleSignInStyles
    }

    return props.inverted ? invertedButtonStyles : buttonStyles;
}

export const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    cursor: pointer;
    display: flex;
    justify-content: center;
    outline: none;
    transition: all 0.3s ease-in;
    ${getButtonStyles}
`