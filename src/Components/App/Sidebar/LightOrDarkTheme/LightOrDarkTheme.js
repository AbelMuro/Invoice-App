import React, {useState} from 'react';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';

function LightOrDarkTheme() {
    const [theme, setTheme] = useState(false)

    const handleTheme = () => {
        setTheme(!theme);
    }

    return(
        <div onClick={handleTheme}>
            {theme ? <MoonIcon/> : <SunIcon/>}
        </div>
        
    )
}

export default LightOrDarkTheme;