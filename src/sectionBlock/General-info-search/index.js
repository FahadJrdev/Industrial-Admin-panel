import React from 'react';
import './GIS.css';

const GeneralInfoSearch = ({language, title}) => {

  return (
    <>
        <div className="GIS">
            <p className="GIS-title">{title}</p>
            <ul>
                <li>
                    <label>Account code</label>
                    <p>12314253 32424534545</p>
                </li>
                <li>
                    <label>Opening date</label>
                    <p>DD/MM/YYYY</p>
                </li>
                <li>
                    <label>Account type</label>
                    <p>Credit</p>
                </li>
            </ul>
            <ul>
                <li>
                    <label>Bank</label>
                    <p>Davivienda</p>
                </li>
                <li>
                    <label>Country</label>
                    <p>Colombia</p>
                </li>
                <li>
                    <label>City</label>
                    <p>Bogotá</p>
                </li>
            </ul>
        </div>
    </>
  )
}

export default GeneralInfoSearch;