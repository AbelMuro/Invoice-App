import React, {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux';

const darkTheme = [
    '--body-bg-color: #141625',
    '--sidebar-bg-color: #1E2139',

    '--invoice-main-title: white',
    '--invoice-total-title: #DFE3FA',
    '--invoice-filter-title: white',
    '--invoice-filter-popup-bg: #252945',
    '--invoice-filter-popup-label: white',
    '--invoice-filter-popup-box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25)',

    '--invoice-container-bg: #1E2139',
    '--invoice-container-title: #FFFFFF',
    '--invoice-container-invoice-number-hashtag:#888EB0',
    '--invoice-container-due-date: #DFE3FA',
    '--invoice-container-due-date-span: #DFE3FA',
    '--invoice-container-name: #FFFFFF',
    '--invoice-container-price: #FFFFFF',

    '--invoice-draft-bg: rgba(223, 227, 250, 0.06)',
    '--invoice-draft-text: #DFE3FA',

    '--view-invoice-go-back-link-text: white',
    '--view-invoice-go-back-link-text-hover: #888EB0',
    '--view-invoice-container-bg: #1E2139',
    '--view-invoice-container-status-title: #DFE3FA',
    '--view-invoice-container-edit-button-bg: #252945',
    '--view-invoice-container-edit-button-text: #DFE3FA',
    '--view-invoice-container-edit-button-hover: #FFFFFF',

    '--view-invoice-container-invoice-number-text: #FFFFFF',
    '--view-invoice-container-invoice-desc-text: #DFE3FA',
    '--view-invoice-container-invoice-address-text: #DFE3FA',
    '--view-invoice-container-invoice-title: #DFE3FA',
    '--view-invoice-container-invoice-data: white',
    '--view-invoice-container-invoice-address: #DFE3FA',

    '--view-invoice-container-item-bg: #252945',
    '--view-invoice-container-item-title: #DFE3FA',
    '--view-invoice-container-item-name: #FFFFFF',
    '--view-invoice-container-item-qty: #DFE3FA',
    '--view-invoice-container-item-amount: #FFFFFF',
    '--view-invoice-container-amount-due-bg: #0C0E16',

    '--dialog-bg: #141625',
    '--dialog-main-title: #FFFFFF',
    '--dialog-label: #DFE3FA',
    '--dialog-input-bg: #1E2139',
    '--dialog-input-border: #252945',
    '--dialog-input-text: white',

    '--dialog-popup-bg: #252945',
    '--dialog-popup-box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25)',
    '--dialog-popup-option-border: #1E2139',
    '--dialog-popup-calendar-text: #DFE3FA',
    '--dialog-popup-calendar-text-inactive: rgba(223, 227, 250, 0.08)',

    '--dialog-item-list-title: #DFE3FA',
    '--dialog-item-total: #DFE3FA',
    '--dialog-add-new-item-bg: #252945',
    '--dialog-add-new-item-text: #DFE3FA',
    '--dialog-add-new-item-hover-bg: white',
    '--dialog-add-new-item-text-hover: #7E88C3',

    '--dialog-input-placeholder-text: rgba(126, 126, 129, 0.4)',
    '--dialog-button-container-bg: #141625',
    '--dialog-button-container-box-shadow: 0px -50px 50px rgba(0, 0, 0, 0.0001)',
    '--dialog-button-draft-text: #DFE3FA',
    '--dialog-button-draft-hover: #1E2139',
    '--dialog-button-cancel-button-bg: #252945',
    '--dialog-button-cancel-button-text: #DFE3FA',
    '--dialog-button-cancel-button-text-hover: #7E88C3',
    '--dialog-delete-message-text: #DFE3FA',
    '--dialog-scrollbar-bg: #141625',
    '--dialog-scrollbar-thumb: #252945',

];

const lightTheme = [

    '--body-bg-color: #F8F8FB',
    '--sidebar-bg-color: #373B53',

    '--invoice-main-title: #0C0E16',
    '--invoice-total-title: #888EB0',
    '--invoice-filter-title: #0C0E16',
    '--invoice-filter-popup-bg: white',
    '--invoice-filter-popup-label: #1E2139',
    '--invoice-filter-popup-box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25)',

    '--invoice-container-bg: white',
    '--invoice-container-title: #0C0E16',
    '--invoice-container-invoice-number-hashtag: #7E88C3',
    '--invoice-container-due-date: #7E88C3',
    '--invoice-container-due-date-span: #888EB0',
    '--invoice-container-name: #858BB2',
    '--invoice-container-price: #0C0E16',

    '--invoice-draft-bg: rgba(55, 59, 83, 0.06)',
    '--invoice-draft-text: #373B53',

    '--view-invoice-go-back-link-text: #0C0E16',
    '--view-invoice-go-back-link-text-hover: #7E88C3',
    '--view-invoice-container-bg: white',
    '--view-invoice-container-status-title: #858BB2',
    '--view-invoice-container-edit-button-bg: #F9FAFE',
    '--view-invoice-container-edit-button-text: #7E88C3',
    '--view-invoice-container-edit-button-hover: #DFE3FA',

    '--view-invoice-container-invoice-number-text: #0C0E16',
    '--view-invoice-container-invoice-desc-text: #7E88C3',
    '--view-invoice-container-invoice-address-text: #7E88C3',
    '--view-invoice-container-invoice-title: #7E88C3',
    '--view-invoice-container-invoice-data: #0c0e16',
    '--view-invoice-container-invoice-address: #7E88C3',

    '--view-invoice-container-item-bg: #F9FAFE',
    '--view-invoice-container-item-title: #7E88C3',
    '--view-invoice-container-item-name:#0C0E16',
    '--view-invoice-container-item-qty:#7E88C3',
    '--view-invoice-container-item-amount: white',
    '--view-invoice-container-amount-due-bg: #373B53',

    '--dialog-bg: #FFFFFF',
    '--dialog-main-title:  #0C0E16',
    '--dialog-label:#7E88C3',
    '--dialog-input-bg: white',
    '--dialog-input-border: #DFE3FA',
    '--dialog-input-text: #0C0E16',

    '--dialog-popup-bg: white',
    '--dialog-popup-box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25)',
    '--dialog-popup-option-border: #DFE3FA',
    '--dialog-popup-calendar-text: #0C0E16',
    '--dialog-popup-calendar-text-inactive: rgba(12, 14, 22, 0.08)',

    '--dialog-item-list-title: #7E88C3',
    '--dialog-item-total: #888EB0',
    '--dialog-add-new-item-bg: #F9FAFE',
    '--dialog-add-new-item-text: #7E88C3',
    '--dialog-add-new-item-hover-bg: #DFE3FA',
    '--dialog-add-new-item-text-hover: #7E88C3',

    '--dialog-input-placeholder-text: rgba(12, 14, 22, 0.4)',      
    '--dialog-button-container-bg: white',
    '--dialog-button-container-box-shadow: 0px -50px 50px rgba(0, 0, 0, 0.1)',
    '--dialog-button-draft-text: #888EB0',
    '--dialog-button-draft-hover:#0C0E16',
    '--dialog-button-cancel-button-bg: #f9fafe',
    '--dialog-button-cancel-button-text: #7E88C3',
    '--dialog-delete-message-text: #888Eb0',
    '--dialog-scrollbar-bg: white',
    '--dialog-scrollbar-thumb: #DFE3FA',
];

function LightOrDarkTheme() {
    const theme = useSelector(state => state.theme);
    const root = document.querySelector('html');
    const skipFirstRender = useRef(localStorage.getItem('selected theme') ? false : true);

    useEffect(() => {
        if(skipFirstRender.current) {
           skipFirstRender.current = false;
           return; 
        }

        if(theme == 'light')
            root.style.cssText += lightTheme.join(';');
        else
            root.style.cssText += darkTheme.join(';');
        
    }, [theme]);

    return(<></>)

}

export default LightOrDarkTheme;