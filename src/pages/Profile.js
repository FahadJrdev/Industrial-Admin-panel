import React, {useState} from 'react';
import Tab from '../component/tab';
import Header from '../sectionBlock/Header';
import Navbar from '../sectionBlock/Navigation/Navbar';
import BasicInfo from '../sectionBlock/Profile/BasicInfo';
import ChangePass from '../sectionBlock/Profile/ChangePass';
import { useNavigate } from 'react-router-dom';

const Profile = ({lang, setLang, language, responsive}) => {
    const navigate = useNavigate();
    const [isNavigate, setNavigate]=useState(false);
    const [tab,setTab] = useState(`Basic Information`);
    setTimeout(()=>{
        const tab1 = document.querySelector('.profile .tab1');
        if(tab1){
            tab1.addEventListener('click',()=>{
                setTab(`Basic Information`);
            })
        }
        const tab2 = document.querySelector('.profile .tab2');
        if(tab2){
            tab2.addEventListener(`click`,()=>{
                setTab(`Change Password`);
            })
        }
    })
    const [responsiveTab, setResponsiveTab] = useState("");
  setTimeout(()=>{
    const backResponsiveButton = document.querySelector('.responsiveInvestorDetail .first-part .buttonwitharrow');
    if(backResponsiveButton){
      backResponsiveButton.addEventListener('click',() => {
        setResponsiveTab("");
      });
    }
    const backFundButton = document.querySelector('.responsiveInvestorDetail .first-part .buttonwitharrow.emptyResponsiveTab');
    if(backFundButton){
      backFundButton.addEventListener('click',() => {
        setNavigate(!isNavigate);
      });
      if(isNavigate){
        navigate(-1);
      }
    }
    const Li = Array.from(document.querySelectorAll('.tab ul li'));
    Li.forEach((li)=>{
        li.addEventListener('click',()=>{
          setResponsiveTab(li.dataset.tab);
        })
    })
  })
  return (
    <>
        {
            responsive.responsiveID
            ?<>
                <div className="responsiveInvestorDetail">
                {
                    responsiveTab === ""
                    ?<>
                        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
                        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.profile.title} pageDesc={language.profile.desc}  specificClass={`emptyResponsiveTab`}/>
                        <main className='main profile'>
                            <Tab tab1={`My Basic Information`} tab2={`Change Password`} hideTab3={`dn`} hideTab4={`dn`} hideTab5={`dn`} tabs1={language.profile.tabs1} tabs2={language.profile.tabs2} hideCustomizer={`dn`} />
                        </main>
                    </>
                    :<></>
                }
                {
                    responsiveTab === "My Basic Information"
                    ?<>
                        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
                        <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} pageTitle={language.profile.title} />
                        <main className='main profile'>
                            <BasicInfo language={language}/>    
                        </main>
                    </>
                    :<></>
                }
                {
                    responsiveTab === "Change Password"
                    ?<>
                        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
                        <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} pageTitle={language.profile.title} pageDesc={language.profile.desc} />
                        <main className='main profile'>
                            <ChangePass language={language} />    
                        </main>
                    </>
                    :<></>
                }
                </div>
            </>
            :<>
                <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
                <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.profile.title} pageDesc={language.profile.desc} />
                <main className='main profile'>
                    <Tab tab1={`My Basic Information`} tab2={`Change Password`} hideTab3={`dn`} hideTab4={`dn`} hideTab5={`dn`} tabs1={language.profile.tabs1} tabs2={language.profile.tabs2} hideCustomizer={`dn`} />
                    {
                        tab === `Basic Information`
                        ? <BasicInfo language={language}/>
                        : <></>
                    }
                    {
                        tab === `Change Password`
                        ? <ChangePass language={language} />
                        :<></>
                    }
                </main>
            </>
        }
    </>
  )
}

export default Profile;