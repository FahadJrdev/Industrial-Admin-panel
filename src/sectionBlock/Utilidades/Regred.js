import React from 'react';
import { ButtonWithArrow } from '../../component/buttons';
import './uti.css';
const Regred = ({ title, language}) => {
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor approval Financiera ver red">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div>
                <div className="utili">
                    <p>Los datos del registro estan incompletos o el tipo de información no corresponde.</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Regred;