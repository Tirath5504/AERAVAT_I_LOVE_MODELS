"use client"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { CardContent, Card } from "./ui/card"
import { useState } from "react"
import { toast } from "sonner"
import store from "../lib/zustand"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

export default function SignUp() {
  const [name, setName] = useState("")
  const [type, setType] = useState("Select Type")
  const [password, setPassword] = useState("")
  const { setAuth } = store()
  const handleSignup = async (e: any) => {
    console.log("clicked")
    e.preventDefault()
    if (password.length < 6) {
      toast("Password should be atleast 6 characters long")
      return
    }
    if (name.length < 3) {
      toast("Name should be atleast 3 characters long")
      return
    }
    if (type === "Select Type") {
      toast("Enter a valid type")
      return
    }
    console.log(type, password, name)
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    console.log(url);
    //userDisplayName", "userPassword", "userType", "userName"
    const res = await fetch(`/api/orgs/test/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ userDisplayName: name, userName: name, userPassword: password, userType: type })
    })
    console.log(res);
    const data = await res.json()
    console.log(data);
    if (data.responseStatus!=='SUCCESS') {
      console.log(data.error)
      toast(data.error.length > 0 ? data.error : "An error occured")
    } else {
      setAuth(true)
      // localStorage.setItem("auth-token",data.authToken)
      toast("Account created successfully")
    }
  }
  return (
    <div className="flex items-center justify-center w-fit">
      <Card>
        <CardContent>
          <div className="space-y-4 w-[60vh]">
            <div className="space-y-1">
              <h2 className="text-3xl y-2 pt-5 font-bold">Sign Up</h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Enter your name, email and password to create an account.
              </p>
            </div>
            <form onSubmit={(e) => { handleSignup(e) }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">Name</Label>
                <Input value={name} onChange={(e) => { setName(e.target.value) }} id="first-name" placeholder="Enter your first name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Password</Label>
                <Input value={password} onChange={(e) => { setPassword(e.target.value) }} id="password" placeholder="Enter your password" type="password" />
              </div>

              <div className="space-y-2 flex flex-row gap-2 justify-start items-center">
                <Label htmlFor="type">Register as </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{type}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => setType("Student")}>
                        Student
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setType("Teacher")}>
                        Teacher
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setType("Administrator")}>
                        Administrator
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button className=" w-full" type="submit">Sign Up</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

