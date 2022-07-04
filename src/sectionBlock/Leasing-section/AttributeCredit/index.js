import React, {useState, useReducer} from 'react';
import './AC.css';
import {FinancialHead, Input, Select, Checkbox, LeasingTable} from '../Leasing-Component';
import {Button} from '../../../component/buttons';
import {LeasingInfo3} from '../Leasing-Component/LeasingInfo';
import LeasingAttribute from '../LeasingAttribute';
const AttributeCredit = ({language}) => {
    const initialState = {
        Cumulative_value_per_year: '',
        Maximum_refinancing_amount:'',
        Monto_mínimo_refinanciable: '',
        Porcentaje_primas: '',
        Préstamos: '',
        Cubrimiento_garantía_requerido: '',
        Request: '',
        Credit_analysis: '',
        Approval: '',
        Document_generation: '',
        Disbursement: ''
    }
    
    function reducer(state, { field, value }) {
        return {
            ...state,
            [field]: value
        }
    }
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { Cumulative_value_per_year, Maximum_refinancing_amount, Monto_mínimo_refinanciable, Porcentaje_primas, Préstamos, Cubrimiento_garantía_requerido, Request, Credit_analysis, Approval, Document_generation, Disbursement } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }

    const [attemptToAddAttribute, setAttemptToAddAttribute] = useState('close');
  setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
      backButton.addEventListener('click',()=>{
        setAttemptToAddAttribute('close');
      })
    }
    const addingParamrOverlay = document.querySelector('.adding-investor-overlay');
    if(addingParamrOverlay){
      addingParamrOverlay.addEventListener('click',()=>{
        setAttemptToAddAttribute('close');
      })
    }
    const addParam = document.querySelector('.AttributeCredit .financial-head button');
    if(addParam){
      addParam.addEventListener('click',()=>{
        setAttemptToAddAttribute('open');
      })
    }
  })
  return (
    <>
    {
        attemptToAddAttribute === `open`
        ?<LeasingAttribute title={`New Attribute`} language={language} />
        :<></>
      }

    <div className="AttributeCredit">
        <FinancialHead text={`Configuration of credit attributes `} btntext={`New Attribute`}/>
        <div className="tapes">
            <p className={`tapes-title`}>Tapes</p>
            <form action="" method="post" onSubmit={handleSubmit}>
                <div className="tapes-form">
                    <div className="tapes-input">
                        <ul>
                            <Input label={`Cumulative value per year`} type={`text`} name={`Cumulative_value_per_year`} value={Cumulative_value_per_year} placeholder={`Enter`} onChange={onChange} />
                            <Select label={`Maximum refinancing amount`} name={`Maximum_refinancing_amount`} value={Maximum_refinancing_amount} placeholder={`Select`} onChange={onChange} value1={`Maximum_refinancing_amount-1`} value2={`Maximum_refinancing_amount-2`} value3={`Maximum_refinancing_amount-3`} value4={`Maximum_refinancing_amount-4`} hideValue5={`dn`}/>
                        </ul>
                        <ul>
                            <Select label={`Monto mínimo refinanciable`} name={`Monto_mínimo_refinanciable`} value={Monto_mínimo_refinanciable} placeholder={`Select`} onChange={onChange} value1={`Monto_mínimo_refinanciable-1`} value2={`Monto_mínimo_refinanciable-2`} value3={`Monto_mínimo_refinanciable-3`} value4={`Monto_mínimo_refinanciable-4`} hideValue5={`dn`}/>
                            <Select label={`Porcentaje primas`} name={`Porcentaje_primas`} value={Porcentaje_primas} placeholder={`Select`} onChange={onChange} value1={`Porcentaje_primas-1`} value2={`Porcentaje_primas-2`} value3={`Porcentaje_primas-3`} value4={`Porcentaje_primas-4`} hideValue5={`dn`}/>
                        </ul>
                        <ul>
                            <Select label={`Préstamos`} name={`Préstamos`} value={Préstamos} placeholder={`Select`} onChange={onChange} value1={`Préstamos-1`} value2={`Préstamos-2`} value3={`Préstamos-3`} value4={`Préstamos-4`} hideValue5={`dn`}/>
                            <Select label={`Cubrimiento garantía requerido`} name={`Cubrimiento_garantía_requerido`} value={Cubrimiento_garantía_requerido} placeholder={`Select`} onChange={onChange} value1={`Cubrimiento_garantía_requerido-1`} value2={`Cubrimiento_garantía_requerido-2`} value3={`Cubrimiento_garantía_requerido-3`} value4={`Cubrimiento_garantía_requerido-4`} hideValue5={`dn`}/>
                        </ul>
                    </div>
                    <div className="tapes-checkbox">
                        <div className="tapes-checking">
                            <div className="tapes-checking-area">
                                <Checkbox label={`Request`} name={`Request`} value={Request} onChange={onChange} />
                                <Checkbox label={`Credit analysis`} name={`Credit_analysis`} value={Credit_analysis} onChange={onChange} />
                                <Checkbox label={`Approval`} name={`Approval`} value={Approval} onChange={onChange} />
                                <Checkbox label={`Document generation`} name={`Document_generation`} value={Document_generation} onChange={onChange} />
                                <Checkbox label={`Disbursement`} name={`Disbursement`} value={Disbursement} onChange={onChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tapes-submit">
                    <Button text={language.global.save} background={`var(--primary-color)`} types={`submit`} />
                </div>
            </form>
        </div>
        <LeasingTable title={`Attributes`} LeasingInfo={LeasingInfo3} language={language} />
    </div>
    </>
  )
}

export default AttributeCredit;