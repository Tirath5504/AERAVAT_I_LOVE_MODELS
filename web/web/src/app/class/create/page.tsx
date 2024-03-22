import ClassCreation from '@/components/ClassCreation'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function page() {

  return (
    <div className=' flex flex-col px-12'>
        <Navbar/>
        <div className=' flex flex-col py-12 gap-8'>
            {/* <h1 className=' text-4xl font-bold'>Create your classroom</h1> */}
            <ClassCreation/>
        </div>
    </div>
  )
}
