import React from 'react';

export const FactureTable = ({info}) => {
  return (
    <ul>
        <li className="listItem first">{info.item1}</li>
        <li className="listItem second">{info.item2}</li>
        <li className="listItem third">{info.item3}</li>
        <li className="listItem fourth">{info.item4}</li>
        <li className="listItem fifth">{info.item5}</li>
        <li className="listItem sixth">{info.item6}</li>
        <li className="listItem seventh"><input type="checkbox" /></li>
    </ul>
  )
}
