import React from 'react';

const InvestorPlanTable = ({info}) => {
  return (
    <>
        <ul style={{background: info.background}}>
            <li style={{fontWeight: info.weight}}>{info.list1}</li>
            <li style={{fontWeight: info.weight}}>{info.list2}</li>
            <li style={{fontWeight: info.weight}}>{info.list3}</li>
            <li style={{fontWeight: info.weight}}>{info.list4}</li>
        </ul>
    </>
  )
}

export default InvestorPlanTable;