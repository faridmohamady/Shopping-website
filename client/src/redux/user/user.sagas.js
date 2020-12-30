import { takeLatest, call, put, all } from "redux-saga/effects"
import { userActionTypes } from "./user.types"
import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from '../../firebase/firebase.utils'
import { emailSignInStart, signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id:userSnapshot.id, ...userSnapshot.data()}));
    }
    catch(error){
        yield put(signInFailure(error.message));
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    }
    catch(error){
        put(signInFailure(error.message))
    }
}

export function* signInWithGoogle() {
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    }
    catch(error){
        yield put(signInFailure(error.message));
    }
}

export function* signInWithEmail({payload: {email, password, additionalData}}){
    try{
    const {user} = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user, additionalData);
    }
    catch(error){
        yield put(signInFailure(error.message));
    }
}

export function* signOut(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    }
    catch(error){
        yield put(signOutFailure(error))
    }
}

export function* signUp({payload:{displayName, email, password}}){
    try{
        yield auth.createUserWithEmailAndPassword(email,password);
        yield put(signUpSuccess());
        yield put(emailSignInStart({email, password, additionalData:{displayName}}))
    }
    catch(error){
        yield put(signUpFailure(error.message))
    }
}

// export function* signInAfterSignUp({payload:{user, additionalData}}){
//     yield getSnapshotFromUserAuth(user, additionalData);
// }

export function* onGoogleSignInStart() {
   yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession(){
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart(){
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart(){
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

// export function* onSignUpSuccess(){
//     yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
// }

export default function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onSignUpStart)])
}