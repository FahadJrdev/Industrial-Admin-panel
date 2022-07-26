export const ProjectItem = ({Info}) => {
    return(
        <ul>
            <li className="item">{Info.FECHA}</li>
            <li className="item item2">{Info['FORMA DE PAGO']}</li>
            <li className="item">{Info.CUOTAS}</li>
        </ul>
    )
}
export const ProjectItem2 = ({Info}) => {
    let valorInformacionCorporativa=Info.INFORMACION_COORPORATIVA
    let valorInformacionSocioDemo=Info.INFORMACION_SOCIODEMOGRAFICA
    return(
        <ul>
            <li className="item">{Info.item1}</li>
            <li className="item">{JSON.parse(valorInformacionCorporativa)['COMPANY_NAME']}</li>
            <li className="item">{JSON.parse(valorInformacionCorporativa)['NIT']}</li>
            <li className="item">{JSON.parse(valorInformacionSocioDemo)['COUNTRY']}</li>
            <li className="item">{JSON.parse(valorInformacionSocioDemo)['CITY']}</li>
            <li className="item">{Info.MONTO_INVERTIDO}</li>
        </ul>
    )
}