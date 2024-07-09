import React from 'react'

const NoData = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <img src="/img/noData.png" alt="" />
       <h1 className='text-white text-4xl font-serif'>OOPS! No Data Found</h1>
    </div>
  )
}

export default NoData