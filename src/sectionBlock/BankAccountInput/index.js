import React, {useReducer} from 'react';
import { Input, SelectVal } from '../Leasing-section/Leasing-Component';
import {Button} from '../../component/buttons';
import './BAI.css';

const initialState = {
    Customer_code: '',
    Identity: '',
    Names: '',
    Surname: '',
    Operación_a_realizar: '',
    Tipo_de_orden: '',
    Número_de_orden: '',
    Número_de_orden2: '',
    Proyecto: ''
  }
  
  function reducer(state, { field, value }) {
      return {
          ...state,
          [field]: value
      }
  }

export const BankAccountInput = ({language, setSearch,array,funcion}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { Customer_code, Identity,  Names,surname} = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    const consult = () => {
        var search = new RegExp(Customer_code , 'i');
        var search2 = new RegExp(Identity , 'i');
        var search3 = new RegExp(Names , 'i');
        var search4 = new RegExp(surname , 'i');
        let searchEnd = array.filter(item => search.test(item.CODE_BANK_FILE) && search2.test(item.I_CODIGO) && search3.test(item.NAME_BANK_FILE) && search4.test(item.APELLIDO_BANK_FILE) )
            if(searchEnd.length>0){
                setSearch("yes")
                funcion(searchEnd[0]['I_CODIGO'])
            }
    }
  return (
    <div className="BankAccountInput">
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="inputs-part">
                <ul className="Esheet">
                    <Input label={language.bankfile_config.customcode} type={`text`} name={`Customer_code`} value={Customer_code} placeholder={`Enter`} onChange={onChange} />
                    <Input label={language.bankfile_config.identity} type={`text`} name={`Identity`} value={Identity} placeholder={`Enter`} onChange={onChange} />
                    <Input label={language.bankfile_config.name} type={`text`} name={`Names`} value={Names} placeholder={`Enter`} onChange={onChange} />
                    <Input label={language.bankfile_config.surname} type={`text`} name={`surname`} value={surname} placeholder={`Enter`} onChange={onChange} />
                </ul>
            </div>
            <div className="bank-submit">
                <span onClick={consult}>
                    <Button text={language.global.consult} background={`var(--primary-color)`} types={`button`} click={consult} />
                </span>
            </div>
        </form>
    </div>
  )
}

export const BankAccountInput2 = ({language, setSearch,array,funcion}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { Operación_a_realizar, Tipo_de_orden,  Número_de_orden, Número_de_orden2, Proyecto} = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    const consult = () => {
        var search = new RegExp(Operación_a_realizar , 'i');
        var search2 = new RegExp(Tipo_de_orden , 'i');
        var search3 = new RegExp(Número_de_orden , 'i');
        var search4 = new RegExp(Número_de_orden2 , 'i');
        var search5 = new RegExp(Proyecto , 'i');
        let searchEnd = array.filter(item => search.test(item.CODE_BANK_FILE) && search2.test(item.I_CODIGO) && search3.test(item.NAME_BANK_FILE) && search4.test(item.APELLIDO_BANK_FILE) && search5.test(item.APELLIDO_BANK_FILE));
            if(searchEnd.length>0){
                setSearch("yes")
                funcion(searchEnd[0]['I_CODIGO'])
            }
    }
  return (
    <div className="BankAccountInput">
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="inputs-part">
                <ul className="Esheet">
                    <SelectVal label={`Operación a realizar`} name={`Operación_a_realizar`} value={Operación_a_realizar} placeholder={`select`} onChange={onChange} value1={`Operación_a_realizar1`} value2={`Operación_a_realizar2`} value3={`Operación_a_realiza3`} hideValue4={`dn`} hideValue5={`dn`} />
                    <SelectVal label={`Tipo de orden`} name={`Tipo_de_orden`} value={Tipo_de_orden} placeholder={`select`} onChange={onChange} value1={`Tipo_de_orden1`} value2={`Tipo_de_orden2`} value3={`Tipo_de_orden3`} hideValue4={`dn`} hideValue5={`dn`} />
                    <Input label={`Número de orden`} type={`text`} name={`Número_de_orden`} value={Número_de_orden} placeholder={`Enter`} onChange={onChange} />
                    <Input label={`&nsbp; `} type={`text`} name={`Número_de_orden2`} value={Número_de_orden2} placeholder={`Enter`} onChange={onChange} />
                    <Input label={`Proyecto`} type={`text`} name={`Proyecto`} value={Proyecto} placeholder={`Enter`} onChange={onChange} />
                </ul>
            </div>
            <div className="bank-submit">
                <span onClick={consult}>
                    <Button text={language.global.consult} background={`var(--primary-color)`} types={`button`} click={consult} />
                </span>
            </div>
        </form>
    </div>
  )
}

