import React, {useState, useEffect} from 'react';
import './basicInfo.css';
import { AiFillEdit } from "react-icons/ai";
import { useReducer } from 'react';
import { Button } from '../../../component/buttons';
import axios from "../../../api/axios.js";

const initialState = {
  Names: 'Luis Eduardo',
  Surname:'Salamanza Arias',
  email:sessionStorage.getItem("infoUser")?JSON.parse(sessionStorage.getItem("infoUser")).email.toString():"",
  gender:'Masculine',
  phone:'+57314567765'
}

function reducer(state, {field,value}) {
  return {
    ...state,
    [field]: value
  }
}

const BasicInfo = ({language}) => {
  
  const [isEditing, setEditing] = useState('no');
  useEffect(()=>{
    const editElement = document.querySelector('.BasicInfo ul li svg');
    if(editElement){
      editElement.addEventListener('click',()=>{
        setEditing('yes');
      })
    }
    const submitButton = document.querySelector('.BasicInfo ul li button');
    if(submitButton){

      submitButton.addEventListener('click',()=>{
        setEditing('no');
      })
    }
  },[])
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange =(e)=>{
      dispatch({field: e.target.name, value: e.target.value})
  }
  const {Names, Surname, email, gender, phone} = state;

  const callUpdateUser = ()=>{
    let bearerToken={
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
      let valor={
        C_APELLIDOS:Surname,
        C_CELULAR:phone,
        C_FAX:phone,
        TIPO_ROL_I_CODIGO:"",
        TIPO_DOCUMENTO_I_CODIGO:"",
        PAIS_I_CODIGO:"",
        C_CODIGO_POSTAL:"",
        DOCUMENTO_PERSONA_I_CODIGO:"",
        C_NOMBRES:Names
        }
        axios.put("/persons/"+sessionStorage.getItem("infoUser").id, valor,bearerToken)
        .then((response) => {
          console.log(response)
        }).catch((err)=>{
          console.log(err)
          if(err.response){
            if(err.response.data){
              if(err.response.data.message){
                alert(err.response.data.message)
              }
            }
          }
        })

}
  return (
    <>
      <form action="" method='POST' className='BasicInfo'>
        <ul>
          <li style={{order: 2}}>
            <label htmlFor="Names">{language.profile.name}</label>
            {
              isEditing==='no'
              ?<p>Luis Eduardo</p>
              :<input type="text" name='Names' value={Names} onChange={onChange} />
            }
          </li>
          <li style={{order: 3}}>
            <label htmlFor="Surname">{language.profile.surname}</label>
            {
              isEditing ==='no'
              ?<p>Salamanza Arias</p>
              :<input type="text" name='Surname' value={Surname} onChange={onChange} />
            }
          </li>
          <li style={{order: 5}}>
            <AiFillEdit />
          </li>
        </ul>
        <ul>
          <li>
            <label htmlFor="email">{language.profile.email}</label>
            {
              isEditing==='no'
              ?<p>{email}</p>
              :<input type="text" name='email' value={email} onChange={onChange} />
            }
          </li>
        </ul>
        <ul>
          <li>
            <label htmlFor="gender">{language.profile.gender}</label>
            {
              isEditing === 'no'
              ?<p>Masculine</p>
              :<input type="text" name='gender' value={gender} onChange={onChange} />
            }
          </li>
        </ul>
        <ul>
          <li>
            <label htmlFor="phone">{language.profile.telephone}</label>
            {
              isEditing==='no'
              ?<p>+57314567765</p>
              :<input type="text" name='phone' value={phone} onChange={onChange} />
            }
          </li>
        </ul>
        <div className="submit-button">
          {
            isEditing==='no'
            ?<></>
            :<Button text={language.global.save} background={`var(--primary-color)`} types={`button`} click={callUpdateUser}/>
          }
        </div>
      </form>
    </>
  )
}

export default BasicInfo;