import React from 'react';

const ProjectItem = ({item}) => {
  return (
    <li>
        <div className="box"></div>
        <p>{item.country} {item.percentage}</p>
    </li>
  )
}

export default ProjectItem;