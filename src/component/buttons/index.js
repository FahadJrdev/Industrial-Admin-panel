import React, {useState, useEffect} from 'react';
import './button.css';
import { VscChevronLeft } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";
export const Button = ({text, background, types, extraClass,click}) => {
  return (
    <button type={`${types}`} className={`button ${extraClass}`} onClick={click} style={{background: `${background}`, color: `white`, display: 'inline-flex'}}>{text}</button>
  )
}

export const ButtonWithArrow = ({text, background, specificClass, extraClass}) => {
  const [width, setWindowWidth] = useState(0);
  useEffect(() => { 
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => 
      window.removeEventListener("resize",updateDimensions);
   },[])
   const updateDimensions = () => {
     const width = window.innerWidth
     setWindowWidth(width)
   }
   const responsive = {
    responsiveBackButton: width < 769
  }
  const {responsiveBackButton} = responsive;
  return (
    <>
    {
      responsiveBackButton
      ?<button className={`backIcon buttonwitharrow ${specificClass} ${extraClass}`}><BiArrowBack /></button>
      :<button className='backButton buttonwitharrow' style={{background: `${background}`, color: `white`, display: 'inline-block'}}><VscChevronLeft style={{color: `white`}} />{text}</button>
    }
    </>
  )
}


export const Pill = () => {
  return(
    <>
      <label className="switch">
        <input type="checkbox"  />
        <span className="slider round"></span>
      </label>
    </>
  )
}