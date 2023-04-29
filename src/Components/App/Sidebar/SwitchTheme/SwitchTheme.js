import React from 'react';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';
import {useSelector, useDispatch} from 'react-redux';

function SwitchTheme() {
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const handleTheme = () => {
        if(theme == 'light')
            dispatch({type: 'switch theme', theme: 'dark'});
        else
            dispatch({type: 'switch theme', theme: 'light'})
    }

    return(        
        <div onClick={handleTheme}>
            {theme == 'dark'? <MoonIcon/> : <SunIcon/>}
        </div>)
}

export default SwitchTheme;