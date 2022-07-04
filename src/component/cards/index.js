import React from 'react';
import { ArrowUp } from '../icon/icon';
import './cards.css';
import { IoDocumentTextOutline } from "react-icons/io5";
import { projectInfo } from './cardInfo';
import ProjectItem from './projectItem';

export const InvestorCard = ({color,title,text,miniText,rotateArrowIcon, miniDisplay}) => {
  return (
    <div className={`investorCard ${color}`}>
        <div className="bind">
          <p className='title'><span>{title}</span></p>
          <p className='desc'>
              <span className='color-text'>{text}</span>
              <span className={`mini-text ${miniDisplay}`}>{miniText}<ArrowUp rotate={rotateArrowIcon} /></span>
          </p>
        </div>
    </div>
  )
};


export const InvestorDetailCard = ({color,title,text,Ltd}) => {
  return (
    <div className={`investorCard ${color}`}>
      <div className="detail-bind">
        <p className='title'><span>{title}</span></p>
        <p className='desc'>
            <span className='color-text'>{text}</span>
        </p>
      </div>
      {
      Ltd.length !==0
      ?<div className="Ltds show">
      {
        Ltd.map((ltd, i)=>{
          return(
            <div key={i} className={`Ltd color${ltd.color}`}>
              <hr className={`Ltd-bar`} />
              <div className="Ltd-details">
                <p className="text">{ltd.LtdText}</p>
                <p className={`number`}>{ltd.LtdNumber}</p>
              </div>
            </div>
          )
        })
      }
    </div>
    :<></>
      }
    </div>
  )
};

export const DocumentCard = ({text,id}) => {
  return(
    <div key={id} className="document">
      <IoDocumentTextOutline />
      <p>{text}</p>
    </div>
  )
};

export const ProjectCard = ({language}) => {
  return(
    <div className='projectCard' >
      <ul>
        <p className='header'>{language.projects.location}</p>
        {
          projectInfo.map((item,i)=>{
            return(
              <ProjectItem item={item} key={i} />
            )
          })
        }
      </ul>
    </div>
  )
}

export const ConfigCard = ({language}) => {
  return(
    <div className="configCards">
      <div className="configCard">
        <h1>Expiration</h1>
        <div className="progress-bar secondary-bar">
          <div className="progress-fill secondary-progress" style={{width: "15%"}}></div>
        </div>
        <div className="card-desc">
          <ul>
            <h5>Overdue</h5>
            <p>4 - $52,862.91</p>
          </ul>
          <ul>
            <h5>Not yet expired</h5>
            <p>14 - $852,862.91</p>
          </ul>
        </div>
      </div>
      <div className="configCard">
        <h1>Payment</h1>
        <div className="progress-bar tartiary-bar">
          <div className="progress-fill tartiary-progress" style={{width: "45%"}}></div>
        </div>
        <div className="card-desc">
          <ul>
            <h5>Not deposited</h5>
            <p>4 - $52,862.91</p>
          </ul>
          <ul>
            <h5>Deposited</h5>
            <p>14 - $852,862.91</p>
          </ul>
        </div>
      </div>
    </div>
  )
} 