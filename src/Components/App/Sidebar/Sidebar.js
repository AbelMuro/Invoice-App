import React, {memo} from 'react';
import {useDispatch} from 'react-redux';
import SwitchTheme from './SwitchTheme';
import styles from './styles.module.css';
import icons from './icons';
import images from './images';

function Sidebar({isLoggedIn}) {
    const dispatch = useDispatch();

    const handleLogIn = () => {
        dispatch({type: 'open log in', open: true});
    }       

    const handleLogOut = () => {
        dispatch({type: 'open log out', open: true});
    }

    return(<>
            <aside className={styles.sidebar} id='sidebar'>
                <div className={styles.sidebar_logoContainer}>
                    <img src={icons['logo']} className={styles.sidebar_logo}/>
                    <div className={styles.sidebar_whiteBox}></div>
                </div>
                <div className={styles.sidebar_themeAndImage}>
                    <SwitchTheme/>
                    <div className={styles.sidebar_horizontalLine}></div>
                    <img src={images['avatar']} className={styles.sidebar_avatar} onClick={isLoggedIn ? handleLogOut : handleLogIn}/>
                </div>
            </aside>   
         </>
    )
}

export default memo(Sidebar);
