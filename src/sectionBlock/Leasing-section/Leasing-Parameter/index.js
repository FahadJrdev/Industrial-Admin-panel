import React , {useState}from 'react';
import { ButtonWithArrow } from '../../../component/buttons';
import './lp.css';
import { PlanTable } from './planTable';
import axios from "../../../api/axios.js";
const LeasingParameter = ({ title ,language,cuotas,fecha,Perioricitys,formpay,montocapital,montointer}) => {
    
    const callFacturas = ()=>{
        console.log(cuotas)
        if(cuotas){
            if(fecha){
                if(Perioricitys){
                    if(formpay){
                        if(montocapital){
                            let texto=""
                            
        if(formpay===1){
            texto="Pago Efectivo"
        }else{
            texto="Transfer"

        }
                            let bearerToken={
                                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
                              }
                                  axios.get("/contractmanagementInteres/"+Perioricitys+"/"+fecha+"/"+cuotas+"/"+montocapital+"/"+texto+"/"+montointer, {},bearerToken)
                                  .then((response) => {
                                    if(response.status===200){
                                        SetFactura(response.data)
                                    }else{
                                        SetFactura([])
                                    }
                                    console.log(response)
                                  }).catch((err)=>{
                                      console.log(err)
                                    SetFactura([])
                                  })
                        }
                    }
                }
            }
        }
                 
    }
    const [one,fal]=useState(callFacturas)
    const [allFactura, SetFactura] = useState([]);
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor plan">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div>
                <PlanTable language={language} data={allFactura}  />
            </div>
        </div>
        </>
    )
}

export default LeasingParameter;