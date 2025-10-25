import React from 'react'
import FormDialogue from './_components/FormDialogue'
import CreatedForms from './_components/CreatedForms'

export default function dashboard() {

  
  return (
    <div className='flex flex-col'>
     <div className='py-6 px-10 flex justify-between items-center'>
      <h2 className='text-3xl font-black'>Dashboard</h2>
      <FormDialogue/>
     </div>
     <div>
      <CreatedForms/>
     </div>
    </div>
  )
}




