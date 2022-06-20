import React from 'react';
import { Button } from '../../component/buttons';
import { DocumentCard } from '../../component/cards';
import './pgi.css';
const ProjectGI = ({language}) => {
  return (
    <div className='GI'>
        <div className="GI-information">
            <Button text={language.projectDetails.button1}  background={`var(--tartiary-color)`} />
            <Button text={language.projectDetails.button2}  background={`var(--secondary-color)`} />
            <Button text={language.projectDetails.button3} background={`var(--primary-color)`} />
        </div>
        <div className="GI-document">
          <h2>{language.projectDetails.document} </h2>
          <div className="documents">
            <div className='document-body'>
                <ul>
                <DocumentCard key={1} text={language.projectDetails.documentName} />
                <DocumentCard key={2} text={language.projectDetails.documentName} />
                </ul>
                <ul>
                <DocumentCard key={3} text={language.projectDetails.documentName} />
                <DocumentCard key={4} text={language.projectDetails.documentName} />
                </ul>
                <ul>
                <DocumentCard key={5} text={language.projectDetails.documentName} />
                <DocumentCard key={6} text={language.projectDetails.documentName} />
                </ul>
                <ul>
                <DocumentCard key={5} text={language.projectDetails.documentName} />
                <DocumentCard key={6} text={language.projectDetails.documentName} />
                </ul>
                <ul>
                <DocumentCard key={5} text={language.projectDetails.documentName} />
                <DocumentCard key={6} text={language.projectDetails.documentName} />
                </ul>
                <ul>
                <DocumentCard key={5} text={language.projectDetails.documentName} />
                <DocumentCard key={6} text={language.projectDetails.documentName} />
                </ul>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProjectGI;