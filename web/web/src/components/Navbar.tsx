"use client"
import Link from 'next/link'
import React from 'react'
import NavSpline from './NavSpline'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const handleLogout = async() => {
        console.log(url);
        try {
            const res = await fetch(`${url}/api/orgs/test/auth/login`, {
                method: 'DELETE'
            })
            const data = await res.json()
            if(data.responseStatus === 'SUCCESS'){
                router.push('/login')
            }
        } catch (error) {
            
        }
    }
    return (
        <div className=" flex flex-row w-full py-3 md:py-6 lg:py-8 justify-center md:justify-between items-center">
            <div className=" h-[50px] aspect-square hidden md:block rounded-full overflow-clip dark:bg-slate-100 bg-zinc-900">
                <NavSpline/>
            </div>
        <nav className=" w-fit flex flex-row justify-center items-center rounded-full p-1 dark:shadow-[0_1px_50px_#FFFFFF40] shadow-[0_1px_50px_#00000040] text-slate-50 dark:text-zinc-950 dark:bg-slate-100 bg-zinc-900">
            <Link href="/home" className=" py-2 px-3 md:px-6 lg:px-8 rounded-full hover:dark:bg-slate-200 hover:bg-zinc-800 transition-all text-nowrap">
                Home
            </Link>
            <Link href="/class" className=" py-2 px-3 md:px-6 lg:px-8 rounded-full text-nowrap hover:dark:bg-slate-200 hover:bg-zinc-800 transition-all">
                Classrooms
            </Link>
            <Link href="/notes" className=" py-2 px-3 md:px-6 lg:px-8 rounded-full text-nowrap hover:dark:bg-slate-200 hover:bg-zinc-800 transition-all">
                Notes
            </Link>
            <Link href="/quiz" className=" py-2 px-3 md:px-6 lg:px-8 rounded-full text-nowrap hover:dark:bg-slate-200 hover:bg-zinc-800 transition-all">
                Quizzes
            </Link>
        </nav>
            <button onClick={()=>{handleLogout()}} className=" hidden md:block px-6 py-3 rounded-full transition-all hover:bg-slate-100 border dark:border-slate-50 border-zinc-900 hover:dark:bg-zinc-900 dark:bg-slate-100 bg-zinc-900 text-slate-50 dark:text-zinc-950 hover:dark:text-slate-50 hover:text-zinc-950">
                Log out
            </button>
        </div>
    )
}
