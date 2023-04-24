import React, {useState, useEffect, useRef} from 'react';
import styles from './styles.module.css';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../Firebase'
import Input from './Input';
import {useSelector, useDispatch} from 'react-redux';


//i will need to test out the two handle submit event handlers of this component
function LogInDialog() {
    const [createAccount, setCreateAccount] = useState(false);
    const open = useSelector(state => state.loginDialog);
    const dispatch = useDispatch();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const handleCreateAccount = () => {
        email.current.resetState;
        password.current.resetState;
        if(confirmPassword.current)
            confirmPassword.current.resetState;
        setCreateAccount(!createAccount);
    }

    const handleClick = () => {
        dispatch({type: 'open log in', open : false});
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const Email = email.current.state;
        const Password = password.current.state;
        try{
            await signInWithEmailAndPassword(auth, Email, Password);
            alert('You have logged in!');
            dispatch({type: 'open log in', open : false})

        }
        catch(error){
            alert('Email or password is incorrect');
        }
    }   

    const handleNewAccount = async (e) => {
        e.preventDefault();
        const Email = email.current.state;
        const Password = password.current.state;
        const ConfirmPassword = confirmPassword.current.state;

        if(Password != ConfirmPassword){
            alert('Passwords do not match');
            return;
        }
        try{
            await createUserWithEmailAndPassword(auth, Email, Password);      
            alert('You have created your account with firebase and you are already logged in!');

        }
        catch(error){
            console.log(error)
        }

    }

    useEffect(() => {
        const overlay = document.querySelector('.' + styles.overlay);
        if(open){
             overlay.style.display = 'block';
             setTimeout(() => {
                overlay.style.opacity = 1;
             }, 10);
        }
        else {
            overlay.style.opacity = 0;   
            setTimeout(() => {
                overlay.style.display = '';       
            }, 200);
        }
    }, [open])

    useEffect(() => {
        const handleClick = (e) => {
            if(e.target.matches('.' + styles.overlay))
                dispatch({type: 'open log in', open : false})
        }

        if(open)
            document.addEventListener('click', handleClick);
        else
            document.removeEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick)
        }

    }, [open])

    return(
        <div className={styles.overlay}>
            <dialog open={open} id={styles.logInDialog}>
                {createAccount ? 
                <>
                    <form onSubmit={handleNewAccount}>
                        <h2 className={styles.dialogTitle}>
                            Create Account
                        </h2>
                        <div className={styles.dialogContent}>
                            <Input type='email' label='Enter Email' message='not valid email' ref={email}/>
                            <Input type='password' label='Enter Password' ref={password}/> 
                            <Input type='password' label='Re-enter Password' ref={confirmPassword}/> 
                            <div className={styles.dialogContent_buttons}>
                                <button type='button' className={styles.cancelButton} onClick={handleClick}>
                                    Cancel
                                </button>
                                <input type='submit' className={styles.submitButton} value='Create Account'/>            
                            </div> 
                            
                        </div>
                    </form>
                    <button className={styles.createAccountButton} onClick={handleCreateAccount}>
                        Go back to login
                    </button>     
                </> 
                :
                <>
                    <form onSubmit={handleLogin}>
                        <h2 className={styles.dialogTitle}>
                            Log In
                        </h2>
                        <div className={styles.dialogContent}>
                            <Input type='email' label='Enter Email' message='not valid email' ref={email}/>
                            <Input type='password' label='Enter Password' ref={password}/> 
                            <div className={styles.dialogContent_buttons}>
                                <button type='button' className={styles.cancelButton} onClick={handleClick}>
                                    Cancel
                                </button>
                                <input type='submit' className={styles.submitButton} value='Log In'/>            
                            </div> 
                            
                        </div>
                    </form>
                    <button className={styles.createAccountButton} onClick={handleCreateAccount}>
                        Don't have an account? Create one here
                    </button>                
                </>}
            </dialog>                
        </div>
    )
}

export default LogInDialog;