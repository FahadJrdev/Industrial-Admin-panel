import React from 'react';
import { Searchbox } from '../../component/searchbox';
import './header.css';
import { Button, ButtonWithArrow } from '../../component/buttons';
import Logo from '../Navigation/Navbar/Logo';

const Header = ({lang, setLang, responsive, displayArrowBtn, textArrowBtn, colorArrowBtn, pageTitle, pageDesc, displayBtn, textBtn, colorBtn, displaySearch, specificClass, extraClass}) => {
  return (
    <header>
      {
        responsive.showTopNavMenu
        ?<Logo lang={lang} setLang={setLang}  />
        :<></>
      }
      <div className="header-web">
        <div className="first-part">
          <div className={`display ${displayArrowBtn}`}>
            <ButtonWithArrow text={`${textArrowBtn}`} background={`${colorArrowBtn}`} types={`button`} specificClass={specificClass} extraClass={extraClass}  />
          </div>
          <div className="page-name">
            <p className='title'>{pageTitle}</p>
            <p className='desc'>{pageDesc}</p>
          </div>
        </div>
        <div className="second-part">
          <div className={`display ${displayBtn}`}>
            <Button text={`${textBtn}`} background={`${colorBtn}`}  types={`button`} />
          </div>
          <div className={`display ${displaySearch}`}>
            <Searchbox />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;