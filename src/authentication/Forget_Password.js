import React, {useReducer, useState} from 'react';
import {Link} from 'react-router-dom';
import { Button } from '../component/buttons';
import { IoCheckmarkCircleOutline } from "react-icons/io5";

import {toast} from "react-toastify";
import axios from "../api/axios.js";
const initialState = {
  email: ''
}

function reducer(state, {field,value}) {
  return {
    ...state,
    [field]: value
  }
}

const ForgetPassword = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange =(e)=>{
      dispatch({field: e.target.name, value: e.target.value})
  }
  const [isReset, setReset] = useState(false);
  const reset = () => {
      setReset(!isReset);
  }
  const {email} = state;
  const callForget_password = ()=>{
    let valor={
      email:email
    }
    axios.post("/forget-password", valor)
    .then((response) => {
        reset();
      console.log(response)
    }).catch((err)=>{
      if(err.response){
        if(err.response.data){
          if(err.response.data.message){
            toast(err.response.data.message);
          }
        }
      }
    })
  }
  return (
    <div className="welcome forget-password">
        <div onClick={reset} className={`forget-overlay ${isReset?``:`dn`}`}></div>
        <div className={`message ${isReset?``:`dn`}`}>
            <IoCheckmarkCircleOutline/>
            <p>Tu clave ha sido enviada al</p>
            <p>correo suministrado</p>
            <Link to='/change-password'>
                <Button text={`Ok`} background={`var(--primary-color)`} />
            </Link>
        </div>
        <div className="welcoming">
            <img className='logo' src="img/navbar-icon/logo.png" alt="logo" />
            <img className='hi-show' src="img/Hi.png" alt="welcome" />
            <div className="logIn">
                <h1 className='header'>You Forgot Your Password.</h1>
                <p className='sub-header'>Please Enter Your Email </p>
                <form action="/forget-password" method='Post'>
                    <div className="user">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' value={email} onChange={onChange} placeholder='Enter Email'  required />
                    </div>
                    <div className="submitButton">
                        <div style={{display: 'inline-block'}}>
                            <Button text={`Reset`} background={`var(--primary-color)`} types={`button`} click={callForget_password}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword;