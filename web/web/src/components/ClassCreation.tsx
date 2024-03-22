"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card"
import {Label} from "./ui/label"
import {Input} from "./ui/input"
import {Button} from "./ui/button"
import {useState} from "react"
import {toast} from "sonner"

import {useRouter} from "next/navigation"

export default function ClassCreation() {
	const [name, setName] = useState("")
    const router = useRouter()
	const handleLogin = async (e : any) => {
		e.preventDefault()
		if (name.length < 3) {
			toast("Enter a valid name address")
			return
		}
		const url = process.env.NEXT_PUBLIC_BACKEND_URL
		const res = await fetch(`/api/orgs/test/classroom/`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({classroomName:name})
		})
		const data = await res.json()
        console.log(data)
		if (data.responseStatus !== 'SUCCESS') {
			console.log(data.error)
			toast(data.error.length > 0 ? data.error : "An error occured")
            router.push('/home')
		} else {
			toast("class created successfully")
            router.push(`/class`)
		}
	}
	return (
		<Card className="w-full ">
			<CardHeader className="space-y-1">
				<CardTitle className="text-3xl font-bold">Classroom</CardTitle>
				<CardDescription>Enter your class name</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={(e) => {
					handleLogin(e)
				}} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input value={name} onChange={(e) => {
							setName(e.target.value)
						}} id="name" placeholder="Enter your name" required type="name"/>
					</div>
					<Button className="w-full" type="submit">
						Create
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}

