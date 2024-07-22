import React from 'react'

function ConfirmClosePop({handleBack, handleCloseTicket}) {


  return (
    <>
     <div className='fixed inset-0 left-[16.7%] top-24 flex items-center justify-center z-10'>
        <div className="absolute inset-0 bg-customGray bg-opacity-10 h-full"></div> 
          <div className='container-ticket-pop z-20'>
              <img  className='pop-circle' src='/img/i-circle.png' alt=''/>
              <p>Do you want to close this ticket</p>
                <div className='pop-button'>
                    <button className='btn-1' onClick={handleBack}>Cancel</button>
                    <button className='btn-2' onClick={handleCloseTicket} >Confirm</button>
                </div>
          </div>
    </div>
    </>
  )
}

export default ConfirmClosePop








