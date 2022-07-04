import React, {useState, useEffect} from 'react';
import './tab.css';
import { Configuration, Download, Print, TabIcon } from '../icon/icon';
const Tab = ({tab1, tab2, tab3, tab4, tab5, tab6, tab7, tabs1, tabs2, tabs3, tabs4, tabs5, tabs6, tabs7, hideTab1, hideTab2, hideTab3, hideTab4, hideTab5, hideTab6, hideTab7, hideCustomizer, inactive,action}) => {
    setTimeout(()=>{
        const Li = Array.from(document.querySelectorAll('.tab ul li'));
        Li.forEach((li,i)=>{
            li.addEventListener('click',()=>{
                if(action){
                    action(li.dataset.tab)
                }
                Li.forEach((li)=>{
                    li.classList.remove('active');
                })
                Li[i].classList.add('active');
            })
        })
    })
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
    responsiveTab: width < 769
  }
  const {responsiveTab} = responsive;
  return (
      <>{
        responsiveTab
        ?<div className="tab">
            <ul>
                <li data-tab={`${tab1}`} className={`tab1 tabItem ${hideTab1} ${inactive}`}>{tabs1}<TabIcon /></li>
                <li data-tab={`${tab2}`} className={`tab2 tabItem ${hideTab2} ${inactive}`}>{tabs2}<TabIcon /></li>
                <li data-tab={`${tab3}`} className={`tab3 tabItem ${hideTab3} ${inactive}`}>{tabs3}<TabIcon /></li>
                <li data-tab={`${tab4}`} className={`tab4 tabItem ${hideTab4} ${inactive}`}>{tabs4}<TabIcon /></li>
                <li data-tab={`${tab5}`} className={`tab5 tabItem ${hideTab5} ${inactive}`}>{tabs5}<TabIcon /></li>
                <li data-tab={`${tab6}`} className={`tab6 tabItem ${hideTab6} ${inactive}`}>{tabs6}<TabIcon /></li>
                <li data-tab={`${tab7}`} className={`tab7 tabItem ${hideTab7} ${inactive}`}>{tabs7}<TabIcon /></li>
            </ul>
            <div className={`process-info dn ${hideCustomizer}`}>
                <Configuration />
                <Download />
                <Print />
            </div>
        </div>
        :<div className="tab">
            <ul>
                <li data-tab={`${tab1}`} className={`tab1 color1 active ${hideTab1} ${inactive}`}>{tabs1}</li>
                <li data-tab={`${tab2}`} className={`tab2 color2 ${hideTab2} ${inactive}`}>{tabs2}</li>
                <li data-tab={`${tab3}`} className={`tab3 color3 ${hideTab3} ${inactive}`}>{tabs3}</li>
                <li data-tab={`${tab4}`} className={`tab4 color1 ${hideTab4} ${inactive}`}>{tabs4}</li>
                <li data-tab={`${tab5}`} className={`tab5 color2 ${hideTab5} ${inactive}`}>{tabs5}</li>
                <li data-tab={`${tab6}`} className={`tab6 color3 ${hideTab6} ${inactive}`}>{tabs6}</li>
                <li data-tab={`${tab7}`} className={`tab7 color1 ${hideTab7} ${inactive}`}>{tabs7}</li>
            </ul>
            <div className={`process-info ${hideCustomizer}`}>
                <Configuration />
                <Download />
                <Print />
            </div>
        </div>
        }
      </>
  )
}

export default Tab;