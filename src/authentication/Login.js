import React, {useReducer} from 'react';
import './authentication.css';
import { Link } from 'react-router-dom';
import { Button } from '../component/buttons';
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import axios from "../api/axios.js";
const initialState = {
  user: '',
  password: ''
}

function reducer(state, {field,value}) {
  return {
    ...state,
    [field]: value
  }
}
const Login = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange =(e)=>{
    dispatch({field: e.target.name, value: e.target.value})
  }
  const callApiLogin = ()=>{
    let valor={
      email:user,
      password:password
    }
    axios.post("/login", valor)
    .then((response) => {
      if(response.status===200){
        if(response.data){
          sessionStorage.setItem("token",response.data.token)
          sessionStorage.setItem("infoUser",JSON.stringify(response.data.user))
          navigate('/Dashboard', {replace: true})
        }
      }
    }).catch((err)=>{
      if(err.response){
        if(err.response.data){
          if(err.response.data.message){
            toast(err.response.data.message);
          }else{
            let message="";
            let valorKeys=Object.keys(err.response.data.error)
            valorKeys.forEach(element => {
              err.response.data.error[element].forEach((mensaje)=>{
                message+=mensaje+" ,"
              })
            });
            
            toast(message);
          }
        }
      }
    })
  }

  const {user, password} = state;
  return (
      <div className="welcome">
          <div className="welcoming">
            <img className='logo' src="img/navbar-icon/logo.png" alt="logo" />
            <img className='welcome-show' src="img/welcome.png" alt="welcome" />
            <div className="logIn">
              <h1 className='header'>Welcome</h1>
              <p className='sub-header'>Please Log In</p>
              <form action="" method='Post'>
                <div className="user">
                  <label htmlFor="user">User</label>
                  <input type="text" name='user' value={user} onChange={onChange} placeholder='Enter User'  required />
                </div>
                <div className="password">
                  <label htmlFor="password">Password</label>
                  <input type="password" name='password' value={password} onChange={onChange} placeholder='Enter Password' required />
                </div>
                <div className="remember-forget">
                  <p className="remember">Remember my user</p>
                  <Link to='/forget-password'>
                    <p className="forget">I Forgot My Password</p>
                  </Link>
                </div>
                
              </form>
              <div className="submitButton">
                    <Button text={`Start Sessions`} background={`var(--primary-color)`}  click={callApiLogin}/>
                </div>
          </div>
        </div>
      </div>
    )
}

export default Login;