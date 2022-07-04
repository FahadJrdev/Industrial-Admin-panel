import React, {useState, useEffect} from 'react';
import './navbar.css';
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { HandShake, Project, Revenue, Expense, Report, Configuration, Help, FondosIcon } from '../../../component/icon/icon';
import axios from "../../../api/axios.js";
import Logo from './Logo';
import ProfileNotification from './ProfileNotification';
function Navbar({lang, setLang, language}) {
  const navigate = useNavigate();
  const location = useLocation();
  const getActiveColor = (activeColor) => {
    if(location.pathname===activeColor){
      return 'active';
    }
  }
  const callLogout = ()=>{
    let valor={
        token:sessionStorage.getItem("token")
    } 
    
    let bearerToken={
        headers: { Authorization: `bearer `+sessionStorage.getItem("token") }
      }
    axios.post("/logout", valor,bearerToken)
    .then((response) => {
      if(response.status===200){
        if(response.data){
          navigate('/', {replace: true})

        }
      }
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
  const [navBar,setNavBar] = useState('close');
  useEffect(()=>{
    const asideBar = document.querySelector('aside .bar');
    if(asideBar){
      asideBar.addEventListener('click',()=>{
        setNavBar('close');
      })
    }
  },[])
  setTimeout(()=>{
    const headerBar = document.querySelector('header .bar');
    if(headerBar){
      headerBar.addEventListener('click',()=>{
        setNavBar('open');
      })
    }
  })
  return (<>{
              navBar==="open"
              ?<div onClick={()=>setNavBar("close")} className="overlay navbar"></div>
              :<></>
            }  
            <aside className={`sidebar ${navBar==="open"?"open":''}`}>
              <Logo lang={lang} setLang={setLang} />
              <ProfileNotification language={language} callLogout={callLogout} getActiveColor={getActiveColor}/>
              <div className="sidebar-wrapper">
                <div className="sidebar-component">
                  <ul className="header-menu">
                    <Link className={`header-menu-item ${getActiveColor('/Dashboard')}`} to='/Dashboard'><MdOutlineDashboardCustomize /><p>Dashboard</p></Link>
                    <Link className={`header-menu-item ${getActiveColor('/Fondos')} ${getActiveColor('/FundDetails')}`} to='/Fondos'><FondosIcon /> <p>{language.navBar.Fondos}</p></Link>
                    <Link className={`header-menu-item ${getActiveColor('/Investors')} ${getActiveColor('/InvestorsDetail')}`} to='/Investors'><HandShake /><p>{language.navBar.Investors}</p></Link>
                    <Link className={`header-menu-item ${getActiveColor('/Projects')} ${getActiveColor('/ProjectDetails')}`} to='/Projects'><Project /><p>{language.navBar.Projects}</p></Link>
                    <Link className={`header-menu-item ${getActiveColor('/Revenues')} ${getActiveColor('/Billing')} ${getActiveColor('/DetalleFacturasFondo')}`} to='/Revenues'><Revenue /><p>{language.navBar.Revenues}</p></Link>
                    <Link className={`header-menu-item ${getActiveColor('/Expenses')}`} to='/Expenses'><Expense /><p>{language.navBar.Expenses}</p></Link>
                    <Link className={`header-menu-item ${getActiveColor('/Reports')}`} to='/Reports'><Report /><p>{language.navBar.Reports}</p></Link>
                    <Link className={`header-menu-item ${getActiveColor('/Configuration')} ${getActiveColor('/ContractManagement')} ${getActiveColor('/Leasing')} ${getActiveColor('/ManageProject')} ${getActiveColor('/ManageInvestor')} ${getActiveColor('/BankFileConfiguration')} ${getActiveColor('/AccountDetail')}`} to='/Configuration'><Configuration /><p>{language.navBar.Configuration}</p></Link>
                    <Link className={`header-menu-item ${getActiveColor('/Help')}`} to='/Help'><Help /><p>{language.navBar.Help}</p></Link>
                  </ul>
                </div>
              </div>
            </aside>
          </>
  );
}

export default Navbar;
