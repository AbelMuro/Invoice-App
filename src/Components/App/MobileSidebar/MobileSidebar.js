import React, {memo} from 'react';
import styles from './styles.module.css';
import icons from './icons';
import images from './images';
import SwitchTheme from './SwitchTheme';
import {useDispatch} from 'react-redux';
import {auth} from '../Firebase';

function MobileHeaderbar() {
    const dispatch = useDispatch();

    const handleLogIn = () => {
        dispatch({type: 'open log in', open: true});
    }      

    const handleLogOut = () => {
        dispatch({type: 'open log out', open: true});
    }

    return(
        <header className={styles.header}>
            <div className={styles.header_logoContainer}>
                <img src={icons['logo']} className={styles.header_logo}/>
                <div className={styles.header_whiteBox}></div>
            </div>
            <div className={styles.header_themeAndImage}>
                <SwitchTheme/>
                <div className={styles.header_verticalLine}></div>
                <img src={images['avatar']} className={styles.header_avatar} onClick={auth.currentUser ? handleLogOut : handleLogIn}/>
            </div>
        </header>
    )
}

export default memo(MobileHeaderbar);