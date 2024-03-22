"use client"
import React, {useEffect} from 'react'
import store from '../lib/zustand'
import {usePathname, useRouter} from 'next/navigation';
import Cookie from "js-cookie"

export default function AuthChecker() {
	const { auth, setAuth, user, setUser} = store()
	const location = usePathname()
	const router = useRouter()

	useEffect(() => {
	const token = Cookie.get("auth-token") 
	if(token)
		setAuth(true)
	
	if((auth) && location === "/login") {
		router.push("/home")
	}	
	if(auth && !user){
		getMe()
	}
	}, [auth, location])

	const getMe = async () => {
		try {
			const res = await fetch("/api/me")
			const data = await res.json()
			if(data.isAuthenticated) {
				setAuth(true)
				setUser(data.authenticatedUser)
			}
			else{
				setAuth(false)
				setUser(null)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<></>
	)
}
