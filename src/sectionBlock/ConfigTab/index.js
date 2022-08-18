import React from 'react';
import { Exporting } from '../../component/icon/icon';
import {Link} from 'react-router-dom';
import './config.css';

const GeneralTab = ({itemClass,item1,item2,item3,item4,item5, item6, item7, item8, hideItem1, hideItem2, hideItem3, hideItem4, hideItem5, hideItem6, hideItem7, hideItem8, link1, link2, link3, link4, link5, link6, link7, link8}) => {
  return (
    <div className={`config-management ${itemClass}`}>
        <ul className="config-item">
            <li className={`${hideItem1}`}>
                <Link to={link1}>
                    <p>{item1}</p><Exporting />
                </Link>
            </li>
            <li className={`${hideItem2}`}>
                <Link to={link2}>
                    <p>{item2}</p><Exporting />
                </Link>
            </li>
            <li className={`${hideItem3}`}>
                <Link to={link3}>
                    <p>{item3}</p><Exporting />
                </Link>
            </li>
            <li className={`${hideItem4}`}>
                <Link to={link4}>
                    <p>{item4}</p><Exporting />
                </Link>
            </li>
            <li className={`${hideItem5}`}>
                <Link to={link5}>
                    <p>{item5}</p><Exporting />
                </Link>
            </li>
            <li className={`${hideItem6}`}>
                <Link to={link6}>
                    <p>{item6}</p><Exporting />
                </Link>
            </li>
            <li className={`${hideItem7}`}>
                <Link to={link7}>
                    <p>{item7}</p><Exporting />
                </Link>
            </li>
            <li className={`${hideItem8}`}>
                <Link to={link8}>
                    <p>{item8}</p><Exporting />
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default GeneralTab;