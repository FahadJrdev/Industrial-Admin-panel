import React from 'react';
import { ButtonWithArrow } from '../../component/buttons';
import './uti.css';
const VerReg = ({ title, language}) => {
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor approval Financiera ver">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div>
                <div className="utili">
                    <p>Estos movimientos  NO estan dentro del archivo contable. Asegurate de incluirlos y vuelve a realizar el proceso de validación.</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default VerReg;