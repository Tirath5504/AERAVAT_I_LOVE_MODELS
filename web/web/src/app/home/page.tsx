"use client"
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import useMyStore from '@/lib/zustand'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {
  const { user, auth } = useMyStore()
  const router = useRouter();
  return (
    <div className=' flex flex-col min-h-screen w-full px-12'>
      <Navbar />
      <div className=' flex flex-col py-12 w-full'>
        <div className="flex flex-row w-full justify-between  items-center">
          <h1 className='  text-5xl font-bold text-zinc-900'>Hii, {user ? user.userDisplayName : "user"}</h1>
          {/* {user?.userType!=="Student"&&<Link href={`/class/create`}><Button className='text-4xl !h-fit font-extrabold !rounded-full text-zinc-50 w-fit flex py-4 px-8'>Create Classroom</Button></Link>} */}
        </div>
      </div>
    </div>
  )
}
