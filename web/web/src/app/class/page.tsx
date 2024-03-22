"use client"
import CreateClassBtn from '@/components/CreateClassBtn'
import Loading from '@/components/Loading'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [classrooms, setClassrooms] = useState([])
    const  getData = async () => {
    const classroomsRes = await fetch(`/api/orgs/test/classroom/`)
    const data = await classroomsRes.json()
    setClassrooms(data.classrooms)
    console.log(data)
    }
    useEffect(() => {
      getData()
    }, [])
    
  return (
    <div className=' flex flex-col px-12 '>
       <Navbar></Navbar> 
       <div className=' flex flex-col gap-12 py-12'><div className=' flex flex-col py-12 w-full'>
            <div className="flex flex-row w-full justify-between  items-center">
                <h1 className='  text-5xl font-bold text-zinc-900'>Your classes</h1>
                <CreateClassBtn/>
            </div>
        </div>
        <div className=' flex flex-col w-full gap-6'>
        {classrooms.length===0?
        <Loading/>
        :classrooms.map((classroom: any) => {
            return (
                <Link key={classroom.classroomId} href={`/class/${classroom.classroomId}`}>
                    <div className=' flex transition-all  w-full py-6 px-6 rounded-xl border border-zinc-900 bg-transparent hover:bg-zinc-950 text-zinc-900 hover:text-zinc-50'>
                    <h1 className=' text-4xl font-bold '>{classroom.classroomName}</h1>
                    <div className=' flex flex-row w-full justify-end'>
                        <p className=' text-zinc-700 text-md font-medium'>{classroom.classroomOrgId}</p>
                    </div>
                    </div>
                </Link>
            )
        })}
        </div>
       </div>
    </div>
  )
}
