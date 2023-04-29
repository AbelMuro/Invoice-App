import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import styles from './styles.module.css';
import icons from './icons';

const SelectInput = forwardRef(({prevState}, ref) => {
    const [option, setOption] = useState('');
    const [popup, setPopup] = useState(false);

    const handlePopup = () => {
        setPopup(!popup);
    }

    const handleOption = (e) => {
        const choosenOption = e.target.getAttribute('data-option');
        setOption(choosenOption);
    }

    useEffect(() => {
        setOption(prevState ? prevState : '1')
    }, [prevState])
    
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

    useImperativeHandle(ref, () => ({
        get state() {
            return option;
        }
    }))


    return(
        <section className={styles.selectBox_container}>
            <h1 className={styles.selectBox_label}>
                Payment Terms
            </h1>        
            <div className={styles.selectBox} onClick={handlePopup}> 
                <div className={styles.selectBox_choosen}>
                    {'Net ' + option + ` Day${Number(option) > 1 ? 's' : ''}`}
                </div>
                <img src={icons['arrow']} className={styles.arrow}/>
                <div className={styles.selectBox_popup}>
                    <div className={styles.selectBox_option} onClick={handleOption} data-option={'1'}>
                            Net 1 Day
                    </div>  
                    <div className={styles.selectBox_option} onClick={handleOption} data-option={'7'}>
                            Net 7 Days
                    </div>  
                    <div className={styles.selectBox_option} onClick={handleOption} data-option={'14'}>
                            Net 14 Days
                    </div>  
                    <div className={styles.selectBox_option} onClick={handleOption} data-option={'30'}>
                            Net 30 Days
                    </div>  
                </div>
            </div>              
        </section>
    )
});

export default SelectInput;