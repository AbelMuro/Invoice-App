import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';

//this is where i left off, i will need to make an img tag with the svg file that contains the arrow
function SelectInput() {
    const [option, setOption] = useState('Net 1 Day');
    const [popup, setPopup] = useState(false);

    const handlePopup = () => {
        setPopup(!popup);
    }
    
    useEffect(() => {
        const popupRef = document.querySelector('.' + styles.selectBox_popup);

        if(popup){
            popupRef.style.display = 'block';
        }
        else 
            popupRef.style.display = '';
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
                <div className={styles.selectBox_popup}>
                    <div className={styles.selectBox_option}>
                            Net 1 Day
                    </div>  
                    <div className={styles.selectBox_option}>
                            Net 7 Days
                    </div>  
                    <div className={styles.selectBox_option}>
                            Net 14 Days
                    </div>  
                    <div className={styles.selectBox_option}>
                            Net 30 Days
                    </div>  
                </div>
            </div>              
        </section>

    )
}

export default SelectInput;