import React, {useState, useEffect} from 'react';
import './report.css';
import { DocumentCard } from '../../component/cards';

const Reports = () => {
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
    responsiveReport: width < 769
  }
  const {responsiveReport} = responsive;
  return (
      <>{
        responsiveReport
        ?<div className="reports">
          <ul>
            <DocumentCard key={1} text={[`January`,<br key={1} />,`2021`]} />
            <DocumentCard key={2} text={[`April`,<br key={2} />,`2021`]} />
          </ul>
          <ul>
            <DocumentCard key={3} text={[`July`,<br key={3} />,`2021`]} />
            <DocumentCard key={4} text={[`October`,<br key={4} />,`2021`]} />
          </ul>
          <ul>
            <DocumentCard key={5} text={[`January`,<br key={5} />,`2022`]} />
            <DocumentCard key={6} text={[`April`,<br key={6} />,`2022`]} />
          </ul>
        </div>
        :<div className="reports">
        <DocumentCard key={1} text={[`January`,<br key={1} />,`2021`]} />
        <DocumentCard key={2} text={[`April`,<br key={2} />,`2021`]} />
        <DocumentCard key={3} text={[`July`,<br key={3} />,`2021`]} />
        <DocumentCard key={4} text={[`October`,<br key={4} />,`2021`]} />
        <DocumentCard key={5} text={[`January`,<br key={5} />,`2022`]} />
        <DocumentCard key={6} text={[`April`,<br key={6} />,`2022`]} />
        </div>
      }
      </>
  )
}

export default Reports;