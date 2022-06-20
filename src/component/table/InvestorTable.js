import React from 'react';
import { Link } from 'react-router-dom';
export const InvestorDatosItem = ({info}) => {
    return(
        <Link  to={{ pathname: '/InvestorsDetail?'+info.INVERSIONISTA['id'], state:info.INVERSIONISTA['id'] }}>
            <ul key={info.INVERSIONISTA['id']} className="listBody">
                <li className='listItem'>{JSON.parse(info.DATOS[0].INFORMACION_COORPORATIVA).COMPANY_NAME}</li>
                <li className='listItem'>{JSON.parse(info.DATOS[0].INFORMACION_COORPORATIVA).CITY_CONSTITUTION}</li>
                <li className='listItem'>{info.INVERSION.length}</li>
                <li className='listItem'>{info['TOTAL DE FONDOS ASIGNADOS']}</li>
                <li className='listItem'>See more</li>
            </ul>
        </Link>
    )
}

export const InvestorItem = ({info}) => {
    return(
        <Link to={{ pathname: '/InvestorsDetail?'+info.INVERSIONISTA['id'], state: info.INVERSIONISTA['id']}}>
            <ul key={info.INVERSIONISTA['id']} className="listBody">
           
                <li className='listItem'>NO DATO</li>
                <li className='listItem'>NO DATO</li>
                <li className='listItem'>{info.INVERSION.length}</li>
                <li className='listItem'>{info['TOTAL DE FONDOS ASIGNADOS']}</li>
                <li className='listItem'>See more</li>
            </ul>
        </Link>
    )
}

export const FundItem = ({info}) => {
    return(
        <Link to={{ pathname: '/FundDetails?'+info.I_CODIGO, state: info.I_CODIGO}}>
            <ul key={info.id} className="listBody">
                <li className='listItem'>{info.I_CODIGO}</li>
                <li className='listItem'>{info.C_NOMBRE}</li>
                <li className='listItem'>{info.D_VALOR_FONDO}</li>
                <li className='listItem'>{info.D_VALOR_INVERTIDO}</li>
            </ul>
        </Link>
    )
}

export const ProjectItem =({info, i}) => {
    return(
        <Link to='/ProjectDetails'>
            <ul key={i} className='listBody'>
                <li className='listItem'>{info.Project_name}</li>
                <li className='listItem'>{info.Location}</li>
                <li className='listItem'>{info.Date_investment}</li>
                <li className='listItem'>{info.Amount_of_approved_investment}</li>
                <li className='listItem'>{info.Project_status}</li>
                <li className='listItem'>{info.Actions}</li>
            </ul>
        </Link>
    )
}