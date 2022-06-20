import React, { useState, useEffect } from 'react';
import { Button } from '../../component/buttons';
import './pm.css';
import { ProjectManagementTable } from '../../component/table';
import { ProjectInfo } from './projectInfo';
const ProjectManagement = ({language}) => {
    const [projectManage, setProjectManage] = useState([]);
    useEffect(()=>{
      setProjectManage(ProjectInfo);
    },[])
  return (
      <>
      <div className="management">
        <Button text={language.projects.button_1} background={`var(--tartiary-color)`} />
        <Button text={language.projects.button_2} background={`var(--primary-color)`} />
        
        {projectManage?(<ProjectManagementTable key={1} language={language} header1={language.projects.tab1project} header2={language.projects.tab2project} header3={language.projects.tab3project} header4={language.projects.tab4project} header5={language.projects.tab5project} header6={language.projects.tab6project} data={projectManage} />):""}
      </div>
      </>
  )
}

export default ProjectManagement;