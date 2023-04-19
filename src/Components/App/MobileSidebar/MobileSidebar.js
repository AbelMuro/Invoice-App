import React from 'react';
import styles from './styles.module.css';
import icons from './icons';
import images from './images';
import LightOrDarkTheme from '../LightOrDarkTheme';

function MobileHeaderbar() {

    return(
        <header className={styles.header}>
            <div className={styles.header_logoContainer}>
                <img src={icons['logo']} className={styles.header_logo}/>
                <div className={styles.header_whiteBox}></div>
            </div>
            <div className={styles.header_themeAndImage}>
                <LightOrDarkTheme/>
                <div className={styles.header_verticalLine}></div>
                <img src={images['avatar']} className={styles.header_avatar}/>
            </div>
        </header>
    )
}

export default MobileHeaderbar;