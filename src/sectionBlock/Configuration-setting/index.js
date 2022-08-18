import React from 'react';
import { Link } from 'react-router-dom';
import './cs.css';
import {Button} from '../../component/buttons';
import Tab from '../../component/tab';
import {ConfigurationSettingTable} from '../../component/table';
const ConfigurationSettings = ({language,allfilebanks}) => {
  return (
    <>
        <div className="configurationSetting">
        <Link to={'/ConfigureArchivo'}> <Button text={language.config_File.addtabb} background={`var(--tartiary-color)`} types={`button`} /></Link>
           
            <div className="setting-tab">
                <p className="setting-table-header">{language.config_File.tabtitle}</p>
                <Tab hideTab1={`dn`} hideTab2={`dn`} hideTab3={`dn`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} />
                <ConfigurationSettingTable language = {language} data={allfilebanks} link={`/ConfigureArchivo`} />
            </div>
        </div>
    </>
  )
}

export default ConfigurationSettings;