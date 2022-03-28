import React from 'react';

export default Event = ({ data }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '40vmax',
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="main-wrapper font-light text-white m-1 rounded p-4">
      <div className="dy-flex flex-row justify-content-between align-items-center">
        {data.name}
        <i
          onClick={openModal}
          className="edit fa fa-pencil"
          aria-hidden="true"
        ></i>
      </div>
    </div>
  );
};
