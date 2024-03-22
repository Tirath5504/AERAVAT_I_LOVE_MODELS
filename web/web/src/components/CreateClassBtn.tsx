"use client"

import useMyStore from "@/lib/zustand"
import Link from "next/link"
import { Button } from "./ui/button"

export default function CreateClassBtn() {
    const {user} = useMyStore()
  return user?.userType!=="Student"&&<Link href={`/class/create`}><Button className='text-4xl !h-fit font-extrabold !rounded-full text-zinc-50 w-fit flex py-4 px-8'>Create Classroom</Button></Link>
}
