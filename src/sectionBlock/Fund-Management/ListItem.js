import React from 'react';
import { Link } from 'react-router-dom';
import { Exporting } from '../../component/icon/icon';

export const ListItem = ({lista}) => {
  return (
    <>
    <Link key={lista.I_CODIGO} to={'/FundDetails?'+lista.I_CODIGO}><li><p>Fund {lista.I_CODIGO}</p><Exporting /></li></Link>
    </>
  )
}
