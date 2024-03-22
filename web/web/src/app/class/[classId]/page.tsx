"use client"
import LectureCreation from '@/components/LectureCreation'
import Loading from '@/components/Loading'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { toast } from 'sonner'

export default function page({params: {classId}}: {params: {classId: string}}) {
  const [lectures, setLectures] = useState([])
    const  getData = async () => {
    const lecturesRes = await fetch(`/api/orgs/test/classroom/${classId}/lecture/`)
    const data = await lecturesRes.json()
    setLectures(data.lectures)
    console.log(data)
    }
    useEffect(() => {
      getData()
    }, [])
    async function handleDelete(lectureId: string) {
      const temp = lectures.filter((lecture: any) => lecture.lectureId !== lectureId)
      setLectures(temp)
      try {
        const res = await fetch(`/api/orgs/test/classroom/${classId}/lecture/${lectureId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        console.log(data)
        if(data.responseStatus !== 'SUCCESS') {
          console.log(data.error)
        }else{
          toast("Lecture deleted successfully")
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className=' flex flex-col px-12'>
      <Navbar/>
      <div className="flex flex-row w-full justify-between  items-center">
                <h1 className='  text-5xl font-bold text-zinc-900'>Your Lectures</h1>
                <LectureCreation id={classId}/>
            </div>
            <div className=' flex flex-col w-full gap-8 py-12'>
        {lectures.length===0?
        <Loading/>
        :lectures.map((lecture: any) => {
            return (
                    <div key={lecture.lectureId} className=' flex flex-row justify-between items-center transition-all  w-full py-6 px-6 rounded-xl border border-zinc-700 bg-transparent hover:bg-zinc-950 text-zinc-900 hover:text-zinc-50'>
                    <h1 className=' text-4xl font-bold '>{lecture.title}</h1>
                    <div className=' flex w-fit gap-3 justify-center items-center'>
                      <Link href={`/class/${classId}/lecture/${lecture.lectureId}`}><Button className=' !bg-purple-700'>Join</Button></Link>
                      <Link href={`/class/${classId}/lecture/${lecture.lectureId}/notes`}><Button className=' !bg-purple-700'>Notes</Button></Link>
                      <Link href={`/class/${classId}/lecture/${lecture.lectureId}/quiz`}><Button className=' !bg-purple-700'>Quiz</Button></Link>
                      <Button onClick={()=>{handleDelete(lecture.lectureId)}} className='!bg-red-700'>Delete</Button>
                    </div>
                    </div>
            )
        })}
        </div>
    </div>
  )
}
