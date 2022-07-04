import React, {useState, useEffect} from 'react';
import './subTab.css';
import { Configuration, Download, Print, TabIcon } from '../icon/icon';
const SubTab = ({subtab1, subtab2, subtab3, subtab4, subtab5, subtab6, subtab7, subtabs1, subtabs2, subtabs3, subtabs4, subtabs5, subtabs6, subtabs7, subhideTab1, subhideTab2, subhideTab3, subhideTab4, subhideTab5, subhideTab6, subhideTab7, subhideCustomizer, inactive,action}) => {
    setTimeout(()=>{
        const Li = Array.from(document.querySelectorAll('.subtab ul li'));
        Li.forEach((li,i)=>{
            li.addEventListener('click',()=>{
                if(action){
                    action(li.dataset.subtab)
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
        ?<div className="subtab">
            <ul>
                <li data-subtab={`${subtab1}`} className={`tab1 tabItem ${subhideTab1} ${inactive}`}>{subtabs1}<TabIcon /></li>
                <li data-subtab={`${subtab2}`} className={`tab2 tabItem ${subhideTab2} ${inactive}`}>{subtabs2}<TabIcon /></li>
                <li data-subtab={`${subtab3}`} className={`tab3 tabItem ${subhideTab3} ${inactive}`}>{subtabs3}<TabIcon /></li>
                <li data-subtab={`${subtab4}`} className={`tab4 tabItem ${subhideTab4} ${inactive}`}>{subtabs4}<TabIcon /></li>
                <li data-subtab={`${subtab5}`} className={`tab5 tabItem ${subhideTab5} ${inactive}`}>{subtabs5}<TabIcon /></li>
                <li data-subtab={`${subtab6}`} className={`tab5 tabItem ${subhideTab6} ${inactive}`}>{subtabs6}<TabIcon /></li>
                <li data-subtab={`${subtab7}`} className={`tab5 tabItem ${subhideTab7} ${inactive}`}>{subtabs7}<TabIcon /></li>
            </ul>
        </div>
        :<div className="subtab">
            <ul>
                <li data-subtab={`${subtab1}`} className={`tab1 color1 active ${subhideTab1} ${inactive}`}>{subtabs1}</li>
                <li data-subtab={`${subtab2}`} className={`tab2 color2 ${subhideTab2} ${inactive}`}>{subtabs2}</li>
                <li data-subtab={`${subtab3}`} className={`tab3 color3 ${subhideTab3} ${inactive}`}>{subtabs3}</li>
                <li data-subtab={`${subtab4}`} className={`tab4 color1 ${subhideTab4} ${inactive}`}>{subtabs4}</li>
                <li data-subtab={`${subtab5}`} className={`tab5 color2 ${subhideTab5} ${inactive}`}>{subtabs5}</li>
                <li data-subtab={`${subtab6}`} className={`tab5 color3 ${subhideTab6} ${inactive}`}>{subtabs6}</li>
                <li data-subtab={`${subtab7}`} className={`tab5 color1 ${subhideTab7} ${inactive}`}>{subtabs7}</li>
            </ul>
            <div className={`process-info ${subhideCustomizer}`}>
                <Configuration />
                <Download />
                <Print />
            </div>
        </div>
        }
      </>
  )
}

export default SubTab;