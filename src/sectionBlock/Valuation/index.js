import React, {useState, useReducer} from 'react';
import './valuation.css';
import {Button} from '../../component/buttons';
import { AiFillEdit } from "react-icons/ai";

const initialState = {
    methodology: 'Discounted cash flow method is used for valuing the investment company and its projects. The discount rate used in the valuation is based on the aggregate risk factors from the investments of the company determined at the time of evaluating these investments adjusted for any new observable information. At end of Q3 2021 a discount rate of 13.1% was applied to projected future cash flows.'
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}

const Valuation = ({language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { methodology } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
  const [isEdit, setEdit] = useState(false);  

  return (
    <div className="valuation">
        <div className="action">
            <span onClick={()=>{setEdit(!isEdit)}}>
                <AiFillEdit />
            </span>
        </div>
        <div className="valuation-body">
            <form action="" method="post"  onSubmit={handleSubmit}>
            {
                isEdit
                ?<textarea name="methodology" rows="5" cols="15"  value={methodology} onChange={onChange} placeholder='Enter'></textarea>
                :<p>Discounted cash flow method is used for valuing the investment company and its projects. The discount rate used in the valuation is based on the aggregate risk factors from the investments of the company determined at the time of evaluating these investments adjusted for any new observable information. At end of Q3 2021 a discount rate of 13.1% was applied to projected future cash flows.</p>
            }
            {
                isEdit
                ?<div className="submit">
                    <Button text={language.global.save} background={`var(--primary-color)`} types={`submit`} />
                </div>
                :<></>
            }
            </form>
        </div>
    </div>
  )
}

export default Valuation;