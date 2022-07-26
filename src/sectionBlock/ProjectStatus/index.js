import React from 'react';
import {  ButtonWithArrow } from '../../component/buttons';
import './status.css';
const ProjectStatus = ({ title ,language, status, status1, status2, status3, status4}) => {
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor status">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div>
                <div className="project-status">
                    <div>
                        <p style={{color: 'var(--primary-color)', fontSize: '16px'}}>Project Activity</p>
                        <ul className="status">
                            <li >
                                <div className={`pin ${status==="start"?"active":""} ${status==="implement"?"active":""} ${status==="monitorin"?"active":""} ${status==="disinvestmt"?"active":""}`}></div>
                                <div className="stat">
                                    <p>{status1}</p>
                                    <p>12/04/2022</p>
                                </div>
                            </li>
                            <li >
                                <div className={`pin ${status==="implement"?"active":""} ${status==="monitorin"?"active":""} ${status==="disinvestmt"?"active":""}`}></div>
                                <div className="stat">
                                    <p>{status2}</p>
                                    <p>12/04/2022</p>
                                </div>
                            </li>
                            <li >
                                <div className={`pin ${status==="monitorin"?"active":""} ${status==="disinvestmt"?"active":""}`}></div>
                                <div className="stat">
                                    <p>{status3}</p>
                                    <p>12/04/2022</p>
                                </div>
                            </li>
                            <li >
                                <div className={`pin ${status==="disinvestmt"?"active":""}`}></div>
                                <div className="stat">
                                    <p>{status4}</p>
                                    <p>12/04/2022</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProjectStatus;