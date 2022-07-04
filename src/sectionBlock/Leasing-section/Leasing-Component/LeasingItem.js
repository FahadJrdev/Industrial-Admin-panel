import React, {useState, useReducer} from 'react';
import './component.css';
import { AiFillEdit } from "react-icons/ai";
import {Button} from '../../../component/buttons';


const LeasingItem = ({info,language}) => {
    const initialState = {
        v1: '',
        v2: '',
        v3: '',
        v4: '',
        v5: '',
        v6: '',
        v7: '',
        v8: '',
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
    const { v1,v2,v3,v4,v5,v6,v7,v8 } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    const [edit,setEdit] = useState(false);
  return (
        <form action="" method="post" onSubmit={handleSubmit}>
            <ul className="leasing-item">
                <li className={info.h1} style={{width: info.w1}}>
                    {
                        edit
                        ?<><input type="text" name="v1" value={v1} onChange={onChange} placeholder={`Enter`} /></>
                        :<>{info.l1}</>
                    }
                </li>
                <li className={info.h2} style={{width: info.w2}}>
                {
                        edit
                        ?<><input type="text" name="v2" value={v2} onChange={onChange} placeholder={`Enter`} /></>
                        :<>{info.l2}</>
                    }
                </li>
                <li className={info.h3} style={{width: info.w3}}>
                    {
                        edit
                        ?<><input type="text" name="v3" value={v3} onChange={onChange} placeholder={`Enter`} /></>
                        :<>{info.l3}</>
                    }
                </li>
                <li className={info.h4} style={{width: info.w4}}>
                    {
                        edit
                        ?<><input type="text" name="v4" value={v4} onChange={onChange} placeholder={`Enter`} /></>
                        :<>{info.l4}</>
                    }
                </li>
                <li className={info.h5} style={{width: info.w5}}>
                    {
                        edit
                        ?<><input type="text" name="v5" value={v5} onChange={onChange} placeholder={`Enter`} /></>
                        :<>{info.l5}</>
                    }
                </li>
                <li className={info.h6} style={{width: info.w6}}>
                    {
                        edit
                        ?<><input type="text" name="v6" value={v6} onChange={onChange} placeholder={`Enter`} /></>
                        :<>{info.l6}</>
                    }
                </li>
                <li className={info.h7} style={{width: info.w7}}>
                    {
                        edit
                        ?<><input type="text" name="v7" value={v7} onChange={onChange} placeholder={`Enter`} /></>
                        :<>{info.l7}</>
                    }
                </li>
                <li className={info.h8} style={{width: info.w8}}>
                    {
                        edit
                        ?<><input type="text" name="v8" value={v8} onChange={onChange} placeholder={`Enter`} /></>
                        :<>{info.l8}</>
                    }
                </li>
                <li className={info.h9} style={{width: info.w9}}>
                    {
                        edit
                        ?<Button text={language.global.save} background={`var(--primary-color)`} types="submit" />
                        :<span onClick={()=>{setEdit(!edit)}}>{info.l9}<AiFillEdit /></span>
                    }
                </li>
            </ul>
        </form>
  )
}

export default LeasingItem;