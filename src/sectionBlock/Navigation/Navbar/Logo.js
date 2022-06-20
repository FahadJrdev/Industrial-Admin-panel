import React, {useState} from 'react';
import './navbar.css';
import { VscChevronDown } from "react-icons/vsc";
import { FcCheckmark } from "react-icons/fc";
import { MobileNavbarIcon } from '../../../component/icon/icon';
import { MdClear } from "react-icons/md";
import { Link } from 'react-router-dom';

const Logo = ({lang, setLang }) => {  
  const [subArena, setSubArena] = useState(false);
  document.body.addEventListener('click',()=>{
    setSubArena(false);
  })
  return (
    <div className="logo">
        <div className="bar">
        <MobileNavbarIcon />
        <MdClear />
        </div>
        <div className="webLogo">
            <Link to="/Dashboard">
                <img className="logo-img" src="img/navbar-icon/logo.png" alt="MGM Innova Group" />
            </Link>
            <div className='language'>
                <ul onClick={(e)=>{setSubArena(!subArena); e.stopPropagation()}} className="arena">
                {
                    lang === 'us'
                    ?<>
                    <img className="country us" src="img/navbar-icon/us.png" alt="country" />
                    <p>US</p>
                    </>
                    :<>
                    <img className="country sp" src="img/navbar-icon/sp.png" alt="country" />
                    <p>SP</p>
                    </>
                }
                <VscChevronDown />
                </ul>
                <ul onClick={(e)=>{setLang('us'); localStorage.setItem('lang','us'); e.stopPropagation()}} className={`arena subArena ${subArena?'':'dn'}`}>
                <img className="country" src="img/navbar-icon/us.png" alt="country" />
                <p>US</p>
                {
                    lang === 'us'
                    ?<FcCheckmark />
                    :<></>
                }
                </ul>
                <ul onClick={(e)=>{setLang('sp'); localStorage.setItem('lang','sp'); e.stopPropagation()}} className={`arena subArena ${subArena?'':'dn'}`}>
                <img className="country" src="img/navbar-icon/sp.png" alt="country" />
                <p>SP</p>
                {
                    lang === 'sp'
                    ?<FcCheckmark />
                    :<></>
                }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Logo;