import React from 'react';

const FTable = ({data}) => {
  return (
    <ul>
        <li>{data.header}</li>
        <li>{data.year1}</li>
        <li>{data.year2}</li>
        <li>{data.year3}</li>
        <li>{data.year4}</li>
        <li>{data.year5}</li>
        <li>{data.year6}</li>
    </ul>
  )
}

export default FTable;