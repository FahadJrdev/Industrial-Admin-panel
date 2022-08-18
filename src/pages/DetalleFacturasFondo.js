import React, {useState, useEffect} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import { useNavigate,useLocation } from 'react-router-dom';
import {ConfigCard} from '../component/cards';
import Tab from '../component/tab';
import {BillingDetailTable} from '../component/table';
import Invoice from '../sectionBlock/IngresosInvoice';
import BillingFacture from '../sectionBlock/Billing-facture'; 
import './pageStyle.css';
import {Button} from '../component/buttons';
import axios from "../api/axios.js";

const BillingDetail = ({responsive, lang, setLang, language}) => {
    const [currentPage, setCurrentPage] = useState(1);
  
    let buscar = useLocation();
    const navigate = useNavigate();
    const [id, setID] = useState("");
    const [idInvoce, setIDINVOCE] = useState("");
    const [facturasReno, AnulacionRenova] = useState({});
    const [invoice, setAllInvoce] = useState([]);
    const [isNavigate, setNavigate] = useState(false);
    const [inVoice, setInvoice] = useState("close");
    const [expire, setExpire] = useState("close");
    const [facture, isfacture] = useState('close');
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
      setTimeout(()=>{
        const backButton = document.querySelector('.adding-investor .header-add button');
        if(backButton){
          backButton.addEventListener('click',()=>{
            setInvoice("close");
            setExpire("close");
            isfacture("close");
          })
        }
        const addingInvestorOverlay = document.querySelector('.adding-investor-overlay');
        if(addingInvestorOverlay){
          addingInvestorOverlay.addEventListener('click',()=>{
            setInvoice("close");
            setExpire("close");
            isfacture("close");
          })
        }
        const invoice = document.querySelectorAll(".billingTable .invoiceBtn2");
        if(invoice){
          invoice.forEach((voice)=>{
            voice.addEventListener("click",()=>{
              setIDINVOCE(JSON.parse(voice.dataset.state).id)
              if (voice.dataset.state.state !== "Pagado"){
                setInvoice("open");
              }else if (voice.dataset.state.state === "Sin pagar"){
                setExpire("open");
              }
            })
          })
        }
      })
      const callInvoiceFunds =(ids)=>{
        let bearerToken={
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
            axios.get("/revenuemanagementBillingFundsId/"+ids, {},bearerToken)
            .then((response) => {
              if(response.status===200){
                setAllInvoce(response.data)
              }else{
                setAllInvoce([])
              }
            }).catch((err)=>{
                
              setAllInvoce([])
            })
      }
      
      const InvoiceAnulacionRenova =(ids,value)=>{
        let bearerToken={
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
            axios.put("/invoiceanul/"+ids+"/"+value, {},bearerToken)
            .then((response) => {
              if(response.status===200){
                callInvoiceFunds(id)
              }
            }).catch((err)=>{
            })
      }
      useEffect(()=>{
        if(buscar){
          var valorBusqueda=buscar.search.replace("?","")
          setID(valorBusqueda)
          callInvoiceFunds(valorBusqueda)
        }
    
      },[buscar,isNavigate,navigate]);
      useEffect(()=>{
        if(facturasReno){
          if(facturasReno.id){
            InvoiceAnulacionRenova(facturasReno.id,facturasReno.value)
          }
        }
      },[facturasReno,AnulacionRenova]);

  return (
    <>
      {
        inVoice === "open"
        ?<Invoice language={language} idinvoce={idInvoce} close={setInvoice} state={language.billing_detail.invoice_detanotyet} color={`#85B900`} />
        :<></>
      }
      {
        expire === "open"
        ?<Invoice language={language} idinvoce={idInvoce} close={setInvoice}  state={language.billing_detail.invoice_detaexp} color={`#DE5753`} />
        :<></>
      }
      {
        facture === "open"
        ?<BillingFacture language={language} title={`Generación de facturas`} />
        :<></>
      }
      <div className="Billing">
        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.billing_detail.title +" "+ id} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
        <main className="main billing billing-deatil">
            <ConfigCard language={language} />
            <span onClick={()=>{isfacture('open')}} className="facturas">
              <Button text={`Generación de facturas`} background={`var(--tartiary-color)`} types={`button`} />
            </span>       
            <Tab hideTab1={`dn`} hideTab2={`dn`} hideTab3={`dn`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} inactive={`inactive`} hideCustomizer={`flex`} />
            <BillingDetailTable header1={language.billing_detail.header1}  header2={language.billing_detail.header2}  header3={language.billing_detail.header3}  header4={language.billing_detail.header4} header5={language.billing_detail.header5}  header6={language.billing_detail.header6} data={invoice} currentPage={currentPage} setCurrentPage={setCurrentPage} funcionFacts={AnulacionRenova} />
        </main>
      </div>
    </>
  )
}

export default BillingDetail;