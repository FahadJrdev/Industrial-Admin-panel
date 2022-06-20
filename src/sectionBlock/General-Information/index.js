import React, {useState, useEffect} from 'react';
import {DocumentCard} from '../../component/cards';
import { Button } from '../../component/buttons';
import './genera.css';
const GeneralInformation = ({Name,totalInvestment,totalProject,id,language}) => {
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
    responsiveGI: width < 769
  }
  const {responsiveGI} = responsive;
  return (<>
  {
    responsiveGI
    ?<div className="general-information">
    <div className="investor-information">
      <div className="current-information">
          <ul>
          <li className='investor-info'>{language.informationInversor.name}</li>
          <li className='investor-info'>{Name}</li>
          </ul>
          <ul>
          <li className='investor-info'>{language.informationInversor.totalinvest}</li>
          <li className='investor-info'> $ {totalInvestment} </li>
          </ul>
          <ul>
          <li className='investor-info'># {language.informationInversor.totalprojec} </li>
          <li className='investor-info'> {totalProject} </li>
          </ul>
      </div>
    </div>
    <div className="investor-document">
      <h2>{language.informationInversor.investordoc} </h2>
      <div className="documents">
        <ul>
          <DocumentCard key={1} id={id} text={language.informationInversor.contrat} />
          <DocumentCard key={2}  id={id} text={language.informationInversor.reportcodition} />
        </ul>
        <ul>
          <DocumentCard key={3}  id={id} text={language.informationInversor.reportinvest} />
          <DocumentCard key={4}  id={id} text={[language.informationInversor.reportrestric_1, <br key={1} /> ,language.informationInversor.reportrestric_2]} />
        </ul>
      </div>
    </div>
    <div className="information-customizer">
          <Button text={language.informationInversor.updateInfor} background={`var(--primary-color)`} />
          <Button text={language.informationInversor.accountstate}  background={`var(--tartiary-color)`} />
    </div>
</div>
    :<div className="general-information">
        <div className="investor-information">
          <div className="current-information">
              <ul>
              <li className='investor-info'>{language.informationInversor.name}</li>
              <li className='investor-info'>{Name}</li>
              </ul>
              <ul>
              <li className='investor-info'>{language.informationInversor.totalinvest}</li>
              <li className='investor-info'> $ {totalInvestment} </li>
              </ul>
              <ul>
              <li className='investor-info'># {language.informationInversor.totalprojec} </li>
              <li className='investor-info'> {totalProject} </li>
              </ul>
          </div>
          <div className="information-customizer">
              <Button text={language.informationInversor.updateInfor} background={`var(--primary-color)`} />
              <Button text={language.informationInversor.accountstate}  background={`var(--tartiary-color)`} />
          </div>
        </div>
        <div className="investor-document">
          <h2>{language.informationInversor.investordoc} </h2>
          <div className="documents">
              <DocumentCard key={1} id={id} text={language.informationInversor.contrat} />
              <DocumentCard key={2}  id={id} text={language.informationInversor.reportcodition} />
              <DocumentCard key={3}  id={id} text={language.informationInversor.reportinvest} />
              <DocumentCard key={4}  id={id} text={[language.informationInversor.reportrestric_1, <br key={1} /> ,language.informationInversor.reportrestric_2]} />
          </div>
        </div>
    </div>
  }
  </>
  )
}

export default GeneralInformation;