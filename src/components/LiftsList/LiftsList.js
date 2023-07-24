import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LIFTS, UPDATE_LIFT_STATUS } from '../../graphQlQueries/graphqlQueries';
import LiftsFilter from '../ListsFilter'
import EditLiftStatusModal from '../EditLiftStatusModal/index'
import './ListsList.css';

const LiftsList = () => {
  const { loading, error, data } = useQuery(GET_LIFTS);
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedLift, setSelectedLift] = useState(null);
  const [updateLiftStatus] = useMutation(UPDATE_LIFT_STATUS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const lifts = data.allLifts;

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleEditLift = (lift) => {
    setSelectedLift(lift);
  };

  const handleSaveLiftStatus = async (liftId, status) => {
    try {
      await updateLiftStatus({
        variables: { liftId, status },
        refetchQueries: [{ query: GET_LIFTS }],
      });
      setSelectedLift(null);
    } catch (error) {
      console.error('Error updating lift status:', error.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedLift(null);
  };

  const filteredLifts = filterStatus === 'All' ? lifts : lifts.filter((lift) => lift.status === filterStatus);

  return (
    <section className='listContainer'>
      <div className='listHeader'>
        <h2>Lifts List</h2>
        <LiftsFilter filterStatus={filterStatus} onFilterChange={handleFilterChange} />
      </div>
      <ul className='listContent'>
        {filteredLifts.map((lift) => (
          <li className='listItem' key={lift.id}>
            <div className='listItemBox'>
              <div className='listItemName'>Name: {lift.name}</div>
              <br />
              <div className='listItemGain'>Elevation Gain: {lift.elevationGain}</div> 
            </div>
            <br />
            <div className='listItemStatus'>Status: {lift.status}</div> 
            <br />
            <button className='listItemFormBtn' onClick={() => handleEditLift(lift)}>Edit Status</button>
          </li>
        ))}
      </ul>

      {selectedLift && (
        <EditLiftStatusModal
          isOpen={true}
          onRequestClose={handleCloseModal}
          lift={selectedLift}
          onSave={handleSaveLiftStatus}
          filteredLifts={filteredLifts}
        />
      )}
    </section>
  );
};

export default LiftsList;
