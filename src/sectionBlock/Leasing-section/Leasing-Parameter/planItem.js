import React from 'react';

const PlanItem = ({info,max,pagonumber}) => {
  return (
    <>
        <ul className="listBody">
            <li className="listItem firstItem">{info.FECHA}</li>
            <li className="listItem"> {pagonumber+1} of {max}</li>
            <li className="listItem">{info.INTERES}</li>
            <li className="listItem">$  0</li>
            <li className="listItem">$  {info.CUOTAS}</li>
            <li className="listItem">$  {info.CUOTAS+info.INTERES}</li>
        </ul>
    </>
  )
}

export default PlanItem;