import React from 'react';
import './searchbox.css';
import { Search } from '../icon/icon';

export const Searchbox = () => {
  return (
    <div className='search-container'>
      <Search />
      <input className='searchbox' placeholder='Search' />
    </div>
  )
}
