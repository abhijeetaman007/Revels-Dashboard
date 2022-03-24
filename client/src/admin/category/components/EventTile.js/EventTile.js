import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import './EventTitle.css'
import Modal from 'react-modal';

const events=[
    {
        name:'Event-1',
    },
    {
        name:'Event-2',
    },
    {
        name:'Event-3',
    },
    {
        name:'Event-4',
    },
    {
        name:'Event-5',
    },
]

const EventCards = () =>{
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width:'40vmax'
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
        events.map((item) => {
            return(
                <div className='main-wrapper font-light text-white m-1 rounded p-4'>
                   <div className='d-flex flex-row justify-content-between align-items-center'>
                    {item.name}
                    <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    overlayClassName="overlay"
                    >
                        <label className='font-medium mt-2'>Event Name</label>
                        <input
                        type="text"
                        name=""
                        autoComplete="off"
                        required
                        maxLength={100}
                        className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
                        placeholder="Event Name Here"
                        />

                        <label className='font-medium mt-3'>Event Description</label>
                        <input
                        type="text"
                        name=""
                        autoComplete="off"
                        required
                        maxLength={2000}
                        className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
                        placeholder="Event description Here"
                        />

                        <label className='font-medium mt-3'>Event Start Date</label>
                        <input
                        type="text"
                        name=""
                        autoComplete="off"
                        required
                        maxLength={10}
                        className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
                        placeholder="13/04/2022"
                        />

                        <label className='font-medium mt-3'>Event End Date</label>
                        <input
                        type="text"
                        name=""
                        autoComplete="off"
                        required
                        maxLength={10}
                        className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
                        placeholder="13/04/2022"
                        />

                        <label className='font-medium mt-3'>Event Start Time</label>
                        <input
                        type="text"
                        name=""
                        autoComplete="off"
                        required
                        maxLength={7}
                        className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
                        placeholder="10:00am"
                        />

                        <label className='font-medium mt-3'>Event End Time</label>
                        <input
                        type="text"
                        name=""
                        autoComplete="off"
                        required
                        maxLength={7}
                        className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
                        placeholder="10:00am"
                        />

                    <button type="button" className="btn my-2 w-100 text-light" style={{backgroundColor:'#100B1B'}}>Save</button>
                        
                    </Modal>
                    <i onClick={openModal} className="edit fa fa-pencil" aria-hidden="true"></i>
                   </div>
                </div>
            )
        })
    );   
}
const EventTile = () => {
  return (
    <div>
        <Navbar />
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className='font-heavy text-light my-3 d-flex align-items-center' >
                <div style={{fontSize:'2rem'}}>CATEGORY NAME</div>
                <div className='text-secondary pl-3 ml-3 border-left' style={{fontSize:'1.2rem'}}>5 events</div>
            </div>
            <div className='font-light border border-light rounded text-light p-2 text-center' style={{width:'70%'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Mauris pellentesque pulvinar pellentesque habitant. 
                Molestie ac feugiat sed lectus vestibulum mattis ullamcorper. 
                Aliquet eget sit amet tellus cras adipiscing enim. Felis
                Aliquet eget sit amet tellus cras adipiscing enim. Felis 
            </div>
            <div className='text-light mt-3 d-flex flex-column flex-md-row align-items-center justify-content-center' >
                <input
                    type="text"
                    name=""
                    autoComplete="off"
                    maxLength={100}
                    className='rounded p-2 mb-0'
                    placeholder='Edit category description'
                    style={{width:'300px', backgroundColor:'white', color:'black'}}
                />
                 <button type="button" className="btn m-2 text-white" style={{backgroundColor:'#000'}}>Save</button>
            </div>
            <button type="button" className="btn m-2 text-white" style={{backgroundColor:'#F4737E', width:'200px'}}>Add Event</button>
            <div className='d-flex flex-wrap' style={{margin:'4rem 5rem'}}>
                {EventCards()}
            </div>
        </div>
</div>
  )
}

export default EventTile