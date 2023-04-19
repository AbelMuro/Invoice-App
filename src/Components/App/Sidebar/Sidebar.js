import React, {useEffect} from 'react';
import LightOrDarkTheme from '../LightOrDarkTheme';
import styles from './styles.module.css';
import icons from './icons';
import images from './images';
import useMediaQuery from '../useMediaQuery';


function Sidebar() {
    const [mobile] = useMediaQuery('(max-width: 850px)');

    return(<>
            <aside className={styles.sidebar} id='sidebar'>
                <div className={styles.sidebar_logoContainer}>
                    <img src={icons['logo']} className={styles.sidebar_logo}/>
                    <div className={styles.sidebar_whiteBox}></div>
                </div>
                <div className={styles.sidebar_themeAndImage}>
                    <LightOrDarkTheme/>
                    <div className={styles.sidebar_horizontalLine}></div>
                    <img src={images['avatar']} className={styles.sidebar_avatar}/>
                </div>
            </aside>   
    </>

    )
}

export default Sidebar;
