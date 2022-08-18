import React from 'react';
import './changePass.css';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '../../../component/buttons';
import { useReducer } from 'react';
import axios from "../../../api/axios.js";

const initialState = {
    Current_password: '',
    New_password:'',
    Confirm_password:''
}

function reducer(state, {field,value}) {
  return {
    ...state,
    [field]: value
  }
}

const ChangePass = ({language}) => {
  const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
  const onChange =(e)=>{
      dispatch({field: e.target.name, value: e.target.value})
  }
  const callChangePassword = ()=>{
    if(New_password===Confirm_password){

      let valor={
          token:sessionStorage.getItem("token"),
          password:New_password
        }
        axios.post("/change-password", valor)
        .then((response) => {
          navigate('/dashboard', {replace: true})
        }).catch((err)=>{
          if(err.response){
            if(err.response.data){
              if(err.response.data.message){
                alert(err.response.data.message)
              }
            }
          }
        })

    }else{
        console.log("error password")
    }
}
  const {Current_password, New_password,Confirm_password} = state;
  return (
    <div className="changePass">
        <div className="logIn">
        <h1 className='header'>{language.changepass.title}</h1>
        <p className='sub-header'>{language.changepass.subheader}</p>
        <form action="" method='Post'>
            <div className="user">
                <label htmlFor="Current_password">{language.changepass.currentpass}</label>
                <input type="password" name='Current_password' value={Current_password} onChange={onChange} placeholder='Enter'  required />
            </div>
            <div className="user">
                <label htmlFor="New_password">{language.changepass.newpass}</label>
                <input type="password" name='New_password' value={New_password} onChange={onChange} placeholder='Enter'  required />
            </div>
            <div className="user">
                <label htmlFor="Confirm_password">{language.changepass.confirmpass}</label>
                <input type="password" name='Confirm_password' value={Confirm_password} onChange={onChange} placeholder='Enter'  required />
            </div>
            <div className="submitButton">
                <Link to='/'>
                    <Button text={language.changepass.butonpass} background={`var(--primary-color)`} type={`button`} click={callChangePassword} />
                </Link>
            </div>
        </form>
    </div>
    </div>
  )
}

export default ChangePass;