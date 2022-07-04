import React, {useReducer} from 'react';
import {FinancialHead, Input, LeasingTable} from '../Leasing-Component';
import './liquidation.css';
import {Button} from '../../../component/buttons';
import {LeasingInfo4} from '../Leasing-Component/LeasingInfo';

const Liquidation = ({language}) => {
    const initialState = {
        Start_date: '',
        Interest_fee:'',
        Adjustment_days: '',
        Number_of_quotas: '',
        Amount: '',
        Aggregate_concepts: '',
        Conceptos_descontado: '',
        Value: ''
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
    const { Start_date, Interest_fee, Adjustment_days, Number_of_quotas, Amount, Aggregate_concepts, Conceptos_descontado, Value } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }

  return (
    <div className="liquidation">
        <FinancialHead text={`Settlement configuration (Financial amortization)`} hideBtn={`dn`} />
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="liquidation-input">
                <div className="input-first">
                    <ul>
                        <Input label={`Start date`} type={`text`} name={`Start_date`} value={Start_date} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Interest fee`} type={`text`} name={`Interest_fee`} value={Interest_fee} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <ul>
                        <Input label={`Adjustment days`} type={`text`} name={`Adjustment_days`} value={Adjustment_days} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Number of quotas`} type={`text`} name={`Number_of_quotas`} value={Number_of_quotas} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                </div>
                <div className="input-second">
                    <Input label={`Amount`} type={`text`} name={`Amount`} value={Amount} placeholder={`Enter`} onChange={onChange} />
                    <Input label={`Aggregate concepts`} type={`text`} name={`Aggregate_concepts`} value={Aggregate_concepts} placeholder={`Automatic`} onChange={onChange} />
                    <Input label={`Amount`} type={`text`} name={`Amount`} value={Amount} placeholder={`Enter`} onChange={onChange} />
                    <Input label={`Conceptos descontado`} type={`text`} name={`Conceptos_descontado`} value={Conceptos_descontado} placeholder={`Automatic`} onChange={onChange} />
                    <Input label={`Value`} type={`text`} name={`Value`} value={Value} placeholder={`Automatic`} onChange={onChange} />
                </div>
            </div>
            <div className="liquidation-submit">
                <Button text={language.global.save} background={`var(--primary-color)`} types={`submit`} />
            </div>
        </form>
        <LeasingTable title={`Calculation concepts`} LeasingInfo={LeasingInfo4} language={language} />
    </div>
  )
}

export default Liquidation;