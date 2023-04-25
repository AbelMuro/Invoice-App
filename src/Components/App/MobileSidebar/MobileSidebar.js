import React, {memo} from 'react';
import styles from './styles.module.css';
import icons from './icons';
import images from './images';
import LightOrDarkTheme from '../LightOrDarkTheme';
import {useDispatch} from 'react-redux';
import {auth} from '../Firebase';

function MobileHeaderbar() {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch({type: 'open log in', open: true});
    }      

    return(
        <header className={styles.header}>
            <div className={styles.header_logoContainer}>
                <img src={icons['logo']} className={styles.header_logo}/>
                <div className={styles.header_whiteBox}></div>
            </div>
            <div className={styles.header_themeAndImage}>
                <LightOrDarkTheme/>
                <div className={styles.header_verticalLine}></div>
                <img src={images['avatar']} className={styles.header_avatar} onClick={auth.currentUser ? () => {} : handleClick}/>
            </div>
        </header>
    )
}

export default memo(MobileHeaderbar);