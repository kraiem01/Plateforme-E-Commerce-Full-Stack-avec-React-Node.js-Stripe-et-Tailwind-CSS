import React from 'react'
import CANCELIMAGE from "../assest/cancel.webp"
import { Link } from 'react-router-dom'





const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
        <img
           src={CANCELIMAGE}
           width={150}
           height={150}
        />
        <p className='text-red-500 font-bold text-xl'>Payment Failure</p>
        <Link to={"/cart"} className="p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white"></Link>
    </div>
  )
}

export default Cancel