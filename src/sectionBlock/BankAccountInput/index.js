import React, {useReducer} from 'react';
import { Input } from '../Leasing-section/Leasing-Component';
import {Button} from '../../component/buttons';
import './BAI.css';

const initialState = {
    Customer_code: '',
    Identity: '',
    Names: '',
    Surname: ''
  }
  
  function reducer(state, { field, value }) {
      return {
          ...state,
          [field]: value
      }
  }

const BankAccountInput = ({language, setSearch}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { Customer_code, Identity,  Names, Surname} = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    const consult = () => {
        if(setSearch){
            setSearch("yes");
        }
    }
  return (
    <div className="BankAccountInput">
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="inputs-part">
                <ul className="Esheet">
                    <Input label={`Customer code`} type={`text`} name={`Customer_code`} value={Customer_code} placeholder={`Enter`} onChange={onChange} />
                    <Input label={`Identity`} type={`text`} name={`Identity`} value={Identity} placeholder={`Enter`} onChange={onChange} />
                    <Input label={`Names`} type={`text`} name={`Names`} value={Names} placeholder={`Enter`} onChange={onChange} />
                    <Input label={`Surname`} type={`text`} name={`Surname`} value={Surname} placeholder={`Enter`} onChange={onChange} />
                </ul>
            </div>
            <div className="bank-submit">
                <span onClick={consult}>
                    <Button text={`Consult`} background={`var(--primary-color)`} types={`submit`} />
                </span>
            </div>
        </form>
    </div>
  )
}

export default BankAccountInput;