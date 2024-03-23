"use client"
import Navbar from '@/components/Navbar'
import useMyStore from '@/lib/zustand'
import React, { useEffect, useState } from 'react'
import { toast } from "sonner";

export default function page() {
  const { user } = useMyStore()
  const [ratingGraph, setRatingGraph] = useState("/ratingGraph.png")
  const [barGraph, setBarGraph] = useState("/barGraph.png")
  const [recommendedResource, setRecommendedResource] = useState([])
  const url = process.env.NEXT_PUBLIC_FLASK_URL;
  const getProgressGraph = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      const res = await fetch(`${url}/getProgress/${user?.userId}`, { signal })
      const data = await res.json();
      setRatingGraph(`data:image/png;base64,${data.ratingGraph}`);
      setBarGraph(`data:image/png;base64,${data.barGraph}`);
    } catch (err) {
      toast('Something Went Wrong!!');
      console.log(err);
    }

    return () => {
      abortController.abort();
    };
  }
  const getRecommededResources = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      const res = await fetch(`${url}/getBooks`, { signal })
      const data = await res.json();
      console.log(data);
      setRecommendedResource(data.data.slice(5, 11));
    } catch (err) {
      toast('Something Went Wrong!!');
      console.log(err);
    }

    return () => {
      abortController.abort();
    };
  }
  useEffect(() => {
    if (user && user.userType === "Student") {
      getProgressGraph();
      getRecommededResources();
    }
  }, [user]);
  return (
    <div className=' flex flex-col min-h-screen w-full px-12'>
      <Navbar />
      <div className=' flex flex-col py-6 w-full'>
        <div className="flex flex-row w-full justify-between  items-center">
          <h1 className='text-5xl font-bold text-zinc-900'>Hii, {user ? user.userDisplayName : "user"}</h1>
        </div>
        {user?.userType === "Student" ? <> <div className="report flex flex-col">
          <h1 className='text-4xl text-zinc-900 text-center'>
            Progress Report
          </h1>
          <div className="graphs flex flex-row justify-between items-center">
            <img className='' src={ratingGraph} alt="" />
            <img className='' src={barGraph} alt="" />
          </div>
          {ratingGraph === "/ratingGraph.png" && <h1 className='text-center'>Please Give Quizes To See Your Progress Graph</h1>}
        </div>
          <div className='recom flex flex-col '>
            <h1 className='text-4xl text-zinc-900 text-center mt-10'>Recommended Resources</h1>
            <div className="recomBooks my-10 grid grid-cols-3 space-y-4">
              {
                recommendedResource.length !== 0 ? recommendedResource.map((resource: any, ind: any) => {
                  return (
                    <div key={ind} className="">
                      <h1>{resource[0][0]}</h1>
                      <img src={"https://lens.google.com/uploadbyurl?url=" + resource[0][1]} alt="BookImage" />
                    </div>
                  )
                }) : ""
              }
            </div>
          </div>
        </> : ""}
      </div>
    </div>
  )
}
