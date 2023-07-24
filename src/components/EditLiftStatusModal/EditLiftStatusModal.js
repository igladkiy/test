import React from 'react';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./EditLiftStatusModal.css"

const EditLiftStatusModal = ({ isOpen, onRequestClose, lift, onSave, filteredLifts }) => {
  const formik = useFormik({
    initialValues: {
      status: lift.status,
    },
    validationSchema: Yup.object({
      status: Yup.string().required('Status is required'),
    }),
    onSubmit: (values) => {
      onSave(lift.id, values.status);
      onRequestClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    <div className='modalBox'>
      <h2 className='modalName'>{lift.name}</h2>
      <h3 className='modalGail'>Elevation Gain: {lift.elevationGain}</h3>
      <form className='modalForm'  onSubmit={formik.handleSubmit}>
       <div className='modalEditMenu'>
        <label>
          Update Status:
          <br/>
          <select className='modalField' name="status" value={formik.values.status} onChange={formik.handleChange}>
            <option value="OPEN">Open</option>
            <option value="HOLD">Hold</option>
            <option value="CLOSED">Closed</option>
          </select>
        </label>
        </div>
        <div className='listBox'>
        <ul className='listContent'>
          {filteredLifts.map((lift) => (
            <li className='listItem' key={lift.id}>
              <div className='listItemInfo'>
                <div className='listItemName'>Name: {lift.name}</div>
              </div>
              <br />
              <div className='listItemStatus'>Status: {lift.status}</div>
              <br />
            </li>
          ))}
        </ul>
      </div>
        {formik.touched.status && formik.errors.status ? <div>{formik.errors.status}</div> : null}
        <div className='modalBtns'>
          <button className='modalSaveBtn' type="submit">Save</button>
          <button className='modalCanselBtn' onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
      </div>
    </Modal>
  );
};

export default EditLiftStatusModal