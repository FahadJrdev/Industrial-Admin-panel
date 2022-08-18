import React, {useState} from 'react'
import './Utilidades.css';
import {Button} from '../../component/buttons';
import {UtilidadesTable1,UtilidadesTable2} from '../../component/table';
import {UtilidadesInfo1,UtilidadesInfo2} from '../../data/InvestorInfo';
import Financiera from './Financiera';
import Financiera2 from './Financiera2';
import Regred from './Regred';
import VerReg from './VerReg';

const Utilidades = ({language}) => {
    const [util1,setUtil1] = useState(false);
    const [util2,setUtil2] = useState(false);
    const [financiera,setFinanciera] = useState('close');
    const [financiera2,setFinanciera2] = useState('close');
    const [regred,setRedreg] = useState('close');
    const [verReg,setVerReg] = useState('close');
    setTimeout(()=>{
        const backButton = document.querySelector('.adding-investor .header-add button');
        if(backButton){
          backButton.addEventListener('click',(e)=>{
            e.stopPropagation();
            setFinanciera("close");
            setFinanciera2("close");
            setRedreg("close");
            setVerReg("close");
          })
        }
        const addingInvestorOverlay = document.querySelector('.adding-investor-overlay');
            if(addingInvestorOverlay){
                addingInvestorOverlay.addEventListener('click',()=>{
                    setFinanciera("close");
                    setFinanciera2("close");
                    setRedreg("close");
                    setVerReg("close");
                })
            }
        const reg = document.querySelectorAll('.reg');
        if(reg){
            reg.forEach(r=>{
                r.addEventListener('click',()=>{
                    setFinanciera2("open");
                })
            })
        }
        const regRed = document.querySelectorAll('.regRed');
        if(regRed){
            regRed.forEach(r=>{
                r.addEventListener('click',()=>{
                    setRedreg("open");
                })
            })
        }
        const ver = document.querySelectorAll('.ver');
        if(ver){
            ver.forEach(r=>{
                r.addEventListener('click',()=>{
                    setVerReg("open");
                })
            })
        }
    },0)
  return (
    <>
    {
        financiera === 'open'
        ?<>
            <Financiera language={language} title={`Resgistro de información financiera `} />
        </>
        :<></>
    }
    {
        financiera2 === 'open'
        ?<>
            <Financiera2 language={language} title={`Resgistro de información financiera `} />
        </>
        :<></>
    }
    {
        regred === 'open'
        ?<>
            <Regred language={language} title={` `} />
        </>
        :<></>
    }
    {
        verReg === 'open'
        ?<>
            <VerReg language={language} title={` `} />
        </>
        :<></>
    }
    <div className="UtilidadesEx">
        <div className="Utilidades ">
            <h3>Carga de información contable</h3>
            <h5>Adjunta el archivo con el que se hará la carga contable</h5>
            <span onClick={()=>{setUtil1(!util1)}} className="archivo"><Button text={`Adjuntar archivo`} background={`var(--primary-color)`} types={`button`} /></span>
            <h4>Resultados de la carga contable</h4>
            {
                util1
                ?<></>
                :<>
                    <h6>No se pudo cargar el archivo. No es compatible.</h6>
                </>
            }
        </div>
        <div className="tables">
            {
                util1
                ?<>
                    <UtilidadesTable1 language={language} data={UtilidadesInfo1} setUtil={setUtil2} setFinanciera={setFinanciera} />
                </>
                :<></>
            }
            {
                util1 && util2
                ?<>
                    <UtilidadesTable2 language={language} data={UtilidadesInfo2} />
                </>
                :<></>
            }
        </div>
    </div>
    </>
  )
}

export default Utilidades;