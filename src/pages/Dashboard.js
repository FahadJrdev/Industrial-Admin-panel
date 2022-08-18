import React, {useState} from 'react';
import Header from '../sectionBlock/Header';
import {InvestorCard} from '../component/cards';
import Navbar from '../sectionBlock/Navigation/Navbar';
import ProgressBar from '../component/progressbar';
import {PrimaryCheckIcon, SecondaryCheckIcon} from '../component/icon/icon';
import {GraphPie} from '../component/Graph/pie';
import {GraphBar} from '../component/Graph/bar';
import {GraphLine} from '../component/Graph/line';
import './pageStyle.css';

const Dashboard = ({lang, setLang, language, responsive}) => {
  const lineData = [
    {
      name: "31/01",
      Projects: 8,
      Investors: 5
    },
    {
      name: "01/02",
      Projects: 3,
      Investors: 15
    },
    {
      name: "02/02",
      Projects: 4,
      Investors: 30
    },
    {
      name: "03/02",
      Projects: 45,
      Investors: 23
    },
    {
      name: "04/02",
      Projects: 20,
      Investors: 35
    },
    {
      name: "05/02",
      Projects: 2,
      Investors: 3
    },
    {
      name: "06/02",
      Projects: 13,
      Investors: 4
    }
];
  const pieData = [
    { name: "Unbilled", value: 14 },
    { name: "Billed", value: 86 }
  ];
  const pieColors = ["var(--primary-color)", "var(--secondary-color)"];
  const barData = [
    {
      name: "PAN",
      Projects: 8,
      Investors: 5
    },
    {
      name: "COL",
      Projects: 3,
      Investors: 15
    },
    {
      name: "MEX",
      Projects: 4,
      Investors: 30
    },
    {
      name: "USA",
      Projects: 45,
      Investors: 23
    },
    {
      name: "PERÚ",
      Projects: 20,
      Investors: 35
    },
    {
      name: "ECU",
      Projects: 2,
      Investors: 3
    },
    {
      name: "BRA",
      Projects: 13,
      Investors: 4
    },
    {
      name: "COS",
      Projects: 3,
      Investors: 18
    }
  ];
  const [primaryLine,setPrimaryLine] = useState(true)
  const [secondaryLine,setSecondaryLine] = useState(true)
  return (
    <>
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Dash board`} pageDesc ={language.dashboard.general_indicators} displaySearch={`show`} />
      <main className='main dashboard'>
        <div className="cards grid-container">   
          <InvestorCard key={1} color={`primary-color`}  title={language.dashboard.Investors} text={`271`} miniText={`+ 0,7% `} miniDisplay={`show`}/>
          <InvestorCard key={2} color={`secondary-color`}  title={language.dashboard.projects} text={`69`} miniText={`- 1,7% `} miniDisplay={`show`} rotateArrowIcon={`down`}/>
          <InvestorCard key={3} color={`tartiary-color`}  title={language.dashboard.montInvers} text={`5`} miniText={`+ 1% `} miniDisplay={`show`}/>
        </div>
        <div className="summary">
          <div className="graph specialBackground">
            <div className="header">
              <h1>Performance</h1>
              <h5>31/01/2020 – 06/02/2020</h5>
              <ul>
                <li>
                  <span onClick={()=>{setPrimaryLine(!primaryLine)}}> 
                    <input type="checkbox" checked/>
                    {
                      primaryLine
                      ?<>
                        <PrimaryCheckIcon /> 
                      </>
                      :<></>
                    }
                  </span>
                  <label>Investors</label>
                </li>
                <li>
                  <span onClick={()=>{setSecondaryLine(!secondaryLine)}}> 
                    <input type="checkbox" checked/>
                    {
                      secondaryLine
                      ?<>
                        <SecondaryCheckIcon /> 
                      </>
                      :<></>
                    }
                  </span>
                  <label>Projects</label>
                </li>
              </ul>
            </div>
            <GraphLine data={lineData} primaryLine={primaryLine} secondaryLine={secondaryLine} />
          </div>
          <div className="pie specialBackground">
            <div className="header">
              <h1>Invoices</h1>
            </div>
            <ul>
              <li>
                <div></div>
                <p>Unbilled</p>
              </li>
              <li>
                <div></div>
                <p>Billed</p>
              </li>
            </ul>
            <GraphPie data={pieData} COLORS={pieColors} />
          </div>
        </div>
        <div className="summary">
          <div className="chart specialBackground">
            <div className="header">
              <h1>Countries</h1>
              <ul>
                <li>
                  <div></div>
                  <p>Investors</p>
                </li>
                <li>
                  <div></div>
                  <p>Projects</p>
                </li>
              </ul>
            </div>
            <GraphBar data={barData} />
          </div>
          <div className="progress specialBackground">
            <div className="header">
              <h1>Projects</h1>
              <h6>Countries</h6>
            </div>
            <div className="progress-report">
              <div className="report">
                <div className="country">
                  <h4>USA</h4>
                  <p>94%</p>
                </div>
                <ProgressBar width={`94%`} />
              </div>
              <div className="report">
                <div className="country">
                  <h4>PERÚ</h4>
                  <p>0,26%</p>
                </div>
                <ProgressBar width={`26%`} />
              </div>
            </div>
            <div className="progress-report">
              <div className="report">
                <div className="country">
                  <h4>COLOMBIA</h4>
                  <p>0,20%</p>
                </div>
                <ProgressBar width={`20%`} />
              </div>
              <div className="report">
                <div className="country">
                  <h4>BRAZIL</h4>
                  <p>0,20%</p>
                </div>
                <ProgressBar width={`20%`} />
              </div>
            </div>
            <div className="progress-report">
              <div className="report">
                <div className="country">
                  <h4>MEXICO</h4>
                  <p>0,13%</p>
                </div>
                <ProgressBar width={`13%`} />
              </div>
              <div className="report">
                <div className="country">
                  <h4>COSTA RICA</h4>
                  <p>1,37%</p>
                </div>
                <ProgressBar width={`37%`} />
              </div>
            </div>
            <div className="progress-report">
              <div className="report">
                <div className="country">
                  <h4>EQUADOR</h4>
                  <p>0,43%</p>
                </div>
                <ProgressBar width={`43%`} />
              </div>
              <div className="report">
                <div className="country">
                  <h4>PANAMA</h4>
                  <p>1,57%</p>
                </div>
                <ProgressBar width={`57%`} />
              </div>
            </div>
            <div className="progress-report">
              <div className="report">
                <div className="country">
                  <h4>ARGENTINA</h4>
                  <p>0,34%</p>
                </div>
                <ProgressBar width={`34%`} />
              </div>
              <div className="report">
                <div className="country">
                  <h4>CHILIE</h4>
                  <p>1,17%</p>
                </div>
                <ProgressBar width={`17%`} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard;