import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import './por.css';
const initialState = {
    Nombre1: '-',
    NIT1: '-',
    Dirección1: '-',
    País1: '-',
    Nombre2: '-',
    NIT2: '-',
    Dirección2: '-',
    País2: '-',
    Nombres1: '-',
    Apellidos1: '-',
    Tipo1: '-',
    Identificación1: '-',
    Nombres2: '-',
    Apellidos2: '-',
    Tipo2: '-',
    Identificación2: '-'
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const RegisterOwners = ({ title, language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const {  Nombre1, NIT1, Dirección1, País1, Nombre2, NIT2, Dirección2, País2, Nombres1, Apellidos1, Tipo1, Identificación1, Nombres2, Apellidos2, Tipo2, Identificación2 } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor approval">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div>
                <form className='registerowner information' action="" method='POST' onSubmit={handleSubmit}>
                    <div className="empresa">
                        <h6>Empresa</h6>
                        <div className="empresaTable">
                            <div className="responsiveFix">
                                <div className="responsiveAuto">
                                    <ul>
                                        <li>Nombre de la empresa</li>
                                        <li>NIT</li>
                                        <li>Dirección</li>
                                        <li>País</li>
                                    </ul>
                                    <ul>
                                        <li><input type="text" name="Nombre1" value={Nombre1} onChange={onChange} /></li>
                                        <li><input type="text" name="NIT1" value={NIT1} onChange={onChange} /></li>
                                        <li><input type="text" name="Dirección1" value={Dirección1} onChange={onChange} /></li>
                                        <li><input type="text" name="País1" value={País1} onChange={onChange} /></li>
                                    </ul>
                                    <ul>
                                        <li><input type="text" name="Nombre2" value={Nombre2} onChange={onChange} /></li>
                                        <li><input type="text" name="NIT2" value={NIT2} onChange={onChange} /></li>
                                        <li><input type="text" name="Dirección2" value={Dirección2} onChange={onChange} /></li>
                                        <li><input type="text" name="País2" value={País2} onChange={onChange} /></li>
                                    </ul>
                                    <ul>
                                        <Button text={`Agregar`} background={`var(--tartiary-color)`} types={`submit`} />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="empresa">
                        <h6>Dueño</h6>
                        <div className="empresaTable">
                            <div className="responsiveFix">
                                <div className="responsiveAuto">
                                    <ul>
                                        <li>Nombres</li>
                                        <li>Apellidos</li>
                                        <li>Tipo de identificación</li>
                                        <li>Identificación</li>
                                    </ul>
                                    <ul>
                                        <li><input type="text" name="Nombres1" value={Nombres1} onChange={onChange} /></li>
                                        <li><input type="text" name="Apellidos1" value={Apellidos1} onChange={onChange} /></li>
                                        <li><input type="text" name="Tipo1" value={Tipo1} onChange={onChange} /></li>
                                        <li><input type="text" name="Identificación1" value={Identificación1} onChange={onChange} /></li>
                                    </ul>
                                    <ul>
                                        <li><input type="text" name="Nombres2" value={Nombres2} onChange={onChange} /></li>
                                        <li><input type="text" name="Apellidos2" value={Apellidos2} onChange={onChange} /></li>
                                        <li><input type="text" name="Tipo2" value={Tipo2} onChange={onChange} /></li>
                                        <li><input type="text" name="Identificación2" value={Identificación2} onChange={onChange} /></li>
                                    </ul>
                                    <ul>
                                        <Button text={`Agregar`} background={`var(--tartiary-color)`} types={`submit`} />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="submit-button">
                        <Button text={language.global.accept} background={`var(--primary-color)`} types={`submit`} />
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default RegisterOwners;