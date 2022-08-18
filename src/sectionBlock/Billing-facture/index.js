import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import './bf.css';
import { Checkbox, Input, Select } from '../../component/input';
import { FactureTable } from './tableInfo';


const TableInfo = [
    {
        item1: 'l',
        item2: 'Global S.A.S',
        item3: '12/04/2022',
        item4: '345',
        item5: 'Deuda leasing',
        item6: '$60.000',
    },
    {
        item1: 'Mini market',
        item2: 'Mils S.A.S',
        item3: '12/04/2022',
        item4: '345',
        item5: 'Deuda leasing',
        item6: '$60.000',
    },
    {
        item1: 'Justo y bueno',
        item2: 'Grilda S.A.S',
        item3: '24/06/2022',
        item4: '345',
        item5: 'Deuda leasing',
        item6: '$60.000',
    },
    {
        item1: 'Muebles',
        item2: 'Glocal S.A.S',
        item3: '24/06/2022',
        item4: '345',
        item5: 'Deuda leasing',
        item6: '$60.000',
    }
]

const initialState = {
    Individual: '',
    Massive: '',
    País: '',
    Fecha_de_corte: '',
    Fecha_de_corte1: '',
    Proyectos: '',
    Proyectos1: '',
    Generar_valores_atrasados: '',
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const BillingFacture = ({ title, language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const {  Individual, Massive, País, Fecha_de_corte, Fecha_de_corte1, Proyectos, Proyectos1, Generar_valores_atrasados } = state;
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
                <form className='information facture' action="" method='POST' onSubmit={handleSubmit}>
                    <h4>{`Selecciona el modo de factura que deseas generar`}</h4>
                    <ul className="choose">
                        <Checkbox label={`Individual`} name={`Individual`} value={Individual} onChange={onChange} />
                        <Checkbox label={`Massive`} name={`Massive`} value={Massive} onChange={onChange} />
                    </ul>
                    <ul>
                        <Select label={`País`} name={`País`} value={País} placeholder={`Enter`} onChange={onChange} value1={`País1`} value2={`País2`} value3={`País3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <Input label={`Fecha de corte`} type={`text`} name={`Fecha_de_corte`} value={Fecha_de_corte} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`&nbsp; `} type={`text`} name={`Fecha_de_corte1`} value={Fecha_de_corte1} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Proyectos`} type={`text`} name={`Proyectos`} value={Proyectos} placeholder={`Enter`} onChange={onChange} />
                        <Input label={` &nbsp;`} type={`text`} name={`Proyectos1`} value={Proyectos1} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <ul className="choose" >
                        <Checkbox label={`Generar valores atrasados`} name={`Generar_valores_atrasados`} value={Generar_valores_atrasados} onChange={onChange} />
                    </ul>
                    <div className="submit-button">
                        <Button text={`Calcular`} background={`var(--primary-color)`} types={`submit`} />
                    </div>
                    <h4 className="factureTableTitle">Resultados de la búsqueda</h4>
                    <div className="factureTable">
                        <div className="responsiveFix">
                            <div className="responsiveAuto">
                                <ul>
                                    <li className="listHeader listItem">Nombre proyecto</li>
                                    <li className="listHeader listItem">Nombre empresa</li>
                                    <li className="listHeader listItem">Fecha de corte</li>
                                    <li className="listHeader listItem">N° obligación</li>
                                    <li className="listHeader listItem">Tipo de contrato</li>
                                    <li className="listHeader listItem">Valor</li>
                                    <li className="listHeader listItem">Generar factura</li>
                                </ul>
                                {
                                    TableInfo.map((info,i)=>{
                                        return(
                                            <FactureTable key={i} info={info}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="submit-button flex-start">
                        <Button text={language.global.generate} background={`var(--primary-color)`} types={`button`} />
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default BillingFacture;