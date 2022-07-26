import React from 'react';

const PlanItem = ({info}) => {
  return (
    <>
        <ul className="listBody">
            <li className="listItem firstItem">{info.item1}</li>
            <li className="listItem">{info.item2}</li>
            <li className="listItem">{info.item3}</li>
            <li className="listItem">{info.item4}</li>
            <li className="listItem">{info.item5}</li>
            <li className="listItem">{info.item6}</li>
        </ul>
    </>
  )
}

export default PlanItem;