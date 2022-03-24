import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import './EventTitle.css'

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
    return (
        events.map((item) => {
            return(
                <div className='font-light text-white m-1 rounded p-4' style={{width:'300px', backgroundColor:'#080410', fontSize:'1.5rem'}}>
                   <div className='d-flex flex-row justify-content-between align-items-center'>
                    {item.name}
                    <i className="fa fa-pencil" aria-hidden="true" style={{fontSize:'24px', color:'white'}}></i>
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