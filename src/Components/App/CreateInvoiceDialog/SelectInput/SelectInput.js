import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';
import icons from './icons';


function SelectInput() {
    const [option, setOption] = useState('Net 1 Day');
    const [popup, setPopup] = useState(false);

    const handlePopup = () => {
        setPopup(!popup);
    }

    const handleOption = (e) => {
        const choosenOption = e.target.getAttribute('data-option');
        setOption(choosenOption);
    }
    
    useEffect(() => {
        const popupRef = document.querySelector('.' + styles.selectBox_popup);
        const arrowRef = document.querySelector('.' + styles.arrow);

        if(popup){
            popupRef.style.display = 'block';
            arrowRef.style.transform = 'rotate(180deg)';
        }
        else {
            popupRef.style.display = '';
            arrowRef.style.transform = '';
        }
            
    }, [popup])

    useEffect(() => {
        const handleClick = (e) => {
            if(!e.target.matches('.' + styles.selectBox) && !e.target.matches('.' + styles.selectBox_popup) &&
               !e.target.matches('.' + styles.arrow))
                setPopup(false);
        }

        if(popup)
            document.addEventListener('click', handleClick);
        else
            document.removeEventListener('click', handleClick);
    
        return () => {
            document.removeEventListener('click', handleClick);
        }

    }, [popup])


    return(
        <section className={styles.selectBox_container}>
            <h1 className={styles.selectBox_label}>
                Payment Terms
            </h1>        
            <div className={styles.selectBox} onClick={handlePopup}> 
                <div className={styles.selectBox_choosen}>
                    {option}
                </div>
                <img src={icons['arrow']} className={styles.arrow}/>
                <div className={styles.selectBox_popup}>
                    <div className={styles.selectBox_option} onClick={handleOption} data-option='Net 1 Day'>
                            Net 1 Day
                    </div>  
                    <div className={styles.selectBox_option} onClick={handleOption} data-option='Net 7 Day'>
                            Net 7 Days
                    </div>  
                    <div className={styles.selectBox_option} onClick={handleOption} data-option='Net 14 Day'>
                            Net 14 Days
                    </div>  
                    <div className={styles.selectBox_option} onClick={handleOption} data-option='Net 30 Day'>
                            Net 30 Days
                    </div>  
                </div>
            </div>              
        </section>

    )
}

export default SelectInput;