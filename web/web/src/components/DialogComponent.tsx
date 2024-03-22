"use client"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useMyStore from "@/lib/zustand"

export function DialogComponent() {
    const [room, setroom] = useState("")
    const [name,setName] = useState("")
    const router = useRouter()
    const {setCreator} = useMyStore()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className=" py-2 px-4 rounded-xl bg-slate-50 text-zinc-950 border border-slate-50 hover:bg-transparent hover:text-slate-50 transition-all ease-in-out delay-75 duration-300 text-4xl font-bold">Create Meeting</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Meeting</DialogTitle>
          <DialogDescription>
            Make changes to your meet here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Room
            </Label>
            <Input id="name" placeholder="StdXIIB" value={room} onChange={(e)=>{setroom(e.target.value)}} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" placeholder="abhijay sharma" value={name} onChange={(e)=>{setName(e.target.value)}} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={()=>{setCreator(true);router.push(`/room/${room}?name=${name}`)}} type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
