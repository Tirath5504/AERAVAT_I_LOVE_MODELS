"use client"
import {Button} from "./ui/button"
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
import {toast} from "sonner"
import {useRouter} from "next/navigation"
import { use, useState } from "react"

export default function LectureCreation({id} : {id: string}) {
    const router = useRouter()
	const [title, setTitle] = useState("")
	const handleLectureCreation = async () => {
		const url = process.env.NEXT_PUBLIC_BACKEND_URL
		const res = await fetch(`/api/orgs/test/classroom/${id}/lecture`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({lectureStartTimestamp:Date.now(),lectureEndTimestamp:Date.now()+3600000, title: title})
		})
		const data = await res.json()
        console.log(data)
		if (data.responseStatus !== 'SUCCESS') {
			console.log(data.error)
			toast("An error occured")
            router.push('/home')
		} else {
			toast("lecture created successfully")
            router.push(`/class/${id}/lecture/${data.createdLectureId}`)
		}
	}
	return (
		// <Button onClick={()=>{handleLectureCreation()}} className='text-4xl !h-fit font-extrabold !rounded-full text-zinc-50 w-fit flex py-4 px-8'>Create Lecture</Button>
		<Dialog>
      <DialogTrigger asChild>
	  <Button className='text-4xl !h-fit font-extrabold !rounded-full text-zinc-50 w-fit flex py-4 px-8'>Create Lecture</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Lecture</DialogTitle>
          <DialogDescription>
            Enter the title of your lecture here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="name" placeholder="Linear Algebra Lec 01" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={()=>{handleLectureCreation()}} type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
	)
}

