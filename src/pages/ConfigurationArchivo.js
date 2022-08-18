import React, {useState, useEffect, useReducer} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import { useNavigate,useLocation } from 'react-router-dom';
import './pageStyle.css';
import {Input, SelectVal, Checkbox,Checkbox2} from '../component/input';
import {Button} from '../component/buttons';
import {ConfigArchivoInfo} from '../data/InvestorInfo';
import axios from "../api/axios.js";
import {toast} from "react-toastify";
const ConfigurationArchivo = ({responsive, lang, setLang, language}) => {
  let buscar = useLocation();
  const initialState = {
    Nombre_de_la_plantilla: '',
    Tipo_de_contrato: '',
    Registro_final: '',
    Encabezado_de_control: '',
    Delimitado: 'Delimitado',
    De_ancho_fijo: 'De_ancho_fijo',
    Tabulador: 'Tabulador',
    Punto_y_coma: 'Punto_y_coma',
    Coma: 'Coma',
    Espacio: 'Espacio',
    Otro: 'Otro'
  }
  function reducer(state, { field, value }) {
      return {
          ...state,
          [field]: value
      }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChangedeli = (e) => {
      dispatch({ field: e.target.name, value: e.target.value })
      setDeli(e.target.value)
  }
  const onChangedtipo = (e) => {
    setTipo(e.target.value)
    dispatch({ field: e.target.name, value: e.target.value })
}
  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
}
  const {   Nombre_de_la_plantilla, Tipo_de_contrato, Registro_final, Encabezado_de_control, Delimitado, De_ancho_fijo, Tabulador, Punto_y_coma, Coma, Espacio, Otro } = state;
  const handleSubmit = (event) => {
      event.preventDefault();
  }
  const navigate = useNavigate();
  const [isNavigate, setNavigate] = useState(false);
  const [ID, setID] = useState('');
  
  const [deli, setDeli] = useState('');
  const [tipos, setTipo] = useState('');
  useEffect(()=>{
  const backButton = document.querySelector('.first-part .buttonwitharrow');
    if(backButton){
      backButton.addEventListener('click',() => {
        setNavigate(!isNavigate);
      });
      if(isNavigate){
        navigate(-1);
      }
    }
  },[isNavigate,navigate]);
  const AgregarCambios = ()=>{
    let array=[]
    ConfigArchivoInfo.forEach((valor)=>{
      
      let iditem=valor.item2+"opcion_longitud"
      let iditem2=valor.item2+"opcion_chek"
      let iditem3=valor.item2+"opcion_filter"
      let iditem5=valor.item2+"opcion_posici"
      let iditem4=valor.item2+"opcion_decimal"
      array.push({
        posici:document.getElementById(iditem5).value?document.getElementById(iditem5).value:'',
        longitud:document.getElementById(iditem).value?document.getElementById(iditem).value:'',
        check:document.getElementById(iditem2).checked,
        filter:document.getElementById(iditem3).value?document.getElementById(iditem3).value:'',
        decimal:document.getElementById(iditem4).value?document.getElementById(iditem4).value:''
      })
    })
    if(ID){
      actualizarFile(array)
    }else{
      CreateConfigurationArchivo(array)
    }
  }
  const checkNumber = ()=>{

    let texto="";
    ConfigArchivoInfo.forEach((elemento)=>{
      let iditem5=elemento.item2+"opcion_posici"
      if(document.getElementById(iditem5).value<=0){
        texto=texto+" "+elemento.item1+" value up to 0"
      }else{
        let error=true
        ConfigArchivoInfo.forEach((elemenot2)=>{
          if(elemenot2.item2===elemento.item2){
  
          }else{
            let iditem3=elemenot2.item2+"opcion_posici"
            if(document.getElementById(iditem3).value<=0){
  
            }else{
              if(error){
                if(document.getElementById(iditem3).value===document.getElementById(iditem5).value){
                  texto=texto+" "+elemento.item1+" equals number"
                error=false
                }
              }
              
            }
          }
        })
      }
      
    })
    if(texto){
      toast(texto)
    }else{
      AgregarCambios()
    }
  }
  const putcambios = (array)=>{
    ConfigArchivoInfo.forEach((valor)=>{
      
      let iditem=valor.item2+"opcion_longitud"
      let iditem2=valor.item2+"opcion_chek"
      let iditem3=valor.item2+"opcion_filter"
      let iditem5=valor.item2+"opcion_posici"
      let iditem4=valor.item2+"opcion_decimal"
      document.getElementById(iditem).value=array[valor.item2-1].longitud
      document.getElementById(iditem2).checked=array[valor.item2-1].check
      document.getElementById(iditem3).value=array[valor.item2-1].filter
      document.getElementById(iditem5).value=array[valor.item2-1].posici
      document.getElementById(iditem4).value=array[valor.item2-1].decimal
    })
  }
  const CreateConfigurationArchivo = (array)=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
    let valor={
      NAME_P:Nombre_de_la_plantilla,
      CONTRATO_I_CODIGO:Tipo_de_contrato,
      REGISTRO_FINAL_P:document.getElementsByName("Registro_final")[0].checked?1:0,
      ENCABEZADO_P:document.getElementsByName("Encabezado_de_control")[0].checked?1:0,
      DELIMITADO_P:document.getElementsByName("Delimitado")[0].checked?1:0,
      TABULADOR_P:document.getElementsByName("Tabulador")[0].checked?1:0,
      COMA_P:document.getElementsByName("Coma")[0].checked?1:0,
      OTRO_P:document.getElementsByName("Otro")[0].checked?1:0,
      ANCHO_P:document.getElementsByName("De_ancho_fijo")[0].checked?1:0,
      PUNTO_P:document.getElementsByName("Punto_y_coma")[0].checked?1:0,
      ESPACIO_P:document.getElementsByName("Espacio")[0].checked?1:0,
      COD_FACTURA_P:JSON.stringify(array[0]),
      COD_P:JSON.stringify(array[1]),
      IDENTIFICACION_P:JSON.stringify(array[2]),
      NOMBRES_P:JSON.stringify(array[3]),
      APELLIDOS_P:JSON.stringify(array[4]),
      CONCEPTO_P:JSON.stringify(array[5]),
      VALOR_P:JSON.stringify(array[6]),
      FECHA_P:JSON.stringify(array[7])
    }
  axios.post("/plantillaconfigbanck", valor,bearerToken)
  .then((response) => {
    navigate(-1)
    toast("Created Succes")
  }).catch((err)=>{
    if(err.response){
      if(err.response.data){
        if(err.response.status===401){
          navigate('/')
        }else{
          if(err.response.data.message){
            toast(err.response.data.message)
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
    }
  })
  }

  const actualizarFile = (array)=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
    let valor={
      NAME_P:Nombre_de_la_plantilla,
      CONTRATO_I_CODIGO:Tipo_de_contrato,
      REGISTRO_FINAL_P:document.getElementsByName("Registro_final")[0].checked?1:0,
      ENCABEZADO_P:document.getElementsByName("Encabezado_de_control")[0].checked?1:0,
      DELIMITADO_P:document.getElementsByName("Delimitado")[0].checked?1:0,
      TABULADOR_P:document.getElementsByName("Tabulador")[0].checked?1:0,
      COMA_P:document.getElementsByName("Coma")[0].checked?1:0,
      OTRO_P:document.getElementsByName("Otro")[0].checked?1:0,
      ANCHO_P:document.getElementsByName("De_ancho_fijo")[0].checked?1:0,
      PUNTO_P:document.getElementsByName("Punto_y_coma")[0].checked?1:0,
      ESPACIO_P:document.getElementsByName("Espacio")[0].checked?1:0,
      COD_FACTURA_P:JSON.stringify(array[0]),
      COD_P:JSON.stringify(array[1]),
      IDENTIFICACION_P:JSON.stringify(array[2]),
      NOMBRES_P:JSON.stringify(array[3]),
      APELLIDOS_P:JSON.stringify(array[4]),
      CONCEPTO_P:JSON.stringify(array[5]),
      VALOR_P:JSON.stringify(array[6]),
      FECHA_P:JSON.stringify(array[7])
    }
  axios.put("/plantillaconfigbanck/"+ID, valor,bearerToken)
  .then((response) => {
    navigate(-1)
    toast("Created Succes")
  }).catch((err)=>{
    if(err.response){
      if(err.response.data){
        if(err.response.status===401){
          navigate('/')
        }else{
          if(err.response.data.message){
            toast(err.response.data.message)
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
    }
  })
  }

  const  getValueIndividual = (id)=>{
    let bearerToken={
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
        axios.get("/plantillaconfigbanck/"+id, {},bearerToken)
        .then((response) => {
         let  retorno = response.data
          setID(retorno.I_CODIGO)
          document.getElementsByName("Registro_final")[0].checked=retorno.REGISTRO_FINAL_P?true:false
          document.getElementsByName("Encabezado_de_control")[0].checked=retorno.ENCABEZADO_P?true:false
          if(retorno.DELIMITADO_P){
            setDeli(initialState.Delimitado)
          }else{
            setDeli(initialState.De_ancho_fijo)
          }
          document.getElementsByName("Delimitado")[0].checked=retorno.DELIMITADO_P?true:false
          document.getElementsByName("De_ancho_fijo")[0].checked=retorno.ANCHO_P?true:false
          if(retorno.TABULADOR_P){
            setTipo(initialState.Tabulador)
          }else if(retorno.COMA_P){
            setTipo(initialState.Coma)
          }else if(retorno.OTRO_P){
            setTipo(initialState.Otro)
          }else if(retorno.PUNTO_P){
            setTipo(initialState.Punto_y_coma)
          }else if(retorno.ESPACIO_P){
            setTipo(initialState.Espacio)
          }
          document.getElementsByName("Tabulador")[0].checked=retorno.TABULADOR_P?true:false
          document.getElementsByName("Coma")[0].checked=retorno.COMA_P?true:false
          document.getElementsByName("Otro")[0].checked=retorno.OTRO_P?true:false
          document.getElementsByName("Punto_y_coma")[0].checked=retorno.PUNTO_P?true:false
          document.getElementsByName("Espacio")[0].checked=retorno.ESPACIO_P?true:false
                
          dispatch({ field: "Nombre_de_la_plantilla", value: retorno.NAME_P })
          dispatch({ field: "Tipo_de_contrato", value: retorno.CONTRATO_I_CODIGO })
          let arreglo=[]
          arreglo.push(JSON.parse(retorno.COD_FACTURA_P))
          arreglo.push(JSON.parse(retorno.COD_P))
          arreglo.push(JSON.parse(retorno.IDENTIFICACION_P))
          arreglo.push(JSON.parse(retorno.NOMBRES_P))
          arreglo.push(JSON.parse(retorno.APELLIDOS_P))
          arreglo.push(JSON.parse(retorno.CONCEPTO_P))
          arreglo.push(JSON.parse(retorno.VALOR_P))
          arreglo.push(JSON.parse(retorno.FECHA_P))
          putcambios(arreglo)
        }).catch((err)=>{
        })
  }
  useEffect(()=>{
    if(buscar){
      var valorBusqueda=buscar.search.replace("?","")
      if(valorBusqueda){
        getValueIndividual(valorBusqueda)
      }
    }
    
  },[buscar]);
  const [tipocontrato]=useState([{name:'Contrato Deuda Leasing',value:1},{name:'Contrato Inversion proyecto',value:2},{name:'Contrato Inversion inversores',value:3}])
  return (
    <div className="BankFileConfiguration">
        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.config_File.title} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
        <main className="main configSetting"> 
            <form action="" method="post" onSubmit={handleSubmit}>
              <ul>
                <Input disa={true} label={language.config_File.numerplant} type={`text`} name={`Numero_Plantilla`} value={ID} placeholder={`Automatico`} onChange={onChange} />
                <Input label={language.config_File.nombreplnat} type={`text`} name={`Nombre_de_la_plantilla`} value={Nombre_de_la_plantilla} placeholder={`Ingresor`} onChange={onChange} />
              
                <SelectVal label={language.config_File.tipcontr} name={`Tipo_de_contrato`} value={Tipo_de_contrato} placeholder={`Seleccionar`} onChange={onChange} array={tipocontrato}/>
                
              </ul>
              <ul>
                <Checkbox  label={language.config_File.regfin} name={`Registro_final`} value={Registro_final} onChange={onChange} />
                <Checkbox label={language.config_File.encacontr} name={`Encabezado_de_control`} value={Encabezado_de_control} onChange={onChange} />
              </ul>
              <ul>
                <div className="tipo">
                  <h6>{language.config_File.tyeparch}</h6>
                  <Checkbox2 checks={deli} label={language.config_File.deli} name={`Delimitado`} value={Delimitado} onChange={onChangedeli} />
                  <Checkbox2  checks={deli} label={language.config_File.anchf} name={`De_ancho_fijo`} value={De_ancho_fijo} onChange={onChangedeli} />
                </div>

                <div className="seperator">
                  <ul>
                    <h6>{language.config_File.separator}</h6>
                    <Checkbox2 checks={tipos} label={language.config_File.tab} name={`Tabulador`} value={Tabulador} onChange={onChangedtipo} />
                    <Checkbox2 checks={tipos} label={language.config_File.putocom} name={`Punto_y_coma`} value={Punto_y_coma} onChange={onChangedtipo} />
                  </ul>
                  <ul>
                    <h6 className="separator-header"> &nbsp;</h6>
                    <Checkbox2 checks={tipos} label={language.config_File.com} name={`Coma`} value={Coma} onChange={onChangedtipo} />
                    <Checkbox2 checks={tipos} label={language.config_File.esp} name={`Espacio`} value={Espacio} onChange={onChangedtipo} />
                  </ul>
                  <ul>
                    <h6 className="separator-header"> &nbsp;</h6>
                    <div>
                      <Checkbox2 checks={tipos}  label={language.config_File.otro} name={`Otro`} value={Otro} onChange={onChangedtipo} />
                      <input type="text"  id={"otrosval"}   placeholder={"ingresar"}  />
                    </div>
                  </ul>
                </div>
              </ul>
              <p>{language.config_File.esctruc}</p>
              <div className="table configArchivoTable">
                <div className="responsiveFix">
                    <div className="responsiveAuto">
                        <ul className="listHeader">
                            <li className="listHeaderItem listItem">{language.config_File.head1}</li>
                            <li className="listHeaderItem listItem">{language.config_File.head2}</li>
                            <li className="listHeaderItem listItem">{language.config_File.head3}</li>
                            <li className="listHeaderItem listItem">{language.config_File.head4}</li>
                            <li className="listHeaderItem listItem">{language.config_File.head5}</li>
                            <li className="listHeaderItem listItem">{language.config_File.head6}</li>
                        </ul>
                        {ConfigArchivoInfo.map((valor)=>{
                          let iditem=valor.item2+"opcion_longitud"
                          let iditem2=valor.item2+"opcion_chek"
                          let iditem3=valor.item2+"opcion_filter"
                          let iditem4=valor.item2+"opcion_decimal"
                          let iditem5=valor.item2+"opcion_posici"
                          return(
                            <ul className="listBody">
                            <li className='listItem firstItem'>{valor.item1}</li>
                            <li className='listItem'><input style={{width:"60%"}} type="number"  id={iditem5} placeholder={"ingresar"}   /></li>
                            <li className='listItem'><input type="number"  id={iditem} placeholder={"ingresar"}  /></li>
                            <li className='listItem'> <input type="checkbox" id={iditem2}    /></li>
                            <li className='listItem'><input type="text"  id={iditem3}   placeholder={"ingresar"}  /></li>
                            <li className='listItem'><input type="number" id={iditem4}   placeholder={"ingresar"}   /></li>
                          </ul>
                          )
                        })}
                        
                    </div>
                </div>
            </div>

              <div className="Esheet-submit">
                <Button text={language.config_File.reg} background={`var(--primary-color)`} types={`button`} click={checkNumber} />
              </div>
            </form>
        </main>
    </div>
  )
}

export default ConfigurationArchivo;