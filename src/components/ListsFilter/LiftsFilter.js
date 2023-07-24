import React from 'react';
import './ListsFilter.css';

const LiftsFilter = ({ filterStatus, onFilterChange }) => {
  return (
    <div className='filterContainer'>
      <label>
        <div className='fiterTitle'>
        Filter per Status:
        </div>
        <br />
        <select className='filterField' value={filterStatus} onChange={onFilterChange}>
          <option value="All">All</option>
          <option value="OPEN">Open</option>
          <option value="HOLD">Hold</option>
          <option value="CLOSED">Closed</option>
        </select>
      </label>
    </div>
  );
};

export default LiftsFilter;
