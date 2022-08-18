import React, { useState , useReducer} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import {Button} from '../component/buttons'
import {ConfigCard} from '../component/cards';
import {Link} from 'react-router-dom';
import {RevenueTable1, RevenueTable2} from '../component/table';
import PagoManual from '../sectionBlock/Pago-Manual';
import './pageStyle.css';
import {Input} from '../component/input';
import PagoProyecto from '../sectionBlock/Pago-proyecto';
import PagoOtros from '../sectionBlock/Pago-otros';
import PagoFactura from '../sectionBlock/Pago-factura';
import axios from "../api/axios.js";
import {toast} from "react-toastify";
import { useNavigate} from 'react-router-dom';

const Revenues = ({lang, setLang, language, responsive}) => {
  const navigates = useNavigate();

  const initialState = {
    Número_de_plantilla: ''
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
  const {  Número_de_plantilla } = state;
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(state);
  }

  const [pagoManual, setPagoManual] = useState("close");
  const [pagoProyecto, setPagoProyecto] = useState("close");
  const [pagoOtros, setPagoOtros] = useState("close");
  const [dataFile, setFileData] = useState([]);
  const [dataFile2, setFileData2] = useState([]);
  const [pagoFactura, setPagoFactura] = useState("close");
  const [RTable1, setRTable1] = useState(false);
  const [filename, setfilename] = useState('');
  const [RTable2, setRTable2] = useState("close");
  setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
      backButton.addEventListener('click',()=>{
        setPagoManual("close");
        setPagoProyecto("close");
        setPagoOtros("close");
        setPagoFactura("close");
      })
    }
    const addingInvestorOverlay = document.querySelector('.adding-investor-overlay');
    if(addingInvestorOverlay){
      addingInvestorOverlay.addEventListener('click',()=>{
        setPagoManual("close");
        setPagoProyecto("close");
        setPagoOtros("close");
        setPagoFactura("close");
      })
    }
    
    const regbtn1 = document.querySelector(".revenues .reg1 button");
    if(regbtn1){
      regbtn1.addEventListener("click",()=>{
        setPagoProyecto("open");
      })
    }
    const regbtn2 = document.querySelector(".revenues .reg2 button");
    if(regbtn2){
      regbtn2.addEventListener("click",()=>{
        setPagoOtros("open");
      })
    }
    const regbtn3 = document.querySelector(".revenues .reg3 button");
    if(regbtn3){
      regbtn3.addEventListener("click",()=>{
        setPagoFactura("open");
      })
    }
  })
  const putname =(event)=>{
    var imagefile =document.getElementById('selectFile');
    setfilename(imagefile.files[0].name)
  }
  const selectFIle =  ()=>{
    document.getElementById('selectFile').click()
  }
  const checkFile=()=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
    var formData = new FormData();
    var imagefile =document.getElementById('selectFile');
    formData.append("FILE", imagefile.files[0]);
        axios.post("/revenuemanagementUploadInvoicePagoVerif",formData,bearerToken)
        .then((response) => {
          let valorretorno=response.data.eventos
          setFileData(valorretorno)
          setRTable1(true)
        }).catch((err)=>{
          if(err.response){
            if(err.response.data){
              if(err.response.status===401){
                navigates('/')
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
  
  const pagos=()=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
    var formData = new FormData();
    var imagefile =document.getElementById('selectFile');
    formData.append("FILE", imagefile.files[0]);
        axios.post("/revenuemanagementUploadInvoicePago",formData,bearerToken)
        .then((response) => {
          let valorretorno=response.data
          setFileData2(valorretorno)
          setRTable2("open")
        }).catch((err)=>{
          if(err.response){
            if(err.response.data){
              if(err.response.status===401){
                navigates('/')
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
  return (
    <>
      {
        pagoManual === "open"
        ?<PagoManual title={language.revenues.payman} language={language} />
        :<></>
      }
      {
        pagoProyecto === "open"
        ?<PagoProyecto title={`Información del proyecto`} language={language} />
        :<></>
      }
      {
        pagoOtros === "open"
        ?<PagoOtros title={`Otros ingresos`} language={language} />
        :<></>
      }
      {
        pagoFactura === "open"
        ?<PagoFactura title={ `Información factura`} language={language} />
        :<></>
      }
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.revenues.title} pageDesc ={language.revenues.desc} displaySearch={`show`} />
      <main className='main revenues'>  
        <ConfigCard language={language} /> 
        <div className="Esheet-submit">
          <Link to="/Billing">
            <Button text={language.revenues.invoince} background={`var(--primary-color)`} types={`button`} />
          </Link>
        </div>
        <div className="Esheet-submit cargar">
          <h2>{language.revenues.aplicacioning}</h2>
          <p>{language.revenues.carg_arch+filename}</p>
          <form action="" method="post" onSubmit={handleSubmit}>
            <Input label={language.revenues.numplant} type={`text`} name={`Número_de_plantilla`} value={Número_de_plantilla} placeholder={`Enter`} onChange={onChange} />
           
            <input id="selectFile" type="file" style={{display:"none"}} onChange={putname}/>
            <Button text={language.revenues.uploadfile} background={`var(--primary-color)`} types={`button`} click={selectFIle} />
            {filename?<>
            
              <Button text={language.revenues.configurecheck} background={`var(--tartiary-color)`} types={`button`} click={checkFile} />
            </>:<></>}
          </form>
        </div>
        <div className="tables">
          {
            RTable1
            ?<>
              <RevenueTable1 data={dataFile} language={language} showpago={pagos} />
            </>
            :<></>
          }
          {
            RTable2 === "open"
            ?<>
              <RevenueTable2 data={dataFile2} language={language} setPagoManuals={setPagoManual} 
              setPagoInversion={ setPagoProyecto}
              SetPagoOtro={setPagoOtros}
              />
            </>
            :<></>
          }
        </div>
      </main>
    </>
  )
}

export default Revenues;